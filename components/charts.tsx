'use client'

import { useEffect, useRef, useState } from 'react'

export type Part = { label: string; value: string; cells: number; color: string }

function useSeen<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

/** Unit chart: one cell per unit, filled part by part. Hover a cell (or a legend row) to single out its part. */
export function UnitChart({ parts, columns, label, size }: { parts: Part[]; columns: number; label: string; size: 'lg' | 'sm' }) {
  const [ref, seen] = useSeen<HTMLDivElement>()
  const [hl, setHl] = useState<number | null>(null)
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null)
  const cells = parts.flatMap((p, i) => Array<number>(p.cells).fill(i))
  const step = 900 / cells.length
  function move(e: React.MouseEvent) {
    const p = (e.target as HTMLElement).dataset.p
    if (p === undefined) { setHl(null); setTip(null); return }
    const r = ref.current!.getBoundingClientRect()
    setHl(+p)
    // keep the tooltip inside the chart so it never runs off the screen edge
    setTip({ x: Math.min(Math.max(e.clientX - r.left, 110), r.width - 110), y: e.clientY - r.top })
  }
  return (
    <div className={`unit ${size}`}>
      <div ref={ref} className="unit-plot" role="img" aria-label={label} onMouseMove={move} onMouseLeave={() => { setHl(null); setTip(null) }}>
        <div className={`unit-grid${seen ? ' seen' : ''}${hl !== null ? ' focus' : ''}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {cells.map((p, k) => (
            <i key={k} data-p={p} className={hl === p ? 'hl' : undefined} style={{ background: parts[p].color, transitionDelay: seen ? `${Math.round(k * step)}ms` : undefined }} />
          ))}
        </div>
        {tip && hl !== null && (
          <div className="tip" style={{ left: tip.x, top: tip.y }}><b>{parts[hl].value}</b>{parts[hl].label}</div>
        )}
      </div>
      <ul className="legend">
        {parts.map((p, i) => (
          <li key={p.label} className={hl === i ? 'hl' : undefined} onMouseEnter={() => setHl(i)} onMouseLeave={() => setHl(null)}>
            <i style={{ background: p.color }} />
            <span>{p.label}</span>
            <b>{p.value}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Horizontal bars that grow once when scrolled into view. The figure sits inside the bar when it is long, after it when short. */
export function GrowBars({ rows }: { rows: { label: string; value: string; pct: number; color: string; note?: string }[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>()
  return (
    <div className="grow" ref={ref}>
      {rows.map(r => (
        <div key={r.label} className="grow-row">
          <p>{r.label}{r.note && <span>{r.note}</span>}</p>
          <div className={`gbar${r.pct >= 55 ? ' in' : ''}`}>
            <i style={{ width: seen ? `${r.pct}%` : 0, background: r.color }}><b>{r.value}</b></i>
            {r.pct < 55 && <b className="out" style={{ opacity: seen ? 1 : 0 }}>{r.value}</b>}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Donut: the centre names the whole, and names a part while it is hovered or focused. */
export function Donut({ parts, center, label, size = 260, thick = 30 }: {
  parts: { label: string; value: number; text: string; color: string }[]
  center: { big: string; small: string }
  label: string
  size?: number
  thick?: number
}) {
  const [hl, setHl] = useState<number | null>(null)
  const r = (size - thick) / 2
  const circ = 2 * Math.PI * r
  const total = parts.reduce((s, p) => s + p.value, 0)
  let acc = 0
  const show = hl === null ? center : { big: parts[hl].text, small: parts[hl].label }
  return (
    <div className="donut" style={{ width: size, maxWidth: '100%' }}>
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {parts.map((p, i) => {
            const len = (p.value / total) * circ
            const seg = (
              <circle
                key={p.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={p.color} strokeWidth={hl === i ? thick + 6 : thick}
                strokeDasharray={`${Math.max(len - 3, 0)} ${circ}`} strokeDashoffset={-acc}
                opacity={hl === null || hl === i ? 1 : 0.35} tabIndex={0} aria-label={`${p.label}: ${p.text}`}
                onMouseEnter={() => setHl(i)} onMouseLeave={() => setHl(null)} onFocus={() => setHl(i)} onBlur={() => setHl(null)}
              />
            )
            acc += len
            return seg
          })}
        </g>
      </svg>
      <div className="donut-c"><b>{show.big}</b><span>{show.small}</span></div>
    </div>
  )
}
