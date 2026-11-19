import { icon } from './icons.mjs';
import {
  esc, twoLine, eyebrow, arrowLink, btn, closingCta, credentials, areaCard, accordion,
  locationTabs, steps, breadcrumb, picture, doylesBadges, ticker, reviews
} from './partials.mjs';

const IMG = { road: 'blue-road', courthouse: 'blue-court', room: 'blue-room', coastline: 'blue-coast' };
const catLabel = (site, key) => (site.categories.find(([k]) => k === key) || [key, key])[1];
const num = (i) => String(i + 1).padStart(2, '0');

/* ---------------------------------------------------------------- Home */
export function home(ctx) {
  const { site, areas } = ctx;
  const featured = site.featured.map((s) => areas.find((a) => a.slug === s));
  const homeFaqs = ['What happens in our first conversation?', 'Will I deal directly with Adam?', 'Can we meet by phone or video?', 'How do I find out about legal fees?']
    .map((q) => ctx.questions.find((x) => x.q === q));
  return {
    path: '/',
    title: 'Your future. Worth defending. | Frontline Lawyers',
    description: 'Criminal defence lawyer Adam Ashley. Personal representation across Northern Rivers NSW and South East Queensland, from Murwillumbah.',
    bodyClass: 'page-home',
    body: `
<section class="hero">
  <img class="hero-bg" src="/assets/images/blue-coast.webp" srcset="/assets/images/blue-coast-900.webp 900w, /assets/images/blue-coast.webp 1666w" sizes="100vw" alt="Deep blue ocean and white surf along an Australian coastal headland" fetchpriority="high" decoding="async">
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <div class="rise" style="--d:0">${eyebrow('Criminal defence. Human first.', 'eyebrow-light')}</div>
      <h1 class="display"><span class="rise" style="--d:1">Your future.</span><em class="rise" style="--d:2">Worth defending.</em></h1>
      <p class="hero-lead rise" style="--d:3">When everything feels uncertain,<br>who stands beside you matters.</p>
      <div class="btn-row rise" style="--d:4">
        ${btn('/contact/', 'Speak with Adam')}
        ${arrowLink('/expertise/', 'Explore our expertise', { cls: 'link-arrow link-light' })}
      </div>
      <p class="hero-note rise" style="--d:5">${icon('shield')}Clear advice. Personal commitment. Every step.</p>
    </div>
    <a class="hero-proof rise" style="--d:6" href="${site.doylesUrl}" target="_blank" rel="noopener" aria-label="Doyle’s Guide recommended 2023 to 2026, opens the Doyle’s Guide listing">
      <p class="hero-proof-quote">A clear voice.<br><em>A strong defence.</em></p>
      ${doylesBadges('badges-row')}
      <span class="caps">Doyle’s Guide · 2023–2026</span>
    </a>
    <div class="hero-base">
      <span class="caps">Murwillumbah<span class="dash">—</span>Northern Rivers<span class="dash">—</span>South East Queensland</span>
      <a class="caps hero-scroll" href="#expertise">Scroll to explore${icon('arrow-down')}</a>
    </div>
  </div>
</section>
${credentials(ctx)}
<section class="section" id="expertise">
  <div class="container">
    <div class="section-head split-head">
      <div>
        ${eyebrow('Our expertise')}
        <h2 class="h2">${twoLine(['Focused expertise.', 'Personal commitment.'])}</h2>
      </div>
      <div class="section-aside">
        <p>Whatever you’re facing, understanding your situation is the first step. Find the support that’s right for your matter.</p>
        ${arrowLink('/expertise/', `All ${areas.length} practice areas`)}
      </div>
    </div>
    <div class="area-grid">${featured.map((a, i) => areaCard(a, num(i))).join('')}</div>
    <div class="grid-foot"><span>Not sure where to start? You don’t need to have all the answers.</span>${arrowLink('/contact/', 'Let’s talk', { cls: 'link-plain' })}</div>
  </div>
</section>
<section class="section section-tint profile">
  <div class="container profile-inner">
    <figure class="portrait">
      <span class="portrait-side caps" aria-hidden="true">Personal representation. Undivided commitment.</span>
      <div class="portrait-frame">
        <img src="/assets/images/adam-ashley.webp" alt="Adam Ashley, Principal Criminal Defence Lawyer" loading="lazy" decoding="async" width="900" height="1366">
        <figcaption class="portrait-cap"><span><span class="portrait-name">Adam Ashley</span><span class="caps">Principal Criminal Defence Lawyer</span></span>${icon('arrow-up-right')}</figcaption>
      </div>
    </figure>
    <div class="profile-copy">
      ${eyebrow('The person in your corner')}
      <h2 class="h2">${twoLine(['A strong advocate.', 'A human approach.'])}</h2>
      <p class="lead">Your matter is personal.<br>Your representation should be, too.</p>
      <p>Adam Ashley brings clear thinking, careful preparation and a direct, personal approach to criminal defence. He listens, explains your options and stays involved from the first conversation to the courtroom.</p>
      <ul class="ticks">
        <li>${icon('check')}Direct access to your principal lawyer</li>
        <li>${icon('check')}Admitted to the Supreme Courts of NSW and Queensland</li>
        <li>${icon('check')}Doyle’s Guide recommended, 2023–2026</li>
      </ul>
      ${arrowLink('/about/', 'Meet Adam Ashley')}
    </div>
  </div>
</section>
${reviews(ctx)}
${approachBand({ head: ['The Frontline approach', ['A clear path.', 'A committed partner.']], aside: 'A legal matter can be complex.<br>Working with your lawyer should feel clear.', foot: true })}
${ticker(ctx)}
<section class="section">
  <div class="container locations">
    <div class="locations-copy">
      ${eyebrow('Grounded here. Standing with you.')}
      <h2 class="h2">${twoLine(['Local knowledge.', 'Across two states.'])}</h2>
      <p>From our base in Murwillumbah, we represent clients in courts across Northern Rivers NSW and South East Queensland.</p>
      ${locationTabs(ctx)}
      ${arrowLink('/contact/', 'Discuss your court location')}
    </div>
    <figure class="locations-figure">
      ${picture('blue-road', 'An illustrative coastal road winding beside the blue ocean')}
      <figcaption class="caps">${icon('compass')}Northern Rivers NSW &amp; South East Queensland</figcaption>
    </figure>
  </div>
</section>
<section class="statement" data-parallax>
  <img class="statement-bg" src="/assets/images/blue-court.webp" alt="" loading="lazy" decoding="async">
  <div class="statement-shade" aria-hidden="true"></div>
  <div class="container statement-inner">
    ${eyebrow('What we believe', 'eyebrow-light')}
    <p class="statement-text">Everyone accused of a crime<br><em>deserves a strong defence.</em></p>
    <p class="statement-sub">Adam looks closely at the evidence, tests police procedure and prepares every matter carefully, from the first conversation to the courtroom.</p>
  </div>
</section>
<section class="section section-soft">
  <div class="container faq-split">
    <div>
      ${eyebrow('A little more clarity')}
      <h2 class="h2">${twoLine(['Questions are', 'a good place to start.'])}</h2>
      <p>Get to know what working with Frontline looks like, from the first call to your next step.</p>
      ${arrowLink('/questions/', 'Explore your questions')}
    </div>
    ${accordion(homeFaqs)}
  </div>
</section>
${closingCta(ctx)}`
  };
}

