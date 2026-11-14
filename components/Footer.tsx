import Link from 'next/link'
import { type Lang, home, translator } from './lang'

// Every figure on the site points here by number. Add a source before adding a figure.
export const SOURCES = [
  { id: 's1', text: 'NSO Nepal, National Sample Census of Agriculture 2021/22, main results (FAO World Census of Agriculture), 2023.', url: 'https://www.fao.org/fileadmin/templates/ess/ess_test_folder/World_Census_Agriculture/WCA_2020/WCA2020_TMRs/TMR_Nepal_2021_28122023.pdf', site: 'fao.org' },
  { id: 's2', text: 'Ministry of Agriculture and Livestock Development figures, Onlinekhabar, 13 Asoj 2083.', url: 'https://www.onlinekhabar.com/2026/09/2028836', site: 'onlinekhabar.com' },
  { id: 's3', text: 'Nepal Rastra Bank, Current Macroeconomic and Financial Situation, annual data 2025/26 (NSO).', url: 'https://www.nrb.org.np/red/current-macroeconomic-and-financial-situation-english-based-on-annual-data-of-2025-26/', site: 'nrb.org.np' },
  { id: 's4', text: 'Timsina et al., Journal of Nepal Agricultural Research Council 9, 2023: 5,021 of 7,071 local-level technical posts filled.', url: 'https://doi.org/10.3126/jnarc.v9i1.61513', site: 'doi.org' },
  { id: 's5', text: 'Adhikari and G.C., Post-harvest practices of horticultural crops in Nepal, Archives of Agriculture and Environmental Science 6(2), 2021.', url: 'https://doi.org/10.26832/24566632.2021.0602015', site: 'doi.org' },
  { id: 's6', text: 'Department of Customs data, The Kathmandu Post, 4 August 2025.', url: 'https://kathmandupost.com/money/2025/08/04/nepal-s-food-import-bill-hits-rs360-billion-as-india-eases-curbs', site: 'kathmandupost.com' },
  { id: 's7', text: 'Paudel and K.C., Value Chain Analysis of Tomato Sub-sector in Bhaktapur, Food and Agribusiness Management 4(2), 2023.', url: 'https://doi.org/10.26480/fabm.02.2023.117.126', site: 'doi.org' },
]

export function Cite({ n }: { n: number[] }) {
  return (
    <sup>
      {n.map(i => <a key={i} href={`#s${i}`}>{i}</a>)}
    </sup>
  )
}

export function Footer({ lang }: { lang: Lang }) {
  const t = translator(lang)
  const base = lang === 'en' ? '/en' : ''
  return (
    <footer className="wrap">
      <div className="cols">
        <div>
          <Link className="brand" href={home(lang)}><b>{t('SmartKrishiAI', 'स्मार्ट कृषि')}</b></Link>
          <p style={{ marginTop: 10 }}>{t('The Nepali farm app that joins farmers, Palikas and buyers.', 'किसान, पालिका र खरिदकर्तालाई जोड्ने नेपाली कृषि एप।')}</p>
          <div className="links">
            <Link href={`${base}/privacy`}>{t('Privacy policy', 'गोपनीयता नीति')}</Link>
            <Link href={`${base}/terms`}>{t('Terms', 'सेवाका सर्त')}</Link>
          </div>
        </div>
        <div>
          <h4>{t('Sources', 'स्रोत')}</h4>
          <ol>
            {SOURCES.map(s => (
              <li key={s.id} id={s.id}>{s.text} <a href={s.url}>{s.site}</a></li>
            ))}
          </ol>
        </div>
      </div>
      <p className="fine">{t('Photos', 'तस्बिर')}: Krish Dulal (CC BY-SA 3.0), Wikimedman (CC BY-SA 4.0), Wikimedia Commons. © 2026 SmartKrishiAI</p>
    </footer>
  )
}
