import { useEffect } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { stage } from '../lib/stage'

/*
  The exploded web page: five layers of one website (structured data, HTML,
  components, layout, design) floating behind the Home page. Each chapter puts
  the stack in a different state; the cursor fans the layers apart.
*/

const TW = 1280
const TH = 840
const LW = 2.9
const LH = 1.9
const SANS = '"Geist", system-ui, sans-serif'
const MONO = '"Geist Mono", ui-monospace, monospace'
const KINDS = ['data', 'html', 'comp', 'layout', 'design']

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'
const pal = () =>
  isDark()
    ? { bg: '#070707', pane: '#121212', ink: '#F2F2EF', muted: '#9B9B95', line: '#3A3A37', accent: '#8FA4FF', grid: 'rgba(143,164,255,0.16)', gridLine: 'rgba(143,164,255,0.35)', tagBg: '#222220' }
    : { bg: '#EEEEEB', pane: '#FAFAF8', ink: '#0E0E0E', muted: '#5D5D58', line: '#A9A9A3', accent: '#3A5BFF', grid: 'rgba(58,91,255,0.12)', gridLine: 'rgba(58,91,255,0.32)', tagBg: '#ECECE8' }

function rr(g, x, y, w, h, r) {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
}
function tag(g, p, text, strong) {
  g.font = `500 24px ${MONO}`
  const w = g.measureText(text).width + 36
  rr(g, TW - w - 40, 34, w, 46, 23)
  g.fillStyle = strong ? p.accent : p.tagBg
  g.fill()
  g.fillStyle = strong ? p.pane : p.muted
  g.textBaseline = 'middle'
  g.fillText(text, TW - w - 22, 58)
  g.textBaseline = 'alphabetic'
}
function code(g, lines, y, lh, p, accentRows) {
  g.font = `400 28px ${MONO}`
  g.textBaseline = 'top'
  lines.forEach((l, i) => {
    g.fillStyle = accentRows.includes(i) ? p.accent : p.ink
    g.fillText(l, 56, y + i * lh)
  })
  g.textBaseline = 'alphabetic'
}

const DRAW = {
  mini(g, p) {
    g.fillStyle = p.bg
    g.fillRect(0, 0, TW, TH)
    g.fillStyle = p.muted
    g.font = `500 20px ${MONO}`
    g.fillText('AVAILABLE FOR FREELANCE WORK', 64, 92)
    g.fillStyle = p.ink
    g.font = `400 32px ${SANS}`
    g.fillText('Building small corners of the internet.', 64, 360)
    g.font = `600 176px ${SANS}`
    g.fillText('Rashid', 56, 560)
    g.fillText('Abdullah', 56, 728)
  },
  rb(g, p, img) {
    g.fillStyle = '#F3F2EE'
    g.fillRect(0, 0, TW, TH)
    if (img && img.complete && img.naturalWidth) g.drawImage(img, 0, 0, TW, TH)
  },
  layout(g, p) {
    g.fillStyle = p.pane
    g.fillRect(0, 0, TW, TH)
    const cw = (TW - 112 - 11 * 20) / 12
    for (let i = 0; i < 12; i++) {
      g.fillStyle = p.grid
      g.fillRect(56 + i * (cw + 20), 0, cw, TH)
    }
    g.fillStyle = p.gridLine
    for (let y = 36; y < TH; y += 36) g.fillRect(0, y, TW, 1)
    g.fillStyle = p.accent
    g.font = `500 20px ${MONO}`
    g.fillText('12 COLUMNS · 36PX BASELINE', 56, TH - 36)
    tag(g, p, 'LAYOUT', false)
  },
  comp(g, p) {
    g.fillStyle = p.pane
    g.fillRect(0, 0, TW, TH)
    g.strokeStyle = p.line
    g.lineWidth = 3
    g.fillStyle = p.muted
    g.font = `500 22px ${MONO}`
    ;[
      [56, 110, TW - 112, 64, 'nav'],
      [56, 210, 780, 210, 'h1'],
      [56, 450, 620, 100, 'p'],
      [56, 580, 230, 72, 'button'],
      [880, 210, 344, 210, 'img'],
      [700, 580, 524, 200, 'card'],
    ].forEach(([x, y, w, h, t]) => {
      rr(g, x, y, w, h, 14)
      g.stroke()
      g.fillText(t, x + 16, y + 34)
    })
    tag(g, p, 'COMPONENTS', false)
  },
  html(g, p) {
    g.fillStyle = p.pane
    g.fillRect(0, 0, TW, TH)
    code(
      g,
      ['<!doctype html>', '<html lang="en">', '<title>rbnetwork.my | SEO, AI search</title>', '<meta name="description"', '  content="News and analysis on SEO,', '  AI search and web development.">', '<link rel="alternate" hreflang="ms">', '<main>', '  <h1>Search is being rewritten.</h1>', '</main>'],
      110,
      46,
      p,
      [4, 5, 6],
    )
    tag(g, p, 'HTML', true)
  },
  data(g, p) {
    g.fillStyle = p.pane
    g.fillRect(0, 0, TW, TH)
    code(
      g,
      ['{', '  "@context": "https://schema.org",', '  "@type": "WebSite",', '  "name": "rbnetwork.my",', '  "about": ["SEO", "AI search",', '            "web development"],', '  "inLanguage": ["en", "ms"],', '  "author": "Rashid Abdullah"', '}'],
      110,
      50,
      p,
      [1, 2, 3, 4, 5, 6, 7],
    )
    tag(g, p, 'STRUCTURED DATA', true)
  },
  contact(g, p) {
    g.fillStyle = p.pane
    g.fillRect(0, 0, TW, TH)
    g.fillStyle = p.muted
    g.font = `500 22px ${MONO}`
    g.fillText('CONTACT', 64, 96)
    g.fillStyle = p.ink
    g.font = `600 84px ${SANS}`
    g.fillText('rasyidbejay', 64, 470)
    g.fillText('@gmail.com', 64, 572)
    g.fillStyle = p.accent
    g.fillRect(64, 640, 110, 8)
    g.fillStyle = p.muted
    g.font = `500 22px ${MONO}`
    g.fillText('KUALA LUMPUR · GMT+8', 64, TH - 72)
  },
}