function approachBand({ head, aside, foot }) {
  return `
<section class="section section-navy">
  <div class="container">
    <div class="section-head split-head">
      <div>
        ${eyebrow(head[0], 'eyebrow-light')}
        <h2 class="h2">${twoLine(head[1])}</h2>
      </div>
      ${aside ? `<p class="section-aside light">${aside}</p>` : ''}
    </div>
    ${steps()}
    ${foot ? `<div class="grid-foot grid-foot-dark"><span>${icon('lock')}A private conversation. An informed next step.</span>${arrowLink('/approach/', 'How we work with you', { cls: 'link-plain' })}</div>` : ''}
  </div>
</section>`;
}

/* ---------------------------------------------------------------- Expertise index */
export function expertise(ctx) {
  const { site, areas } = ctx;
  return {
    path: '/expertise/',
    title: 'Our expertise | Frontline Lawyers',
    description: 'Criminal defence is what we do. Explore Frontline Lawyers’ 16 practice areas across Northern Rivers NSW and South East Queensland.',
    bodyClass: 'page-expertise',
    body: `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([['Home', '/'], ['Our expertise', '']])}
    ${eyebrow('Our expertise')}
    <div class="page-hero-split">
      <h1 class="display display-dark">${twoLine(['One focus.', 'Your defence.'])}</h1>
      <p class="page-hero-aside">Criminal defence is what we do. Explore the firm’s ${areas.length} practice areas and find a clear starting point for your matter.</p>
    </div>
    <div class="filter-bar" data-filter-group="areas">
      <div class="filters" role="group" aria-label="Filter practice areas">
        <button type="button" class="filter" aria-pressed="true" data-filter="all">All areas</button>
        ${site.categories.map(([k, l]) => `<button type="button" class="filter" aria-pressed="false" data-filter="${k}">${esc(l)}</button>`).join('')}
      </div>
      <p class="filter-count" role="status" data-count data-singular="practice area" data-plural="practice areas">${areas.length} practice areas</p>
    </div>
  </div>
</section>
<section class="section section-tight">
  <div class="container">
    <div class="area-grid" data-filter-items="areas">${areas.map((a, i) => areaCard(a, num(i))).join('')}</div>
    <p class="grid-note">Not sure which area applies? ${arrowLink('/contact/', 'Speak with Adam', { cls: 'link-plain' })}</p>
  </div>
</section>
${closingCta(ctx)}`
  };
}

