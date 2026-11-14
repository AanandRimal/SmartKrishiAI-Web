import { Anek_Devanagari, Mukta } from 'next/font/google'
import type { Metadata } from 'next'
import { type Lang, translator } from './lang'
import '../app/globals.css'

const mukta = Mukta({ weight: ['400', '600', '700'], subsets: ['devanagari', 'latin'], variable: '--font-mukta' })
const anek = Anek_Devanagari({ weight: ['700', '800'], subsets: ['devanagari', 'latin'], variable: '--font-anek' })

export function meta(lang: Lang): Metadata {
  const t = translator(lang)
  return {
    metadataBase: new URL('https://smartkrishiai.com'),
    title: t('SmartKrishiAI · Farmers, Palikas and buyers in one chain', 'स्मार्ट कृषि · किसान, पालिका र खरिदकर्ता एउटै सूत्रमा'),
    description: t(
      'A Nepali farm app: AI crop and animal doctor, a verified Palika farmer registry, and a market where buyers purchase straight from farmers.',
      'किसान, पालिका र खरिदकर्तालाई एउटै सूत्रमा जोड्ने नेपाली कृषि एप। AI बाली र पशु डाक्टर, प्रमाणित किसान दर्ता, र किसानबाट सिधै किन्ने बजार।',
    ),
    icons: { icon: '/favicon.svg' },
    alternates: { canonical: lang === 'en' ? '/en' : '/', languages: { ne: '/', en: '/en' } },
  }
}

export function Document({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${mukta.variable} ${anek.variable}`}>
      <body>{children}</body>
    </html>
  )
}