const all = (o) => KINDS.map(() => ({ o, glow: 0, ghost: 0 }))
const built = (n) => KINDS.map((_, i) => (i < n ? { o: 1, glow: 0, ghost: 0 } : { o: 0, glow: 0, ghost: 1 }))
const STATES = {
  hero: { gap: 0.11, layers: all(1), face: 'mini', pose: 'hero' },
  rb: { gap: 0.46, layers: all(1), face: 'rb', pose: 'work' },
  soon1: { gap: 0.46, layers: built(3), face: null, pose: 'work' },
  soon2: { gap: 0.46, layers: built(2), face: null, pose: 'work' },
  soon3: { gap: 0.46, layers: built(1), face: null, pose: 'work' },
  people: { gap: 0.045, layers: all(1), face: 'rb', pose: 'readers' },
  machines: { gap: 0.56, layers: KINDS.map((_, i) => (i < 2 ? { o: 1, glow: 1, ghost: 0 } : { o: 0.16, glow: 0, ghost: 0 })), face: 'rb', pose: 'readers' },
  intro: { gap: 0.2, layers: all(0.95), face: 'mini', pose: 'intro' },
  contact: { gap: 0, layers: KINDS.map((_, i) => ({ o: i === 4 ? 1 : 0, glow: 0, ghost: 0 })), face: 'contact', pose: 'contact' },
}
const POSES = {
  wide: {
    hero: { x: 1.05, y: 0.2, z: 0, s: 0.9, rx: -1.08, ry: 0.62 },
    work: { x: 1.3, y: 0, z: 0, s: 0.74, rx: -1.0, ry: 0.7 },
    readers: { x: 1.3, y: 0, z: 0, s: 0.74, rx: -1.04, ry: 0.55 },
    intro: { x: 2.0, y: 0.3, z: -0.8, s: 0.62, rx: -1.12, ry: 0.9 },
    contact: { x: 1.3, y: 0.35, z: 0, s: 0.86, rx: -0.32, ry: 0.42 },
  },
  tall: {
    hero: { x: 0, y: 0.95, z: 0, s: 0.62, rx: -1.08, ry: 0.62 },
    work: { x: 0, y: 1.15, z: 0, s: 0.46, rx: -1.0, ry: 0.7 },
    readers: { x: 0, y: 1.2, z: 0, s: 0.46, rx: -1.04, ry: 0.55 },
    intro: { x: 0.5, y: 1.2, z: -1, s: 0.44, rx: -1.12, ry: 0.9 },
    contact: { x: 0, y: 1.0, z: 0, s: 0.6, rx: -0.32, ry: 0.42 },
  },
}
function stateKey() {
  if (stage.ch === 1) return ['rb', 'soon1', 'soon2', 'soon3'][stage.row] || 'rb'
  if (stage.ch === 2) return stage.reader
  return ['hero', 'hero', 'hero', 'intro', 'contact'][stage.ch] || 'hero'
}