/* ---------------------------------------------------------------- Practice area */
export function area(ctx, a) {
  const { site, areas } = ctx;
  const img = IMG[a.image];
  const related = a.related.map((s) => areas.find((x) => x.slug === s));
  const enquire = `/contact/?matter=${a.slug}`;
  return {
    path: `/expertise/${a.slug}/`,
    title: `${a.name} | Frontline Lawyers`,
    description: a.summary,
    image: `/assets/images/${img}.webp`,
    bodyClass: 'page-area',
    body: `
<section class="page-hero area-hero">
  <div class="container">
    ${breadcrumb([['Home', '/'], ['Our expertise', '/expertise/'], [a.name, '']])}
    <div class="area-hero-grid">
      <div>
        ${eyebrow(a.name)}
        <h1 class="display display-dark display-md">${twoLine(a.headline)}</h1>
        <p class="hero-lead dark">${esc(a.summary)}</p>
        <div class="btn-row">
          ${btn(enquire, 'Discuss your matter')}
          <a class="phone-link" href="${site.phoneHref}">${icon('phone')}${esc(site.phone)}</a>
        </div>
        <p class="hero-note dark">${icon('shield-check')}Personal representation across NSW &amp; Queensland</p>
      </div>
      <figure class="area-figure">
        ${picture(img, a.imageAlt, { eager: true })}
        <span class="area-figure-ico">${icon(a.icon)}</span>
        <figcaption class="caps">Frontline / ${esc(a.title)}</figcaption>
      </figure>
    </div>
  </div>
</section>
<nav class="onpage" aria-label="On this page">
  <div class="container onpage-inner">
    <span class="caps">In this section</span>
    <a href="#overview">Overview</a><a href="#support">How we can help</a><a href="#law">The law</a><a href="#prepare">Before we speak</a><a href="#faqs">Your questions</a>
    ${arrowLink(enquire, 'Let’s talk', { cls: 'link-blue onpage-cta', arrow: 'arrow-up-right' })}
  </div>
</nav>
<section class="section">
  <div class="container area-body">
    <div class="area-main">
      <article id="overview" class="area-overview">
        ${eyebrow('Your situation, understood', 'eyebrow-lg')}
        <h2 class="h2">${twoLine(a.overviewTitle, false)}</h2>
        <p class="lead">${esc(a.overview[0])}</p>
        <p>${esc(a.overview[1])}</p>
        <aside class="timing">
          <span class="timing-ico">${icon('clock')}</span>
          <div><p class="caps">Why timing matters</p><p>${esc(a.timing)}</p></div>
        </aside>
      </article>
      <article id="support" class="area-help">
        <h3 class="h3">How we can help</h3>
        <ul class="ticks ticks-2">${a.help.map((h) => `<li>${icon('check')}${esc(h)}</li>`).join('')}</ul>
      </article>
      <article id="law" class="area-law">
        ${eyebrow('The law, briefly')}
        <p class="law-text">${esc(a.law)}</p>
        <p class="small">General information only, not legal advice. The law that applies depends on your circumstances and the state involved.</p>
      </article>
      <article id="prepare" class="checklist" data-checklist="${a.slug}">
        <div class="checklist-head">
          <div>
            ${eyebrow('Before we speak')}
            <h3 class="h3">A useful starting point.</h3>
          </div>
          ${icon('doc', 'checklist-ico')}
        </div>
        <p>You don’t need everything before you call. Use this checklist to organise what you already have.</p>
        <ul class="checklist-items">${a.checklist.map((c, i) => `<li><label><input type="checkbox" name="item-${i}"><span class="box" aria-hidden="true">${icon('check')}</span><span>${esc(c)}</span></label></li>`).join('')}</ul>
        <div class="checklist-foot">
          <span role="status" data-checklist-status>0 of ${a.checklist.length} items ready</span>
          <span class="checklist-actions"><a href="/checklists/${a.slug}.txt" download>${icon('download')}Save checklist</a><button type="button" data-checklist-reset>Reset</button></span>
        </div>
        <p class="small">Ticks stay on this page only. Please discuss how to share documents directly with Adam.</p>
      </article>
      <article id="faqs" class="area-faqs">
        <h2 class="h2">${twoLine(['Your questions,', 'considered.'])}</h2>
        ${accordion(a.faqs)}
        ${(() => { const t = site.areaGuide[a.slug]; const l = (site.guideCategories.find(([k]) => k === t) || [])[1]; return t ? `<p class="guide-link">${arrowLink(`/questions/?topic=${t}`, `More on ${l.charAt(0).toLowerCase() + l.slice(1)} in our legal guide`)}</p>` : ''; })()}
      </article>
    </div>
    <aside class="lawyer-card">
      <p class="caps">Your lawyer, from day one</p>
      <div class="lawyer-id">
        <img src="/assets/images/adam-ashley-thumb.webp" alt="Adam Ashley" width="120" height="182" loading="lazy">
        <div><h3>Adam Ashley</h3><p>${esc(site.lawyer.title)}</p></div>
      </div>
      <p>Start with a direct conversation about your situation and what comes next.</p>
      <a class="lawyer-phone" href="${site.phoneHref}">${icon('phone')}${esc(site.phone)}</a>
      ${btn(enquire, 'Make an enquiry', 'btn btn-primary btn-block')}
      <a class="lawyer-doyles" href="${site.doylesUrl}" target="_blank" rel="noopener">${doylesBadges('badges-row badges-sm')}<span>Doyle’s Guide<span class="caps">Recommended 2023–2026</span></span></a>
      <p class="small">Have an urgent court or police matter? Please call directly.</p>
    </aside>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
    <div class="section-head split-head split-head-end">
      <div>
        ${eyebrow('Explore further')}
        <h2 class="h2">Related practice areas.</h2>
      </div>
      ${arrowLink('/expertise/', 'All expertise')}
    </div>
    <div class="area-grid">${related.map((r) => areaCard(r, catLabel(site, r.category))).join('')}</div>
  </div>
</section>
${closingCta(ctx, a.slug)}`
  };
}

