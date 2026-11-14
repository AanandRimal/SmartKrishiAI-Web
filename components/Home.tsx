import Image from 'next/image'
import QRCode from 'qrcode'
import { Donut, GrowBars } from './charts'
import { C } from './colors'
import { DemoForm } from './DemoForm'
import { Flow, type Lane } from './Flow'
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
        <Registry t={t} />
        <Context t={t} />
        <Chain t={t} />
        <Product t={t} />
        <Start t={t} lang={lang} />
        <section className="demo" id="demo">
          <figure>
            <Image src="/img/welcome.webp" width={1080} height={721} alt={t('Two women farmers laughing while planting rice', 'धान रोप्दै खुसी दुई किसान दिदीबहिनी')} />
          </figure>
          <DemoForm lang={lang} />
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}

function Hero({ t }: { t: T }) {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>{t('A farmer’s work should not rot in the field.', 'किसानको मेहनत बारीमै कुहिन नदिऔं।')}</h1>
        <p className="lead">
          {t(
            'Advice on disease arrives late, harvests leave cheap through middlemen, and the Palika has no reliable list of its own farmers. SmartKrishiAI joins the farmer, the Palika and the buyer in one chain.',
            'रोगको सल्लाह ढिलो आउँछ, उब्जनी बिचौलियाको हातबाट सस्तोमा जान्छ, र पालिकासँग आफ्ना किसानको भरपर्दो सूची हुँदैन। स्मार्ट कृषिले किसान, पालिका र खरिदकर्तालाई एउटै सूत्रमा जोड्छ।',
          )}
        </p>
        <div className="acts">
          <a className="btn" href="#demo">{t('Request a demo for your Palika', 'पालिकामा डेमो माग्नुहोस्')}</a>
          <a className="more" href="#chain">{t('See where the money goes', 'पैसा कहाँ जान्छ हेर्नुहोस्')}</a>
        </div>
      </div>
      <figure className="hero-photo">
        <Image src="/img/sell.webp" width={900} height={1200} preload alt={t('Baskets of tomatoes waiting for buyers at a market', 'डोकोमा भरिएका गोलभेडा, हाटबजारमा बिक्रीको पर्खाइमा')} />
        <figcaption>Photo: Krish Dulal, CC BY-SA 3.0</figcaption>
      </figure>
    </div>
  )
}

