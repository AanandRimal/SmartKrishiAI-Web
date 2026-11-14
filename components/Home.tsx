import Image from 'next/image'
import { DemoForm } from './DemoForm'
import { Cite, Footer } from './Footer'
import { Header } from './Header'
import { type Lang, translator } from './lang'

type T = ReturnType<typeof translator>

export function Home({ lang }: { lang: Lang }) {
  const t = translator(lang)
  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero t={t} />
        <Numbers t={t} />
        <Chain t={t} />
        <Product t={t} />
        <Start t={t} />
        <section className="demo" id="demo">
          <div className="wrap">
            <figure>
              <Image src="/img/welcome.webp" width={1080} height={721} alt={t('Two women farmers laughing while planting rice', 'धान रोप्दै खुसी दुई किसान दिदीबहिनी')} />
            </figure>
            <DemoForm lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}

function Hero({ t }: { t: T }) {
  return (
    <div className="wrap hero">
      <div>
        <h1>
          {t('A farmer’s work should not ', 'किसानको मेहनत ')}
          <em>{t('rot', 'बारीमै')}</em>
          {t(' in the field.', ' कुहिन नदिऔं।')}
        </h1>
        <p className="lead">
          {t(
            'Advice on disease arrives late, harvests leave cheap through middlemen, and the Palika has no reliable list of its own farmers. SmartKrishiAI joins the farmer, the Palika and the buyer in one chain.',
            'रोगको सल्लाह ढिलो आउँछ, उब्जनी बिचौलियाको हातबाट सस्तोमा जान्छ, र पालिकासँग आफ्ना किसानको भरपर्दो सूची हुँदैन। स्मार्ट कृषिले किसान, पालिका र खरिदकर्तालाई एउटै सूत्रमा जोड्छ।',
          )}
        </p>
        <div className="acts">
          <a className="btn" href="#demo">{t('Request a demo for your Palika', 'पालिकामा डेमो माग्नुहोस्')}</a>
          <a className="more" href="#chain">{t('See before and after', 'पहिले र अब हेर्नुहोस्')}</a>
        </div>
      </div>
      <figure>
        <Image src="/img/sell.webp" width={900} height={1200} preload alt={t('Baskets of tomatoes waiting for buyers at a market', 'डोकोमा भरिएका गोलभेडा, हाटबजारमा बिक्रीको पर्खाइमा')} />
        <figcaption className="credit">Photo: Krish Dulal, CC BY-SA 3.0</figcaption>
      </figure>
    </div>
  )
}

