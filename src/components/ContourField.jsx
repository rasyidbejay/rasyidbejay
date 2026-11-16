import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

// Monochrome topographic contour lines that bend around the pointer.
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform float uSeed;
uniform float uLines;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform vec3 uBg;
uniform vec3 uInk;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float field(vec2 p) {
  float t = uTime * 0.035;
  vec2 q = vec2(
    snoise(p * 0.55 + vec2(0.0, t) + uSeed),
    snoise(p * 0.55 + vec2(5.2, 1.3 - t) + uSeed)
  );
  float f = snoise(p * 0.85 + q * 1.25 + t * 2.0 + uSeed);
  f += 0.45 * snoise(p * 1.9 + q * 0.8 - t);
  return f;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * 1.7;
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0) * 1.7;

  float d = length(p - m);
  float bump = exp(-d * d * 1.8) * uMouseStrength;
  float f = field(p) + bump * 1.1;

  float v = f * uLines;
  float w = max(fwidth(v), 0.0001);

  float minorDist = abs(fract(v + 0.5) - 0.5) / w;
  float minor = 1.0 - smoothstep(0.5, 1.5, minorDist);

  float vm = v / 5.0;
  float wm = max(fwidth(vm), 0.0001);
  float majorDist = abs(fract(vm + 0.5) - 0.5) / wm;
  float major = 1.0 - smoothstep(0.9, 2.2, majorDist);

  float a = max(minor * 0.12, major * 0.3);
  a *= 0.75 + 0.25 * smoothstep(0.0, 1.0, bump * 3.0);

  gl_FragColor = vec4(mix(uBg, uInk, a), 1.0);
}
`

function readColors(THREE) {
  const css = getComputedStyle(document.documentElement)
  return {
    bg: new THREE.Color(css.getPropertyValue('--rb-bg').trim() || '#ffffff'),
    ink: new THREE.Color(css.getPropertyValue('--rb-text-primary').trim() || '#1d1d1f'),
  }
}

export default function ContourField({ className = '', seed = 0, lines = 9 }) {
  const host = useRef(null)

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      let THREE
      try {
        THREE = await import('three')
      } catch {
        return
      }
      const el = host.current
      if (disposed || !el) return

      let renderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' })
      } catch {
        return
      }

      const reduced = prefersReducedMotion()
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const dprCap = coarse ? 1 : 1.5

      const colors = readColors(THREE)
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uRes: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uSeed: { value: seed },
          uLines: { value: lines },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseStrength: { value: 0 },
          uBg: { value: colors.bg },
          uInk: { value: colors.ink },
        },
      })
      const geometry = new THREE.PlaneGeometry(2, 2)
      scene.add(new THREE.Mesh(geometry, material))

      renderer.domElement.setAttribute('aria-hidden', 'true')
      el.appendChild(renderer.domElement)

      const target = { x: 0.5, y: 0.5, s: 0 }
      let visible = true
      let raf = 0
      let first = true
      const t0 = performance.now()

      const resize = () => {
        const w = el.clientWidth || 1
        const h = el.clientHeight || 1
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap))
        renderer.setSize(w, h, false)
        const size = renderer.getDrawingBufferSize(new THREE.Vector2())
        material.uniforms.uRes.value.copy(size)
      }

      const draw = () => {
        const u = material.uniforms
        u.uTime.value = reduced ? 12 : (performance.now() - t0) / 1000
        u.uMouse.value.x += (target.x - u.uMouse.value.x) * 0.06
        u.uMouse.value.y += (target.y - u.uMouse.value.y) * 0.06
        u.uMouseStrength.value += (target.s - u.uMouseStrength.value) * 0.05
        renderer.render(scene, camera)
        if (first) {
          first = false
          el.classList.add('is-ready')
        }
      }

      const loop = () => {
        raf = requestAnimationFrame(loop)
        if (!document.hidden) draw()
      }
      const start = () => {
        if (!raf && !reduced) raf = requestAnimationFrame(loop)
      }
      const stop = () => {
        cancelAnimationFrame(raf)
        raf = 0
      }

      const onPointer = (e) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = 1 - (e.clientY - r.top) / r.height
        const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
        target.s = inside ? 1 : 0
        if (inside) {
          target.x = x
          target.y = y
        }
      }
      const onLeave = () => {
        target.s = 0
      }

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      })
      io.observe(el)

      const ro = new ResizeObserver(() => {
        resize()
        if (reduced || !visible) draw()
      })
      ro.observe(el)

      const mo = new MutationObserver(() => {
        const c = readColors(THREE)
        material.uniforms.uBg.value = c.bg
        material.uniforms.uInk.value = c.ink
        if (reduced) draw()
      })
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

      if (!reduced && !coarse) {
        window.addEventListener('pointermove', onPointer, { passive: true })
        document.addEventListener('pointerleave', onLeave)
      }

      resize()
      draw()
      start()

      cleanup = () => {
        stop()
        io.disconnect()
        ro.disconnect()
        mo.disconnect()
        window.removeEventListener('pointermove', onPointer)
        document.removeEventListener('pointerleave', onLeave)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [seed, lines])

  return <div ref={host} className={`field ${className}`} aria-hidden="true" />
}