function start(canvas) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  } catch {
    canvas.style.display = 'none'
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75))
  renderer.setSize(window.innerWidth, window.innerHeight, false)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 60)
  camera.position.set(0, 0, 7)
  const pm = new THREE.PMREMGenerator(renderer)
  const envTex = pm.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  const key = new THREE.DirectionalLight(0xffffff, 1.0)
  key.position.set(3, 5, 5)
  scene.add(key)

  const BG = { light: new THREE.Color('#EEEEEB'), dark: new THREE.Color('#070707') }
  scene.background = (isDark() ? BG.dark : BG.light).clone()

  /* Textures */
  const shot = new Image()
  shot.src = '/rbnetwork.webp'
  const textures = {}
  Object.keys(DRAW).forEach((k) => {
    const c = document.createElement('canvas')
    c.width = TW
    c.height = TH
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
    t.userData.ctx = c.getContext('2d')
    textures[k] = t
  })
  const redraw = () => {
    const p = pal()
    Object.entries(textures).forEach(([k, t]) => {
      DRAW[k](t.userData.ctx, p, shot)
      t.needsUpdate = true
    })
  }
  shot.onload = redraw

  /* Stack */
  const stack = new THREE.Group()
  stack.rotation.order = 'YXZ'
  scene.add(stack)
  const boxGeo = new RoundedBoxGeometry(LW + 0.08, LH + 0.08, 0.04, 4, 0.05)
  const faceGeo = new THREE.PlaneGeometry(LW, LH)
  const outlineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-LW / 2, -LH / 2, 0),
    new THREE.Vector3(LW / 2, -LH / 2, 0),
    new THREE.Vector3(LW / 2, LH / 2, 0),
    new THREE.Vector3(-LW / 2, LH / 2, 0),
    new THREE.Vector3(-LW / 2, -LH / 2, 0),
  ])
  const materials = []
  const layers = KINDS.map((kind, i) => {
    const g = new THREE.Group()
    const boxMat = new THREE.MeshPhysicalMaterial({ color: '#FFFFFF', roughness: 0.32, clearcoat: 0.6, transparent: true })
    materials.push(boxMat)
    const box = new THREE.Mesh(boxGeo, boxMat)
    g.add(box)
    const faces = {}
    ;(kind === 'design' ? ['mini', 'rb', 'contact'] : [kind]).forEach((k, j) => {
      const m = new THREE.MeshStandardMaterial({ map: textures[k], roughness: 0.55, transparent: true, emissive: '#ffffff', emissiveMap: textures[k], emissiveIntensity: 0 })
      materials.push(m)
      const f = new THREE.Mesh(faceGeo, m)
      f.position.z = 0.022 + j * 0.0015
      g.add(f)
      faces[k] = f
    })
    const lineMat = new THREE.LineDashedMaterial({ color: '#8A8A84', dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0 })
    materials.push(lineMat)
    const outline = new THREE.Line(outlineGeo, lineMat)
    outline.computeLineDistances()
    g.add(outline)
    g.position.z = i * 0.11
    stack.add(g)
    return { kind, g, box, boxMat, faces, outline, cur: { o: 1, glow: 0, ghost: 0, face: {} } }
  })
  const paintChrome = () => {
    layers.forEach((L) => {
      L.boxMat.color.set(isDark() ? '#151515' : '#FFFFFF')
      L.outline.material.color.set(isDark() ? '#6E6E69' : '#8A8A84')
    })
  }

  /* Soft contact shadow in light mode */
  const sc = document.createElement('canvas')
  sc.width = sc.height = 256
  const sg = sc.getContext('2d')
  const grd = sg.createRadialGradient(128, 128, 0, 128, 128, 128)
  grd.addColorStop(0, 'rgba(0,0,0,0.5)')
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  sg.fillStyle = grd
  sg.fillRect(0, 0, 256, 256)
  const shTex = new THREE.CanvasTexture(sc)
  const shadow = new THREE.Sprite(new THREE.SpriteMaterial({ map: shTex, transparent: true, depthWrite: false, opacity: 0 }))
  scene.add(shadow)

  /* Input */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight, false)
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('resize', onResize)

  /* Loop */
  const pose = { x: 1.05, y: 0.2, z: 0, s: 0.0001, rx: -1.08, ry: 0.62 }
  let gap = 0.11
  let time = 0
  let last = performance.now()
  let intro = 0
  let lastDark = isDark()
  let raf = 0
  const ndc = new THREE.Vector3()

  const frame = (now) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (!reduce) time += dt
    const ease = (rate) => (reduce ? 1 : 1 - Math.exp(-dt * rate))

    const dark = isDark()
    if (dark !== lastDark) {
      lastDark = dark
      redraw()
      paintChrome()
    }

    mouse.x += (mouse.tx - mouse.x) * ease(4)
    mouse.y += (mouse.ty - mouse.y) * ease(4)
    intro = Math.min(1, intro + dt * (reduce ? 10 : 1.2))

    const aspect = window.innerWidth / window.innerHeight
    const tall = aspect < 0.9
    const st = STATES[stateKey()]
    const target = (tall ? POSES.tall : POSES.wide)[st.pose]
    const ax = tall ? 1 : Math.min(1, aspect / 1.78)
    const e = ease(3.2)
    const sCap = tall ? Math.min(target.s, aspect * 0.95) : target.s
    pose.x += (target.x * ax - pose.x) * e
    pose.y += (target.y - pose.y) * e
    pose.z += (target.z - pose.z) * e
    pose.s += (sCap * (0.2 + 0.8 * (1 - Math.pow(1 - intro, 3))) - pose.s) * e
    pose.rx += (target.rx - pose.rx) * e
    pose.ry += (target.ry - pose.ry) * e

    const lift = 2 * gap * Math.sin(-pose.rx) * pose.s
    stack.position.set(pose.x, pose.y - lift + Math.sin(time * 0.6) * 0.04, pose.z)
    stack.scale.setScalar(pose.s)
    stack.rotation.x = pose.rx + mouse.y * 0.12
    stack.rotation.y = pose.ry + mouse.x * 0.18 + Math.sin(time * 0.25) * 0.04

    ndc.copy(stack.position).project(camera)
    const near = coarse || reduce ? 0 : Math.max(0, 1 - Math.hypot(mouse.x - ndc.x, mouse.y - ndc.y) / 0.8)
    gap += (st.gap + (st.pose === 'contact' ? 0 : near * 0.14) - gap) * ease(4)

    const le = ease(5)
    layers.forEach((L, i) => {
      const s = st.layers[i]
      const c = L.cur
      c.o += (s.o - c.o) * le
      c.glow += ((dark ? s.glow : 0) - c.glow) * le
      c.ghost += (s.ghost - c.ghost) * le
      L.g.position.z = i * gap
      L.boxMat.opacity = c.o
      L.boxMat.depthWrite = c.o > 0.98
      L.box.visible = c.o > 0.005
      Object.entries(L.faces).forEach(([k, f]) => {
        const want = L.kind === 'design' ? (st.face === k ? 1 : 0) : 1
        const prev = c.face[k] ?? want
        c.face[k] = prev + (want - prev) * le
        f.material.opacity = c.o * c.face[k]
        f.material.emissiveIntensity = c.glow * 0.85
        f.visible = f.material.opacity > 0.005
      })
      L.outline.material.opacity = c.ghost * 0.7
      L.outline.visible = c.ghost > 0.01
    })

    shadow.position.set(pose.x, pose.y - lift - 1.15 * pose.s, pose.z)
    shadow.scale.set(3.4 * pose.s, 0.5 * pose.s, 1)
    shadow.material.opacity += ((dark || tall ? 0 : 0.28) - shadow.material.opacity) * le
    scene.background.lerp(dark ? BG.dark : BG.light, ease(6))
    renderer.toneMappingExposure += ((dark ? 1.08 : 1.0) - renderer.toneMappingExposure) * ease(6)

    renderer.render(scene, camera)
  }

  redraw()
  paintChrome()
  document.fonts?.ready?.then(redraw)
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('resize', onResize)
    Object.values(textures).forEach((t) => t.dispose())
    materials.forEach((m) => m.dispose())
    shadow.material.dispose()
    shTex.dispose()
    boxGeo.dispose()
    faceGeo.dispose()
    outlineGeo.dispose()
    envTex.dispose()
    pm.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
  }
}

// Mounts a fresh canvas on body for each visit to the page, so the WebGL
// context can be released cleanly when the page unmounts.
export default function LayerStage() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.className = 'stage'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.appendChild(canvas)
    const stop = start(canvas)
    return () => {
      stop()
      canvas.remove()
    }
  }, [])
  return null
}