/* ---------------------------------------------------------------- About */
export function about(ctx) {
  const { site } = ctx;
  return {
    path: '/about/',
    title: 'Meet Adam Ashley | Frontline Lawyers',
    description: 'Meet the principal criminal defence lawyer behind Frontline Lawyers. Personal involvement and straightforward communication.',
    image: '/assets/images/blue-room.webp',
    bodyClass: 'page-about',
    body: `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([['Home', '/'], ['Our firm', '']])}
    <div class="about-hero">
      <div>
        ${eyebrow('Meet Adam Ashley')}
        <h1 class="display display-dark display-md">${twoLine(['Strong in your defence.', 'Personal in his approach.'])}</h1>
        <p class="lead-lg">A direct line to the person who’s in your corner.</p>
        <p>Adam Ashley is Frontline Lawyers’ Principal Criminal Defence Lawyer. Based in Murwillumbah, he represents clients across Northern Rivers NSW and South East Queensland.</p>
        <div class="btn-row">${btn('/contact/', 'Speak with Adam')}</div>
        <p class="hero-note dark">${icon('shield-check')}${esc(site.admission)}</p>
      </div>
      <figure class="about-portrait">
        <img src="/assets/images/adam-ashley.webp" alt="Adam Ashley, Principal Criminal Defence Lawyer" width="900" height="1366" fetchpriority="high">
        <figcaption><h2>Adam Ashley</h2><span class="caps">Principal Criminal Defence Lawyer</span></figcaption>
      </figure>
    </div>
  </div>
</section>
${credentials(ctx)}
<section class="section">
  <div class="container split-cols">
    <div>
      ${eyebrow('The Frontline difference')}
      <h2 class="h2">${esc('Your circumstances.')}<br>${esc('Your concerns.')}<br><em>Your lawyer.</em></h2>
    </div>
    <div class="prose">
      <p class="lead">You deserve a lawyer who listens carefully, explains things clearly and remains personally involved.</p>
      <p>Adam’s practice centres on criminal defence. He handles your matter personally and takes the time to understand what matters to you, with clear communication as the proposed strategy develops.</p>
      <p>Admitted in NSW and Queensland, Adam works with experienced criminal defence barristers—including senior counsel—where the proceedings call for it.</p>
      <p>He is recommended in Doyle’s Guide’s Regional NSW criminal lawyer rankings for 2023, 2024, 2025 and 2026.</p>
      ${doylesBadges('badges-row badges-lg', true)}
      ${arrowLink(site.doylesUrl, 'View the independent ranking record', { arrow: 'arrow-up-right', ext: true })}
    </div>
  </div>
  <div class="container value-cards">
    ${[
      ['user', 'Personal involvement', 'A direct relationship with the lawyer handling your matter, from the first discussion through to representation.'],
      ['chat', 'Clear communication', 'Understand the proposed next steps, ask questions and make informed decisions about your situation.'],
      ['scale', 'Considered advocacy', 'Careful preparation, attention to the evidence and collaboration with experienced barristers where appropriate.'],
      ['messages', 'Word of mouth', 'Most clients come to Frontline by referral, from people who were once in a similar position.']
    ].map(([ic, t, p]) => `<article class="value-card">${icon(ic, 'value-ico')}<h3 class="h3">${esc(t)}</h3><p>${esc(p)}</p></article>`).join('')}
  </div>
</section>
<section class="section section-soft">
  <div class="container locations locations-rev">
    <figure class="locations-figure">
      ${picture('blue-room', 'An illustrative consultation room with blue chairs and a notebook')}
      <figcaption class="caps">Space for a clear conversation · Illustrative setting</figcaption>
    </figure>
    <div class="locations-copy">
      ${eyebrow('Local knowledge. Wider reach.')}
      <h2 class="h2">${twoLine(['Grounded in the region.', 'Across two states.'])}</h2>
      <p>Frontline represents clients throughout Northern Rivers NSW and South East Queensland. Confirm your particular court and the firm’s availability with Adam.</p>
      ${locationTabs(ctx)}
    </div>
  </div>
</section>
${closingCta(ctx)}`
  };
}

