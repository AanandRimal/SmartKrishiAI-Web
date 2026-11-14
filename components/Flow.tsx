'use client'

import { ArrowCounterClockwise, CookingPot, HandCoins, MapPin, Plant, Storefront, Truck } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'

const ICONS = { farm: Plant, collector: HandCoins, truck: Truck, shop: Storefront, kitchen: CookingPot, pickup: MapPin }

export type Stop = { icon: keyof typeof ICONS; name: string; note: string; price?: string; loss?: string; tag?: boolean; cut?: boolean }
export type Lane = { kind: 'before' | 'after'; title: string; count: string; stops: Stop[]; result: string }

/** Two lanes side by side. A tomato travels each one when the section comes into view; "replay" runs it again. */
export function Flow({ lanes, replay, tag, cutLabel }: { lanes: Lane[]; replay: string; tag: string; cutLabel: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(0) // 0 = not started; each increment remounts the travellers so the animation restarts
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(1); io.disconnect() } }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="flow" ref={ref}>
      {lanes.map(l => (
        <div key={l.kind} className={`lane ${l.kind}${run ? ' go' : ''}`} style={{ '--n': l.stops.length } as React.CSSProperties}>
          <div className="lane-head">
            <h3>{l.title}</h3>
            <span>{l.count}</span>
          </div>
          <ol>
            {l.stops.map((s, i) => {
              const Icon = ICONS[s.icon]
              return (
                <li key={s.name} className={[s.icon === 'pickup' ? 'pickup' : '', s.tag ? 'is-mid' : ''].join(' ').trim() || undefined} style={{ '--i': i } as React.CSSProperties}>
                  <span className="badge"><Icon size={24} weight="duotone" /></span>
                  <div>
                    <b>{s.name}{s.price && <em>{s.price}</em>}{s.tag && <span className="mid">{tag}</span>}{s.cut && <span className="mid none">{cutLabel}</span>}</b>
                    <small>{s.note}</small>
                    {s.loss && <small className="loss">{s.loss}</small>}
                  </div>
                </li>
              )
            })}
            {run > 0 && <span key={run} className="tomato" aria-hidden="true" />}
          </ol>
          <p key={run} className="lane-result">{l.result}</p>
        </div>
      ))}
      <button type="button" className="replay" onClick={() => setRun(r => r + 1)}>
        <ArrowCounterClockwise size={16} weight="bold" /> {replay}
      </button>
    </div>
  )
}
