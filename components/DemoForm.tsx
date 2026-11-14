'use client'

import { type Lang, translator } from './lang'

// ponytail: opens the visitor's mail app, no backend; swap for a Supabase insert when requests need tracking
const TO = 'info@smartkrishiai.com'

export function DemoForm({ lang }: { lang: Lang }) {
  const t = translator(lang)
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const body = `Name: ${f.name}\nPalika: ${f.palika}\nRole: ${f.role}\nPhone: ${f.phone}`
    location.href = `mailto:${TO}?subject=${encodeURIComponent('Demo request: ' + f.palika)}&body=${encodeURIComponent(body)}`
  }
  return (
    <form onSubmit={submit}>
      <h2 className="h2">{t('A demo for your Palika', 'तपाईंको पालिकामा डेमो')}</h2>
      <p className="intro">{t('We come to your office and show the app and portal.', 'हामी तपाईंको कार्यालयमै आएर एप र पोर्टल देखाउँछौं।')}</p>
      <label>{t('Your name', 'तपाईंको नाम')}<input name="name" required autoComplete="name" /></label>
      <div className="two">
        <label>{t('Palika', 'पालिका')}<input name="palika" required /></label>
        <label>{t('Role', 'पद')}<input name="role" /></label>
      </div>
      <label>{t('Phone', 'फोन')}<input name="phone" type="tel" required autoComplete="tel" inputMode="tel" /></label>
      <button className="btn gold" type="submit">{t('Request a demo', 'डेमो माग्नुहोस्')}</button>
    </form>
  )
}