function Registry({ t }: { t: T }) {
  return (
    <section className="registry" id="numbers">
      <div className="wrap">
        <h2 className="h2">{t('4.1 million farm households. 0.88 million on a verified list.', '४१ लाख किसान परिवार। प्रमाणित सूचीमा ८.८ लाख मात्र।')}</h2>
        <p className="intro">
          {t('Nepal’s farmer registry has started, but most households are still not verified by a ward or Palika.', 'किसान सूचीकरण सुरु भएको छ, तर अधिकांश परिवार अझै वडा वा पालिकाबाट प्रमाणित भएका छैनन्।')}
          <Cite n={[1, 2]} />
        </p>
        <GrowBars
          rows={[
            { label: t('Farm households in the agriculture census', 'कृषि गणनामा किसान परिवार'), value: t('4,130,789', '४१,३०,७८९'), pct: 100, color: C.gray },
            { label: t('Listed in the farmer registry', 'किसान सूचीकरणमा नाम दर्ता'), value: t('2.68 million', '२६.७९ लाख'), pct: 65, color: C.gold, note: t('65%', '६५%') },
            { label: t('Verified by a ward or Palika', 'वडा वा पालिकाले प्रमाणित गरेका'), value: t('0.88 million', '८.८२ लाख'), pct: 21, color: C.green, note: t('21%', '२१%') },
          ]}
        />
        <div className="palika-line">
          <b className="num">{t('123 of 753', '७५३ मध्ये १२३')}</b>
          <div>
            <p>{t('local levels have finished registration', 'स्थानीय तहमा सूचीकरण पूरा भएको छ')}</p>
            <div className="seg" role="img" aria-label={t('123 of 753 local levels complete', '७५३ मध्ये १२३ स्थानीय तह पूरा')}>
              <i style={{ flex: 123, background: C.green }} /><i style={{ flex: 630, background: C.gray }} />
            </div>
            <p className="fig-note">{t('Ministry counts, September 2026. Percentages calculated from sources 1 and 2.', 'मन्त्रालयको असोज २०८३ को संख्या। प्रतिशत स्रोत १ र २ बाट हिसाब गरिएको।')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Context({ t }: { t: T }) {
  return (
    <section className="context">
      <div className="wrap">
        <h2 className="h2">{t('A quarter of the economy, with thin support behind it', 'देशको एक चौथाइ अर्थतन्त्र, तर पछाडि सहयोग पातलो')}</h2>
        <div className="context-grid">
          <figure className="gdp">
            <Donut
              label={t('Share of GDP 2025/26: agriculture 24%, industry 14%, services 62%', 'कुल गार्हस्थ्य उत्पादन २०८२/८३: कृषि २४%, उद्योग १४%, सेवा ६२%')}
              center={{ big: t('24%', '२४%'), small: t('agriculture', 'कृषि') }}
              parts={[
                { label: t('Agriculture', 'कृषि'), value: 24.03, text: t('24%', '२४%'), color: C.green },
                { label: t('Industry', 'उद्योग'), value: 14.16, text: t('14%', '१४%'), color: C.gray },
                { label: t('Services', 'सेवा'), value: 61.81, text: t('62%', '६२%'), color: C.pale },
              ]}
            />
            <figcaption>{t('Agriculture’s share of GDP, 2025/26', 'कुल गार्हस्थ्य उत्पादनमा कृषिको हिस्सा, २०८२/८३')}<Cite n={[3]} /></figcaption>
          </figure>

          <div className="facts">
            <div className="fact">
              <b className="num">{t('820', '८२०')}</b>
              <div>
                <p>{t('farm households for each working local agriculture technician (calculated)', 'किसान परिवारको भागमा एक जना कार्यरत स्थानीय कृषि प्राविधिक (हिसाब)')}<Cite n={[1, 4]} /></p>
                <div className="seg" role="img" aria-label={t('7,071 posts: 5,021 filled, 2,050 vacant', '७,०७१ दरबन्दी: ५,०२१ पदपूर्ति, २,०५० रिक्त')}>
                  <i style={{ flex: 5021, background: C.green }} /><i style={{ flex: 2050, background: C.gray }} />
                </div>
                <p className="seg-key">
                  <span><i style={{ background: C.green }} />{t('5,021 posts filled', '५,०२१ पदपूर्ति')}</span>
                  <span><i style={{ background: C.gray }} />{t('2,050 vacant', '२,०५० रिक्त')}</span>
                </p>
              </div>
            </div>

            <div className="fact">
              <b className="num loss">{t('20–50%', '२०–५०%')}</b>
              <div>
                <p>{t('of fruit and vegetables is lost between harvest and sale', 'फलफूल र तरकारी टिपेदेखि बिक्रीसम्म खेर जान्छ')}<Cite n={[5]} /></p>
                <div className="seg" role="img" aria-label={t('Of 100 kg harvested, 20 to 50 kg is lost', '१०० केजी टिप्दा २० देखि ५० केजी खेर')}>
                  <i style={{ flex: 20, background: C.red }} /><i style={{ flex: 30, background: C.redTint }} /><i style={{ flex: 50, background: C.pale }} />
                </div>
                <p className="seg-key">
                  <span><i style={{ background: C.red }} />{t('at least 20 kg', 'कम्तीमा २० केजी')}</span>
                  <span><i style={{ background: C.redTint }} />{t('up to 50 kg', '५० केजीसम्म')}</span>
                  <span>{t('of every 100 kg', 'हरेक १०० केजीमा')}</span>
                </p>
              </div>
            </div>

            <div className="fact">
              <b className="num">{t('Rs 38.5 bn', '३८.५ अर्ब')}</b>
              <div>
                <p>{t('of vegetables imported in 2024/25, about Rs 105 million every day (calculated)', 'रुपैयाँको तरकारी २०८१/८२ मा आयात, अर्थात् दिनको करिब १० करोड ५० लाख (हिसाब)')}<Cite n={[6]} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Chain({ t }: { t: T }) {
  const lanes: Lane[] = [
    {
      kind: 'before', title: t('Before', 'पहिले'), count: t('3 middlemen', '३ बिचौलिया'),
      result: t('Middlemen keep Rs 35 of every Rs 75. The farmer gets Rs 40.', 'हरेक रु. ७५ मध्ये रु. ३५ बिचौलियाले लिए। किसानलाई रु. ४०।'),
      stops: [
        { icon: 'farm', name: t('Farmer', 'किसान'), note: t('sells at the collector’s price', 'संकलकले भनेको मूल्यमा बेच्छ'), price: t('Rs 40', 'रु. ४०') },
        { icon: 'collector', name: t('Collector', 'संकलक'), note: t('sets the price', 'मूल्य उसैले तोक्छ'), tag: true },
        { icon: 'truck', name: t('Wholesale market', 'थोक बजार'), tag: true, note: t('long haul, hours in the sun', 'लामो ढुवानी, घाममा घण्टौं'), loss: t('20–50% of fruit and vegetables is lost after harvest', 'टिपेपछि २०–५०% फलफूल-तरकारी खेर') },
        { icon: 'shop', name: t('Retailer', 'खुद्रा पसल'), note: t('adds a margin', 'थप नाफा राख्छ'), tag: true },
        { icon: 'kitchen', name: t('Buyer', 'उपभोक्ता'), note: t('pays for every hand', 'हरेक हातको मूल्य तिर्छ'), price: t('Rs 75', 'रु. ७५') },
      ],
    },
    {
      kind: 'after', title: t('With SmartKrishiAI', 'स्मार्ट कृषिसँग'), count: t('No middlemen', 'बिचौलिया हटे'),
      result: t('No middleman. Payment goes straight to the farmer.', 'बिचौलिया छैन। भुक्तानी सिधै किसानलाई।'),
      stops: [
        { icon: 'farm', name: t('Verified farmer', 'प्रमाणित किसान'), note: t('lists the harvest and sets the price', 'उब्जनी र मूल्य आफैं राख्छ') },
        { icon: 'pickup', name: t('Ward pickup point', 'वडाको संकलन केन्द्र'), note: t('on set days, still fresh', 'तोकिएको दिन, ताजै'), cut: true },
        { icon: 'kitchen', name: t('Buyer', 'खरिदकर्ता'), note: t('a home, hotel or trader', 'घर, होटल वा व्यापारी') },
      ],
    },
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
      now: t('A registry verified in person, ward-level figures, and the monthly report for the executive meeting in one place.', 'भेटेर प्रमाणित गरिएको किसान दर्ता, वडागत तथ्याङ्क, र कार्यपालिका बैठकका लागि मासिक प्रतिवेदन एकै ठाउँमा।'),
    },
    {
      who: t('Buyer', 'खरिदकर्ता'),
      was: t('Hotels and households pay a markup to middlemen and never know who grew it.', 'होटल र घरपरिवार बिचौलियाबाट महँगोमा किन्छन्; कसले उब्जायो थाहा हुँदैन।'),
      now: t('Buy straight from farmers the Palika has verified and collect at the ward pickup point. The app never holds the money.', 'पालिकाले प्रमाणित गरेको किसानबाट सिधै किन्छन्, वडाको संकलन केन्द्रबाट लिन्छन्। एपले पैसा राख्दैन।'),
    },
  ]
  return (
    <section className="chain" id="chain">
      <div className="wrap">
        <h2 className="h2">{t('Rs 40 at the farm. Rs 75 in the kitchen.', 'बारीमा रु. ४०, भान्सामा रु. ७५।')}</h2>
        <div className="chain-top">
          <figure className="price">
            <Donut
              size={280}
              thick={34}
              label={t('Of Rs 75 paid per kilo of tomatoes, Rs 40 reached the farmer and Rs 35 stayed between farm and buyer', 'गोलभेडाको किलोको रु. ७५ मध्ये किसानले रु. ४० र बीचका हातले रु. ३५ पाए')}
              center={{ big: t('Rs 75', 'रु. ७५'), small: t('per kilo of tomatoes', 'प्रति केजी गोलभेडा') }}
              parts={[
                { label: t('reached the farmer', 'किसानले पाए'), value: 40, text: t('Rs 40', 'रु. ४०'), color: C.green },
                { label: t('kept by middlemen', 'बिचौलियाले लिए'), value: 35, text: t('Rs 35', 'रु. ३५'), color: C.gold },
              ]}
            />
            <ul className="legend">
              <li><i style={{ background: C.green }} /><span>{t('Farmer', 'किसान')}</span><b>{t('Rs 40 (53%)', 'रु. ४० (५३%)')}</b></li>
              <li><i style={{ background: C.gold }} /><span>{t('Middlemen: collector, market, retailer', 'बिचौलिया: संकलक, बजार, पसल')}</span><b>{t('Rs 35 (47%)', 'रु. ३५ (४७%)')}</b></li>
            </ul>
            <figcaption>{t('Tomato value chain study, Bhaktapur, 2022 data', 'गोलभेडा मूल्य शृङ्खला अध्ययन, भक्तपुर, २०७९ को तथ्याङ्क')}<Cite n={[7]} /></figcaption>
          </figure>
          <Flow tag={t('Middleman', 'बिचौलिया')} cutLabel={t('no middleman', 'बिचौलिया छैन')} lanes={lanes} replay={t('Watch again', 'फेरि हेर्नुहोस्')} />
        </div>

        <div className="roles" role="table">
          <div className="roles-head" role="row">
            <span role="columnheader" />
            <span role="columnheader">{t('Before', 'पहिले')}</span>
            <span role="columnheader">{t('With SmartKrishiAI', 'स्मार्ट कृषिसँग')}</span>
          </div>
          {roles.map(r => (
            <div key={r.who} className="roles-row" role="row">
              <h3 role="rowheader">{r.who}</h3>
              <p className="was" role="cell" data-l={t('Before', 'पहिले')}>{r.was}</p>
              <p className="now" role="cell" data-l={t('With SmartKrishiAI', 'स्मार्ट कृषिसँग')}>{r.now}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Product({ t }: { t: T }) {
  const phones = [
    {
      title: t('Speak, don’t type', 'टाइप होइन, बोल्नुहोस्'),
      text: t('The farmer says name, ward, land, crops and animals once. The AI fills the form. Without a smartphone, the ward office registers them.', 'किसानले नाम, वडा, जग्गा, बाली र पशु एकपटक भन्छन्, AI ले फाराम भर्छ। स्मार्टफोन नहुनेलाई वडा कार्यालयले दर्ता गरिदिन्छ।'),
      img: '/img/app-voice.webp',
      alt: t('Voice registration: the form filled in from what the farmer said', 'बोलेर दर्ता: किसानको भनाइबाट भरिएको फाराम'),
    },
    {
      title: t('Only their own crops', 'आफ्नै बालीको मात्र कुरा'),
      text: t('Disease alerts for the crops they grow, today’s weather, and one sentence on what to do. The crop and animal doctor are one tap away.', 'आफूले लगाएको बालीमा रोगको चेतावनी, आजको मौसम र के गर्ने भन्ने एक वाक्य। बाली र पशु डाक्टर एक थिचाइमा।'),
      img: '/img/app-home.webp',
      alt: t('Farmer home screen: late blight alert for tomato and today’s weather', 'किसानको गृहपृष्ठ: गोलभेडामा डढुवा रोगको चेतावनी र मौसम'),
    },
    {
      title: t('Sell straight to buyers', 'खरिदकर्तालाई सिधै बिक्री'),
      text: t('Households, hotels and traders book harvests from verified farmers and collect at the ward pickup point.', 'उपभोक्ता, होटल र व्यापारीले प्रमाणित किसानको उब्जनी बुक गरेर वडाको संकलन केन्द्रबाट लिन्छन्।'),
      img: '/img/app-market.webp',
      alt: t('Fresh market: potatoes and tomatoes from verified farmers', 'ताजा बजार: प्रमाणित किसानका आलु र गोलभेडा'),
    },
  ]
  return (
    <section className="product" id="product">
      <div className="wrap">
        <h2 className="h2">{t('Simple enough for a farmer who does not read or type', 'पढ्न-लेख्न नजान्ने किसानले पनि चलाउन सक्ने')}</h2>
        <div className="terraces">
          {phones.map(p => (
            <figure key={p.img}>
              <div className="phone"><Image src={p.img} width={780} height={1688} alt={p.alt} /></div>
              <figcaption><b>{p.title}</b>{p.text}</figcaption>
            </figure>
          ))}
        </div>
        <div className="portal">
          <div>
            <h3>{t('For the Palika, the report writes itself', 'पालिकाका लागि, प्रतिवेदन आफैं तयार')}</h3>
            <p>{t('The agriculture section answers farmers, sends alerts and verifies registrations from one portal. At month end the ward-by-ward report is ready to print or export to Excel.', 'कृषि शाखाले किसानको प्रश्नको जवाफ, चेतावनी र दर्ता प्रमाणीकरण एउटै पोर्टलबाट गर्छ। महिनाको अन्त्यमा वडागत प्रतिवेदन छाप्न वा एक्सेलमा लिन तयार हुन्छ।')}</p>
          </div>
          <div className="screen"><Image src="/img/portal-report.webp" width={1440} height={2099} alt={t('Palika portal monthly progress report', 'पालिका पोर्टलको मासिक प्रगति प्रतिवेदन')} /></div>
        </div>
      </div>
    </section>
  )
}

const PLAY = 'https://play.google.com/store/apps/details?id=np.smartkrishiai.app'
const PORTAL = 'https://portal.smartkrishiai.com'

async function Start({ t, lang }: { t: T; lang: Lang }) {
  // Drawn at build time, so the page carries the QR as plain SVG.
  const qr = await QRCode.toString(PLAY, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#16241C', light: '#ffffff' } })
  return (
    <section className="start" id="start">
      <div className="wrap">
        <h2 className="h2">{t('Who are you?', 'तपाईं को हुनुहुन्छ?')}</h2>
        <div className="tiles">
          <div className="tile app">
            <small>{t('Farmer or buyer', 'किसान वा खरिदकर्ता')}</small>
            <h3>{t('Download the app', 'एप डाउनलोड गर्नुहोस्')}</h3>
            <p>{t('Crop and animal doctor, weather and the fresh market, in Nepali.', 'बाली र पशु डाक्टर, मौसम र ताजा बजार, नेपालीमै।')}</p>
            <a className="play" href={PLAY}>
              <Image src={`/img/badge/${lang}.png`} width={646} height={250} alt={t('Get it on Google Play', 'Google Play मा प्राप्त गर्नुहोस्')} />
            </a>
            <div className="qr">
              <span dangerouslySetInnerHTML={{ __html: qr }} />
              <p>{t('On a computer? Scan with your phone camera.', 'कम्प्युटरमा हुनुहुन्छ? फोनको क्यामेराले स्क्यान गर्नुहोस्।')}</p>
            </div>
            <div className="peek phone"><Image src="/img/app-home.webp" width={780} height={1688} alt="" /></div>
          </div>

          <a className="tile portal-tile" href={PORTAL}>
            <small>{t('Palika or ward staff', 'पालिका वा वडाका कर्मचारी')}</small>
            <h3>{t('Log in to the portal', 'पोर्टलमा लगइन')}</h3>
            <p>{t('Farmers’ questions, the registry, alerts and the monthly report.', 'किसानका प्रश्न, दर्ता, चेतावनी र मासिक प्रतिवेदन।')}</p>
            <span className="btn">{t('Open the portal', 'पोर्टल खोल्नुहोस्')}</span>
            <span className="url">portal.smartkrishiai.com</span>
            <div className="peek browser">
              <i /><i /><i />
              <Image src="/img/portal-report.webp" width={1440} height={2099} alt="" />
            </div>
          </a>

          <a className="tile demo-tile" href="#demo">
            <div className="tile-photo"><Image src="/img/terrace.webp" width={1080} height={810} alt="" /></div>
            <small>{t('Mayor, chair or IT officer', 'नगर/गाउँपालिका प्रमुख वा आईटी अधिकृत')}</small>
            <h3>{t('Bring it to your Palika', 'आफ्नो पालिकामा ल्याउनुहोस्')}</h3>
            <p>{t('We come to your office and show the app and portal to your team.', 'हामी कार्यालयमै आएर तपाईंको टोलीलाई एप र पोर्टल देखाउँछौं।')}</p>
            <span className="btn gold">{t('Request a demo', 'डेमो माग्नुहोस्')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