function Numbers({ t }: { t: T }) {
  const registry = [
    { label: t('Farm households, agriculture census 2021/22', 'कृषि गणना २०७८ अनुसार किसान परिवार'), value: t('4,130,789', '४१,३०,७८९'), pct: 100, cite: [1] },
    { label: t('Listed in the national farmer registry', 'किसान सूचीकरणमा नाम दर्ता'), value: t('2.68 million · 65%', '२६.७९ लाख · ६५%'), pct: 65, cite: [2] },
    { label: t('Verified by a ward or Palika', 'पालिका वा वडाले प्रमाणित गरेका'), value: t('0.88 million · 21%', '८.८२ लाख · २१%'), pct: 21, cite: [2] },
  ]
  const ledger = [
    { big: t('24%', '२४%'), text: t('of Nepal’s GDP comes from agriculture, 2025/26', 'देशको कुल गार्हस्थ्य उत्पादनमा कृषिको हिस्सा, २०८२/८३'), cite: [3] },
    { big: t('820', '८२०'), text: t('farm households for each working local agriculture technician (calculated)', 'किसान परिवार, एक जना कार्यरत स्थानीय कृषि प्राविधिकको भागमा (हिसाब)'), cite: [1, 4] },
    { big: t('20–50%', '२०–५०%'), text: t('of fruit and vegetables is lost after harvest', 'फलफूल र तरकारी टिपेपछि बिग्रेर खेर जान्छ'), cite: [5], hot: true },
    { big: t('38.5 bn', '३८.५ अर्ब'), text: t('rupees of vegetables imported in one year, 2024/25', 'रुपैयाँको तरकारी एक वर्षमा आयात, २०८१/८२'), cite: [6] },
  ]
  return (
    <section className="numbers" id="numbers">
      <div className="wrap">
        <p className="kicker">{t('In government figures', 'सरकारी तथ्याङ्कमा')}</p>
        <h2 className="h2">{t('Nepal has 4.1 million farm households. Fewer than 0.9 million are on a verified list.', 'देशमा ४१ लाख किसान परिवार छन्। प्रमाणित सूचीमा ९ लाख पनि पुगेका छैनन्।')}</h2>
        <div className="gap">
          {registry.map(r => (
            <div key={r.pct}>
              <div className="meta"><span>{r.label}<Cite n={r.cite} /></span><b>{r.value}</b></div>
              <div className="bar"><i style={{ width: `${r.pct}%` }} /></div>
            </div>
          ))}
          <p className="meta">{t('Registration is complete in only 123 of 753 local levels. Percentages calculated from sources 1 and 2.', '७५३ स्थानीय तहमध्ये १२३ मा मात्र सूचीकरण पूरा भएको छ। प्रतिशत स्रोत १ र २ बाट हिसाब गरिएको।')}</p>
        </div>
        <div className="ledger">
          {ledger.map(l => (
            <div key={l.big} className={l.hot ? 'hot' : undefined}>
              <b>{l.big}</b>
              <p>{l.text}<Cite n={l.cite} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Hops({ items }: { items: { name: string; note: string; loss?: boolean; pickup?: boolean }[] }) {
  return (
    <ol className="hops">
      {items.map(h => (
        <li key={h.name} className={h.pickup ? 'pickup' : undefined}>
          {h.name}
          <small className={h.loss ? 'loss' : undefined}>{h.note}</small>
        </li>
      ))}
    </ol>
  )
}

function Chain({ t }: { t: T }) {
  const before = [
    { name: t('Farmer', 'किसान'), note: t('sprays by guesswork', 'रोगमा अनुमानले औषधि'), loss: true },
    { name: t('Collector', 'संकलक'), note: t('sets the price', 'मूल्य उसैले तोक्छ') },
    { name: t('Wholesale market', 'थोक बजार'), note: t('spoils on the way', 'ढुवानीमा कुहिन्छ'), loss: true },
    { name: t('Retailer', 'खुद्रा पसल'), note: t('adds a margin', 'थप नाफा') },
    { name: t('Buyer', 'उपभोक्ता'), note: t('pays more', 'महँगोमा किन्छ') },
  ]
  const after = [
    { name: t('Palika-verified farmer', 'पालिका-प्रमाणित किसान'), note: t('advised by the AI doctor and ward technician', 'AI डाक्टर र वडा प्राविधिकको सल्लाह') },
    { name: t('Ward pickup point', 'वडाको संकलन केन्द्र'), note: t('on set days, fresh', 'तोकिएको दिन, ताजै'), pickup: true },
    { name: t('Households, hotels, traders', 'उपभोक्ता, होटल, व्यापारी'), note: t('pay the farmer directly', 'पैसा सिधै किसानलाई') },
  ]
  const roles = [
    {
      who: t('Farmer', 'किसान'),
      was: t('Spots on the leaves and nobody to ask. Sprays by guesswork; loses the crop or the animal.', 'पातमा दाग देखियो, सल्लाह कहाँ सोध्ने थाहा छैन। अनुमानमै औषधि छर्यो; बाली वा पशु गुम्यो।'),
      now: t('Takes a photo or just speaks. The AI doctor answers at once and the ward technician checks and confirms.', 'फोटो खिच्छ वा बोल्छ। AI डाक्टरले तुरुन्तै सल्लाह दिन्छ, वडा प्राविधिकले हेरेर पुष्टि गर्छ।'),
    },
    {
      who: t('Palika', 'पालिका'),
      was: t('Which ward farms what lives on scattered paper. Subsidy and relief go out on guesswork.', 'कुन वडामा कति किसान, के लगाउँछन्, कागजमा छरिएको। अनुदान र राहत अनुमानमा बाँडिन्छ।'),
      now: t('A farmer registry verified in person, ward-level figures, and the monthly report for the executive meeting, all in one place.', 'भेटेर प्रमाणित गरिएको किसान दर्ता, वडागत तथ्याङ्क, र कार्यपालिका बैठकका लागि मासिक प्रतिवेदन एकै ठाउँमा।'),
    },
    {
      who: t('Buyer', 'खरिदकर्ता'),
      was: t('Hotels and households pay a markup to middlemen and never know who grew it.', 'होटल र घरपरिवार बिचौलियाबाट महँगोमा किन्छन्; कहाँ, कसले उब्जायो थाहा हुँदैन।'),
      now: t('Buy straight from farmers the Palika has verified and collect at the ward pickup point. The app never holds the money.', 'पालिकाले प्रमाणित गरेको किसानबाट सिधै किन्छन्, वडाको संकलन केन्द्रबाट लिन्छन्। एपले पैसा राख्दैन।'),
    },
  ]
  return (
    <section id="chain">
      <div className="wrap">
        <p className="kicker">{t('Before and after', 'पहिले र अब')}</p>
        <h2 className="h2">{t('From field to kitchen, with fewer hands in between', 'बारीदेखि भान्सासम्म, बीचका हात घट्छन्')}</h2>
        <div className="chain">
          <div className="row before"><span>{t('Before', 'पहिले')}</span><Hops items={before} /></div>
          <div className="row after"><span>{t('Now', 'अब')}</span><Hops items={after} /></div>
        </div>
        <p className="case">
          {t('In one Bhaktapur study, buyers paid Rs 75 a kilo for tomatoes and the farmer received Rs 40.', 'भक्तपुरको एक अध्ययनमा गोलभेडा उपभोक्ताले किलोको रु. ७५ तिर्दा किसानले रु. ४० मात्र पाए।')}
          <Cite n={[7]} />
        </p>
        <div className="roles">
          {roles.map(r => (
            <div key={r.who}>
              <h3>{r.who}</h3>
              <dl>
                <dt className="was">{t('Before', 'पहिले')}</dt>
                <dd className="was">{r.was}</dd>
                <dt className="now">{t('Now', 'अब')}</dt>
                <dd>{r.now}</dd>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Product({ t }: { t: T }) {
  const shots = [
    {
      title: t('Speak, don’t type', 'टाइप होइन, बोल्नुहोस्'),
      text: t('The farmer says it once in their own words: name, ward, land, crops and animals. The AI fills the form; the farmer checks it and saves.', 'किसानले आफ्नै शब्दमा एकपटक भन्छन्: नाम, वडा, जग्गा, बाली र पशु। AI ले बुझेर फाराम आफैं भर्छ; किसानले हेरेर ठीक छ भन्छन्।'),
      note: t('Farmers without a smartphone are registered by the ward office, which can also list their harvest for sale.', 'स्मार्टफोन नभएका किसानलाई वडा कार्यालयले नै दर्ता गरिदिन्छ र उब्जनी बेचिदिन्छ।'),
      img: '/img/app-voice.webp',
      alt: t('Voice registration: the form filled in from what the farmer said', 'बोलेर दर्ता: किसानको भनाइबाट नाम, वडा, जग्गा र बाली भरिएको फाराम'),
    },
    {
      title: t('Only their own crops and animals', 'आफ्नै बाली र पशुको मात्र कुरा'),
      text: t('The home screen shows only what this farmer needs: disease alerts for the crops they grow, today’s weather and one sentence on what to do. The crop and animal doctor are one tap away.', 'गृहपृष्ठमा त्यही देखिन्छ जुन किसानलाई चाहिन्छ: उनले लगाएको बालीमा रोगको चेतावनी, आजको मौसम र के गर्ने भन्ने एक वाक्य। बाली वा पशु डाक्टर एक थिचाइमा।'),
      img: '/img/app-home.webp',
      alt: t('Farmer home screen: late blight alert for tomato and today’s weather', 'किसानको गृहपृष्ठ: गोलभेडामा डढुवा रोगको चेतावनी र आजको मौसम'),
    },
    {
      title: t('A fresh market, straight from farmers', 'ताजा बजार, किसानबाट सिधै'),
      text: t('Households, hotels and traders browse harvests from Palika-verified farmers, book ahead, and collect at the ward pickup point. Payment goes directly between farmer and buyer.', 'उपभोक्ता, होटल र व्यापारीले पालिका-प्रमाणित किसानको उब्जनी हेर्छन्, अग्रिम बुक गर्छन्, र वडाको संकलन केन्द्रबाट लिन्छन्। भुक्तानी किसान र खरिदकर्ताबीच सिधै हुन्छ।'),
      img: '/img/app-market.webp',
      alt: t('Fresh market: potatoes and tomatoes with price, quantity left and verified farmer', 'ताजा बजार: आलु र गोलभेडा, मूल्य, बाँकी परिमाण र पालिका प्रमाणित किसान'),
    },
    {
      title: t('For the Palika, the report writes itself', 'पालिकाका लागि, प्रतिवेदन आफैं तयार'),
      text: t('The agriculture section answers farmers, sends alerts and verifies registrations from one portal. At month end the ward-by-ward report is ready to print or export to Excel.', 'कृषि शाखाले किसानको प्रश्नको जवाफ, चेतावनी पठाउने र दर्ता प्रमाणित गर्ने काम एउटै पोर्टलबाट गर्छ। महिनाको अन्त्यमा वडागत प्रतिवेदन छाप्न वा एक्सेलमा लिन तयार हुन्छ।'),
      img: '/img/portal-report.webp',
      alt: t('Palika portal monthly progress report: farmers, questions and harvest by ward', 'पालिका पोर्टलको मासिक प्रगति प्रतिवेदन: वडागत किसान, प्रश्न र उब्जनी'),
      wide: true,
    },
  ]
  return (
    <section className="product" id="product">
      <div className="wrap">
        <p className="kicker">{t('The app and the portal', 'एप र पोर्टल')}</p>
        <h2 className="h2">{t('Simple enough for a farmer who does not read or type', 'पढ्न-लेख्न नजान्ने किसानले पनि चलाउन सक्ने')}</h2>
        {shots.map((s, i) => (
          <div key={s.img} className={i % 2 ? 'shot flip' : 'shot'}>
            <div className="shot-text">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.note && <p className="note">{s.note}</p>}
            </div>
            {s.wide
              ? <div className="screen"><Image src={s.img} width={1440} height={2099} alt={s.alt} /></div>
              : <div className="phone"><Image src={s.img} width={780} height={1688} alt={s.alt} /></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function Start({ t }: { t: T }) {
  const paths = [
    { href: 'https://play.google.com/store/apps/details?id=np.smartkrishiai.app', who: t('Farmer or buyer', 'किसान वा खरिदकर्ता'), what: t('Download the app', 'एप डाउनलोड गर्नुहोस्'), go: 'Google Play →' },
    { href: 'https://portal.smartkrishiai.com', who: t('Palika or ward staff', 'पालिका वा वडाका कर्मचारी'), what: t('Log in to the portal', 'पोर्टलमा लगइन'), go: 'portal.smartkrishiai.com →' },
    { href: '#demo', who: t('Mayor, chair or IT officer', 'नगर/गाउँपालिका प्रमुख वा आईटी अधिकृत'), what: t('Bring it to your Palika', 'आफ्नो पालिकामा ल्याउनुहोस्'), go: t('Request a demo →', 'डेमो माग्नुहोस् →') },
  ]
  return (
    <section id="start">
      <div className="wrap">
        <p className="kicker">{t('Get started', 'सुरु गर्नुहोस्')}</p>
        <h2 className="h2">{t('Who are you?', 'तपाईं को हुनुहुन्छ?')}</h2>
        <div className="paths">
          {paths.map(p => (
            <a key={p.href} href={p.href}>
              <small>{p.who}</small>
              <b>{p.what}</b>
              <span className="go">{p.go}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