/* ---------------------------------------------------------------- Approach */
export function approach(ctx) {
  const { site } = ctx;
  const faqs = [
    ctx.questions.find((q) => q.q === 'What should I bring to an initial conference?'),
    ctx.questions.find((q) => q.q === 'Can we meet by phone or video?'),
    site.costsFaq,
    ctx.questions.find((q) => q.q === 'Does sending an enquiry engage the firm?')
  ];
  const expect = [
    ['A direct point of contact', 'Speak with Adam, the principal lawyer handling your matter. Bring your questions and explain what matters to you.'],
    ['An informed decision', 'Discuss the proposed scope, costs and payment arrangements before engaging the firm. The work needed will depend on your circumstances.'],
    ['A considered strategy', 'Adam reviews the information available and discusses the proposed preparation and representation, working with barristers where appropriate.'],
    ['Communication along the way', 'Understand the next stage, the information required from you and the questions you may want to discuss as your matter progresses.']
  ];
  return {
    path: '/approach/',
    title: 'Our approach | Frontline Lawyers',
    description: 'A personal approach to a serious situation. What working with Frontline Lawyers looks like, from your first conversation to your next stage.',
    image: '/assets/images/blue-room.webp',
    bodyClass: 'page-approach',
    body: `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([['Home', '/'], ['Our approach', '']])}
    <div class="area-hero-grid">
      <div>
        ${eyebrow('How we work')}
        <h1 class="display display-dark display-md">${twoLine(['Clarity from the start.', 'Commitment throughout.'])}</h1>
        <p class="hero-lead dark">A personal approach to a serious situation. Understand what working with Frontline can look like, from your first conversation to your next stage.</p>
        <div class="btn-row">${btn('/contact/', 'Start a conversation')}</div>
      </div>
      <figure class="area-figure">
        ${picture('blue-room', 'A calm, contemporary consultation room', { eager: true })}
        <figcaption class="caps chip">Clarity. Courage. Conviction.</figcaption>
      </figure>
    </div>
  </div>
</section>
${approachBand({ head: ['A clear path forward', ['You don’t need all the answers.', 'Start with the conversation.']] })}
<section class="section section-soft">
  <div class="container split-cols">
    <div>
      ${eyebrow('What you can expect')}
      <h2 class="h2">${twoLine(['Personal attention.', 'Practical clarity.'])}</h2>
    </div>
    <ol class="expect">${expect.map(([t, p], i) => `<li><span class="expect-num">${num(i)}</span><div><h3 class="h3">${esc(t)}</h3><p>${esc(p)}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="section">
  <div class="container faq-split">
    <div>
      ${eyebrow('Before we speak')}
      <h2 class="h2">${twoLine(['A few things', 'worth knowing.'])}</h2>
      <p>Your first enquiry is a starting point. Adam will discuss availability and the arrangements for a conference.</p>
    </div>
    ${accordion(faqs)}
  </div>
</section>
${closingCta(ctx)}`
  };
}

/* ---------------------------------------------------------------- Questions */
export function questions(ctx) {
  const { site } = ctx;
  const guideLabel = (k) => (site.guideCategories.find(([c]) => c === k) || [k, k])[1];
  const items = [
    ...ctx.questions,
    ...ctx.guide.map((g) => ({ ...g, tag: `Legal guide · ${guideLabel(g.category)}` }))
  ];
  return {
    path: '/questions/',
    title: 'Your questions | Frontline Lawyers',
    description: 'Questions about working with Adam Ashley, plus a plain-English guide to police powers, bail, drink driving, AVOs, drug charges and the court process.',
    bodyClass: 'page-questions',
    body: `
<section class="page-hero">
  <div class="container">
    ${breadcrumb([['Home', '/'], ['Your questions', '']])}
    ${eyebrow('A little more clarity')}
    <div class="page-hero-split">
      <h1 class="display display-dark">${twoLine(['A good place', 'to start.'])}</h1>
      <p class="page-hero-aside">Questions about the first call and working with Adam, plus a plain-English legal guide to police powers, bail, driving, AVOs and the court process.</p>
    </div>
    <div class="filter-bar filter-bar-q" data-filter-group="questions">
      <label class="search">${icon('search')}<span class="sr-only">Search questions</span><input type="search" placeholder="Search ${items.length} questions…" data-search autocomplete="off"></label>
      <div class="filters-grouped" role="group" aria-label="Question topics">
        <div class="filter-row"><span class="filter-label">Working with us</span><div class="filters">
          <button type="button" class="filter" aria-pressed="true" data-filter="all">All questions</button>
          ${site.questionCategories.map(([k, l]) => `<button type="button" class="filter" aria-pressed="false" data-filter="${k}">${esc(l)}</button>`).join('')}
        </div></div>
        <div class="filter-row"><span class="filter-label">Legal guide</span><div class="filters">
          ${site.guideCategories.map(([k, l]) => `<button type="button" class="filter" aria-pressed="false" data-filter="${k}">${esc(l)}</button>`).join('')}
        </div></div>
      </div>
    </div>
  </div>
</section>
<section class="section section-tight">
  <div class="container q-layout">
    <aside class="q-aside">
      <p>Can’t find your question?</p>
      <h2 class="h2-sm">Let’s talk.</h2>
      <a class="q-phone" href="${site.phoneHref}">${esc(site.phone)}${icon('arrow-up-right')}</a>
      ${arrowLink('/contact/', 'Make an enquiry')}
      <p class="small q-note">The legal guide is general information about criminal law, mostly in NSW. It isn’t legal advice, and the law changes, so please speak with Adam about your situation.</p>
    </aside>
    <div>
      <p class="filter-count" role="status" data-count data-singular="question" data-plural="questions">${items.length} questions</p>
      <div data-filter-items="questions">${accordion(items)}</div>
      <p class="q-empty" data-empty hidden>No questions match your search. Try another word, or call Adam directly.</p>
    </div>
  </div>
</section>
${closingCta(ctx)}`
  };
}

/* ---------------------------------------------------------------- Contact */
export function contact(ctx) {
  const { site, areas } = ctx;
  return {
    path: '/contact/',
    title: 'Start a conversation | Frontline Lawyers',
    description: 'Speak directly with criminal defence lawyer Adam Ashley. Call 0421 066 608 or send a brief enquiry.',
    bodyClass: 'page-contact',
    body: `
<section class="contact-hero">
  <div class="contact-left">
    <div class="contact-pad">
      ${breadcrumb([['Home', '/'], ['Contact', '']])}
      ${eyebrow('Your next step')}
      <h1 class="display display-dark display-md">${twoLine(['Let’s find', 'your way forward.'])}</h1>
      <p class="lead-lg">Start with a conversation.<br>Speak directly with Adam about your matter.</p>
      <a class="contact-phone" href="${site.phoneHref}">${esc(site.phone)}${icon('arrow-up-right')}</a>
      <a class="contact-email" href="mailto:${site.email}">${esc(site.email)}${icon('arrow-up-right')}</a>
      <p class="contact-row">${icon('map-pin')}<span>${esc(site.postal.join(', '))}<small>Mailing address · conferences by arrangement</small></span></p>
      <p class="contact-row contact-urgent">${icon('phone')}<span><strong>Have an urgent court or police matter?</strong><small>Please call directly and explain the timing.</small></span></p>
      <div class="contact-lawyer"><img src="/assets/images/adam-ashley-thumb.webp" alt="Adam Ashley" width="120" height="182" loading="lazy"><span><strong>Adam Ashley</strong>${esc(site.lawyer.title)}</span></div>
    </div>
  </div>
  <div class="contact-right">
    <div class="contact-pad">
      ${eyebrow('A private first step')}
      <h2 class="h2">${twoLine(['Tell us how', 'we can help.'])}</h2>
      <p>Send a brief enquiry and Adam will be in touch.</p>
      <form class="enquiry" name="contact" method="POST" action="/contact/thanks/" data-netlify="true" netlify-honeypot="bot-field" data-enquiry>
        <input type="hidden" name="form-name" value="contact">
        <p class="hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="field-row">
          <label class="field"><span>Your name <i>*</i></span><input type="text" name="name" placeholder="Full name" autocomplete="name" required></label>
          <label class="field"><span>Email address <i>*</i></span><input type="email" name="email" placeholder="you@example.com" autocomplete="email" required></label>
        </div>
        <div class="field-row">
          <label class="field"><span>Phone number</span><input type="tel" name="phone" placeholder="Best contact number" autocomplete="tel"></label>
          <label class="field"><span>Your matter</span>
            <select name="matter" data-matter>
              <option value="">Please select</option>
              ${areas.map((a) => `<option value="${esc(a.name)}" data-slug="${a.slug}">${esc(a.name)}</option>`).join('')}
              <option value="Another criminal matter">Another criminal matter</option>
            </select>
          </label>
        </div>
        <div class="field-row">
          <label class="field"><span>Next court date</span><input type="text" name="courtDate" placeholder="If you have one"></label>
          <label class="field"><span>Court location</span><input type="text" name="courtLocation" placeholder="e.g. Tweed Heads"></label>
        </div>
        <label class="field"><span>A little about your matter <i>*</i></span><textarea name="details" rows="4" placeholder="Briefly describe your enquiry." required></textarea></label>
        <p class="form-note">${icon('lock')}Please keep this brief and leave out sensitive documents or detailed evidence. Adam will explain how to share those safely.</p>
        <button class="btn btn-primary btn-block" type="submit">Send my enquiry${icon('arrow-right')}</button>
        <p class="small">* Required. An enquiry does not establish a lawyer–client relationship.</p>
        <p class="form-error" role="alert" hidden>Sorry, your enquiry couldn’t be sent. Please call ${esc(site.phone)} or email ${esc(site.email)}.</p>
      </form>
      <div class="form-success" role="status" tabindex="-1" hidden>
        ${icon('check', 'success-ico')}
        <h3 class="h3">Thank you. Your enquiry has been sent.</h3>
        <p>Adam will be in touch as soon as he can. If your matter is urgent, please call <a href="${site.phoneHref}">${esc(site.phone)}</a>.</p>
      </div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split-cols">
    <div>
      ${eyebrow('Where we work')}
      <h2 class="h2">${twoLine(['Across the region.', 'By your side.'])}</h2>
      <p>Based in Murwillumbah, representing clients across Northern Rivers NSW and South East Queensland.</p>
    </div>
    <div>
      ${locationTabs(ctx)}
      <p class="small">Contact Adam to confirm your particular court and availability.</p>
    </div>
  </div>
</section>`
  };
}

export function thanks(ctx) {
  const { site } = ctx;
  return {
    path: '/contact/thanks/',
    title: 'Enquiry sent | Frontline Lawyers',
    description: 'Thank you for contacting Frontline Lawyers.',
    noindex: true,
    bodyClass: 'page-simple',
    body: `
<section class="page-hero page-hero-full">
  <div class="container narrow">
    ${eyebrow('Enquiry sent')}
    <h1 class="display display-dark display-md">${twoLine(['Thank you.', 'We’ll be in touch.'])}</h1>
    <p class="hero-lead dark">Adam will respond as soon as he can. If your matter is urgent, please call <a href="${site.phoneHref}">${esc(site.phone)}</a>.</p>
    <div class="btn-row">${btn('/', 'Back to home', 'btn btn-primary', 'arrow-right')}${arrowLink('/expertise/', 'Explore our expertise')}</div>
  </div>
</section>`
  };
}

/* ---------------------------------------------------------------- Simple pages */
function simplePage({ path, crumb, title, h1, description, sections }) {
  return {
    path, title, description, bodyClass: 'page-simple',
    body: `
<section class="page-hero">
  <div class="container narrow">
    ${breadcrumb([['Home', '/'], [crumb, '']])}
    ${eyebrow('Frontline Lawyers')}
    <h1 class="display display-dark display-md">${esc(h1)}</h1>
  </div>
</section>
<section class="section section-tight">
  <div class="container narrow prose legal">${sections}</div>
</section>`
  };
}

export function privacy(ctx) {
  const { site } = ctx;
  return simplePage({
    path: '/privacy/', crumb: 'Your privacy', h1: 'Your privacy.', title: 'Your privacy | Frontline Lawyers',
    description: 'How the Frontline Lawyers website handles your enquiry and information.',
    sections: `
<h2>Your enquiry.</h2>
<p>When you send an enquiry through this website, the details you enter are delivered to Frontline Lawyers through the website’s hosting provider so that Adam can respond to you. Please keep initial enquiries brief and leave out sensitive documents or detailed evidence.</p>
<p>Your enquiry is used only to respond to you and to consider whether the firm can assist with your matter.</p>
<h2>Using this website.</h2>
<p>Preparation checklists and filters operate locally on the current page. This website does not use analytics or advertising cookies, and its fonts are served from this website. The hosting provider and external websites you visit may process technical connection information under their own policies.</p>
<h2>Contact.</h2>
<p>For privacy questions relating to the firm, contact <a href="mailto:${site.email}">${esc(site.email)}</a>.</p>`
  });
}

export function legal(ctx) {
  const { site } = ctx;
  return simplePage({
    path: '/legal/', crumb: 'Legal information', h1: 'Legal information.', title: 'Legal information | Frontline Lawyers',
    description: 'General information, disclaimers and professional standards information for Frontline Lawyers.',
    sections: `
<h2>General information.</h2>
<p>The content of this website is general service information, not legal advice. It cannot assess your circumstances or determine the outcome of a matter. Seek advice about your own situation.</p>
<p>Using this website or sending an enquiry does not establish a lawyer–client relationship. The firm must confirm an engagement, availability and proposed costs separately. No outcome is promised.</p>
<h2>About this website.</h2>
<p>Landscape, courthouse and consultation imagery is illustrative and does not depict the firm’s actual premises or a specific court or location.</p>
<p>Doyle’s Guide recognition relates to Adam Ashley’s recommended listing in Regional NSW criminal lawyer rankings for 2023–2026. <a href="${site.doylesUrl}" target="_blank" rel="noopener">View the independent record</a>.</p>
<p>Liability limited by a scheme approved under Professional Standards Legislation.</p>`
  });
}

export function notFound() {
  return {
    path: '/404.html',
    file: '404.html',
    title: 'Page not found | Frontline Lawyers',
    description: 'The page you’re looking for may have moved.',
    noindex: true,
    bodyClass: 'page-simple',
    body: `
<section class="page-hero page-hero-full">
  <div class="container narrow">
    ${eyebrow('Page not found')}
    <h1 class="display display-dark display-md">${twoLine(['Let’s get you', 'back on track.'])}</h1>
    <p class="hero-lead dark">The page you’re looking for may have moved.</p>
    <div class="btn-row">${btn('/', 'Back to home', 'btn btn-primary', 'arrow-right')}${arrowLink('/expertise/', 'Find your practice area')}</div>
  </div>
</section>`
  };
}
