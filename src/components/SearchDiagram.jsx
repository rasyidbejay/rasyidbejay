import { useRef } from 'react'
import { useInView } from '../hooks/useInView'

// Monochrome line illustration: one site, three ways of being found.
// Lines draw in on scroll, then a quiet dash flows along each connector.
export default function SearchDiagram({ className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, '0px 0px -8% 0px')

  return (
    <div ref={ref} className={`sdiagram ${inView ? 'is-in' : ''} ${className}`}>
      <svg
        viewBox="0 0 640 520"
        role="img"
        aria-labelledby="sd-title sd-desc"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="sd-title">How SEO, AEO and GEO connect to one website</title>
        <desc id="sd-desc">
          A website on the left connects to three destinations on the right: a search results
          page for SEO, a featured answer box for AEO, and an AI chat answer for GEO.
        </desc>

        {/* connectors */}
        <g className="sd__links" fill="none" strokeWidth="1.5">
          <path pathLength="1" d="M200 260 C 270 260, 270 90, 340 90" />
          <path pathLength="1" d="M200 260 C 270 260, 270 260, 340 260" />
          <path pathLength="1" d="M200 260 C 270 260, 270 430, 340 430" />
        </g>
        <g className="sd__flow" fill="none" strokeWidth="2.5" strokeLinecap="round">
          <path pathLength="1" d="M200 260 C 270 260, 270 90, 340 90" />
          <path pathLength="1" d="M200 260 C 270 260, 270 260, 340 260" />
          <path pathLength="1" d="M200 260 C 270 260, 270 430, 340 430" />
        </g>

        {/* the site */}
        <g className="sd__box sd__site" fill="none" strokeWidth="1.5">
          <rect x="40" y="200" width="160" height="120" rx="14" pathLength="1" />
          <line x1="40" y1="228" x2="200" y2="228" />
          <circle cx="56" cy="214" r="3" className="sd__fill" />
          <circle cx="68" cy="214" r="3" className="sd__fill" />
          <circle cx="80" cy="214" r="3" className="sd__fill" />
          <line x1="58" y1="252" x2="150" y2="252" />
          <line x1="58" y1="270" x2="182" y2="270" />
          <line x1="58" y1="288" x2="130" y2="288" />
        </g>
        <text x="120" y="352" textAnchor="middle" className="sd__label">
          Your site
        </text>

        {/* SEO: results page */}
        <g className="sd__box sd__seo" fill="none" strokeWidth="1.5">
          <rect x="340" y="40" width="260" height="100" rx="14" pathLength="1" />
          <rect x="356" y="54" width="228" height="14" rx="7" />
          <line x1="356" y1="88" x2="470" y2="88" className="sd__strong" />
          <line x1="356" y1="102" x2="560" y2="102" />
          <line x1="356" y1="116" x2="520" y2="116" />
          <circle cx="574" cy="88" r="4" className="sd__fill" />
        </g>
        <text x="340" y="166" className="sd__tag">
          SEO
        </text>
        <text x="384" y="166" className="sd__label">
          Ranked in search results
        </text>

        {/* AEO: answer box */}
        <g className="sd__box sd__aeo" fill="none" strokeWidth="1.5">
          <rect x="340" y="212" width="260" height="96" rx="14" pathLength="1" />
          <line x1="356" y1="236" x2="500" y2="236" className="sd__strong" />
          <line x1="356" y1="254" x2="580" y2="254" />
          <line x1="356" y1="270" x2="560" y2="270" />
          <line x1="356" y1="286" x2="440" y2="286" />
        </g>
        <text x="340" y="334" className="sd__tag">
          AEO
        </text>
        <text x="386" y="334" className="sd__label">
          Chosen as the direct answer
        </text>

        {/* GEO: AI answer */}
        <g className="sd__box sd__geo" fill="none" strokeWidth="1.5">
          <path
            pathLength="1"
            d="M354 382 h232 a14 14 0 0 1 14 14 v62 a14 14 0 0 1 -14 14 h-170 l-28 22 v-22 h-34 a14 14 0 0 1 -14 -14 v-62 a14 14 0 0 1 14 -14 z"
          />
          <line x1="372" y1="410" x2="540" y2="410" className="sd__strong" />
          <line x1="372" y1="428" x2="574" y2="428" />
          <line x1="372" y1="446" x2="500" y2="446" />
          <path d="M578 396 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" className="sd__fill" />
        </g>
        <text x="340" y="510" className="sd__tag">
          GEO
        </text>
        <text x="384" y="510" className="sd__label">
          Cited in AI answers
        </text>
      </svg>
    </div>
  )
}
