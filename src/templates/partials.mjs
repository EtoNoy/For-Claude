import { icon, wordmark } from './icons.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Two-line headline: first line upright, second line italic.
export const twoLine = ([a, b], italic = true) =>
  `${esc(a)}<br>${italic ? `<em>${esc(b)}</em>` : esc(b)}`;

export const eyebrow = (text, cls = '') => `<p class="eyebrow${cls ? ' ' + cls : ''}">${esc(text)}</p>`;

export const arrowLink = (href, text, { cls = 'link-arrow', arrow = 'arrow-right', ext = false } = {}) =>
  `<a class="${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(text)}${icon(arrow)}</a>`;

export const btn = (href, text, cls = 'btn btn-primary', arrow = 'arrow-up-right') =>
  `<a class="${cls}" href="${href}">${esc(text)}${icon(arrow)}</a>`;

const areaUrl = (slug) => `/expertise/${slug}/`;

export function logo(site, cls = '') {
  return `<a class="logo${cls ? ' ' + cls : ''}" href="/" aria-label="${esc(site.name)} home">${wordmark()}</a>`;
}

const YEARS = ['2023', '2024', '2025', '2026'];
export function doylesBadges(cls = '', withYears = false) {
  return `<span class="badges${cls ? ' ' + cls : ''}">${YEARS.map((y) => `<span class="badge"><img src="/assets/images/doyles-${y}.webp" alt="Doyle’s Guide recommended ${y}" width="169" height="160" loading="lazy" decoding="async">${withYears ? `<span class="badge-year">${y}</span>` : ''}</span>`).join('')}</span>`;
}

export function ticker(ctx) {
  const { site } = ctx;
  const places = [...site.locations.nsw.places, ...site.locations.qld.places];
  const row = places.map((p) => `<li>${esc(p)}</li>`).join('');
  return `
<section class="ticker" aria-label="Where we represent clients">
  <p class="sr-only">Representing clients in ${esc(places.join(', '))}.</p>
  <div class="ticker-track" aria-hidden="true"><ul>${row}</ul><ul>${row}</ul></div>
</section>`;
}

export function reviews(ctx) {
  const { site } = ctx;
  if (!site.showReviews) return '';
  const stars = `<span class="stars" aria-label="5 out of 5">${'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z"/></svg>'.repeat(5)}</span>`;
  return `
<section class="section reviews" data-reviews>
  <div class="container">
    <div class="section-head split-head split-head-end">
      <div>
        ${eyebrow('In their words')}
        <h2 class="h2">What clients say.</h2>
      </div>
      <div class="reviews-nav">
        <button type="button" class="round-btn" data-reviews-prev aria-label="Previous review">${icon('arrow-right', 'flip')}</button>
        <button type="button" class="round-btn" data-reviews-next aria-label="Next review">${icon('arrow-right')}</button>
      </div>
    </div>
    <ul class="reviews-track" data-reviews-track>
      ${site.reviews.map((r) => `<li class="review"><figure>${stars}<blockquote><p>${esc(r)}</p></blockquote><figcaption class="caps">Client review · shared anonymously</figcaption></figure></li>`).join('')}
    </ul>
  </div>
</section>`;
}

export function header(ctx) {
  const { site, areas, path } = ctx;
  const cur = (p) => (path === p || (p !== '/' && path.startsWith(p)) ? ' aria-current="page"' : '');
  const inExpertise = path.startsWith('/expertise/');
  const featured = site.featured.map((s) => areas.find((a) => a.slug === s));
  const [r1, r2] = site.region.split(' / ');
  const overlay = path === '/';
  return `
<a class="skip-link" href="#main">Skip to content</a>
<div class="topbar">
  <div class="container topbar-inner">
    <span class="topbar-region">${esc(r1)}<span class="sep">/</span>${esc(r2)}</span>
    <a class="topbar-call" href="${site.phoneHref}">Arrested or facing court? <strong>${esc(site.phone)}</strong>${icon('arrow-up-right')}</a>
  </div>
</div>
<header class="site-header${overlay ? ' is-overlay' : ''}" data-header>
  <div class="container header-inner">
    ${logo(site)}
    <nav class="main-nav" aria-label="Main navigation">
      <div class="nav-drop" data-dropdown>
        <button class="nav-link nav-drop-btn${inExpertise ? ' is-current' : ''}" type="button" aria-expanded="false" aria-controls="mega-menu">Our expertise${icon('chevron-down')}</button>
        <div class="mega" id="mega-menu" hidden>
          <div class="mega-intro">
            ${eyebrow('Our expertise')}
            <h2 class="mega-title">${twoLine(['Criminal defence.', 'Only.'])}</h2>
            ${arrowLink('/expertise/', 'Explore all practice areas')}
          </div>
          <ul class="mega-list">
            ${featured.map((a) => `<li><a href="${areaUrl(a.slug)}">${icon(a.icon, 'mega-ico')}<span>${esc(a.title)}</span>${icon('arrow-up-right', 'mega-arrow')}</a></li>`).join('')}
          </ul>
        </div>
      </div>
      <a class="nav-link" href="/about/"${cur('/about/')}>Our firm</a>
      <a class="nav-link" href="/approach/"${cur('/approach/')}>Our approach</a>
      <a class="nav-link" href="/questions/"${cur('/questions/')}>Your questions</a>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="${site.phoneHref}">${icon('phone')}${esc(site.phone)}</a>
      ${btn('/contact/', 'Let’s talk', 'btn btn-primary btn-header')}
    </div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation" data-menu-toggle>${icon('menu', 'ico-menu')}${icon('x', 'ico-close')}</button>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
    <div class="container">
      ${[['/expertise/', 'Our expertise'], ['/about/', 'Our firm'], ['/approach/', 'Our approach'], ['/questions/', 'Your questions'], ['/contact/', 'Let’s talk']]
        .map(([h, t]) => `<a href="${h}">${esc(t)}${icon('arrow-up-right')}</a>`).join('')}
      <a class="mobile-phone" href="${site.phoneHref}">${icon('phone')}${esc(site.phone)}</a>
    </div>
  </nav>
</header>`;
}

export function footer(ctx) {
  const { site } = ctx;
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        ${logo(site, 'logo-light')}
        <p class="footer-tagline">Criminal defence in Murwillumbah.<br><em>Northern Rivers and South East Queensland.</em></p>
      </div>
      <div class="footer-col">
        <h3>Our expertise</h3>
        ${site.footerExpertise.map(([t, s]) => `<a href="${areaUrl(s)}">${esc(t)}</a>`).join('')}
        <a href="/expertise/">All practice areas${icon('arrow-up-right')}</a>
      </div>
      <div class="footer-col">
        <h3>Frontline</h3>
        <a href="/about/">Meet Adam Ashley</a>
        <a href="/approach/">Our approach</a>
        <a href="/questions/">Your questions</a>
        <a href="/contact/">Contact us</a>
      </div>
      <div class="footer-col footer-contact">
        <h3>Start a conversation</h3>
        <a class="footer-phone" href="${site.phoneHref}">${esc(site.phone)}${icon('arrow-up-right')}</a>
        <a href="mailto:${site.email}">${esc(site.email)}</a>
        <p>${site.postal.map(esc).join('<br>')}</p>
      </div>
    </div>
    <div class="footer-base">
      <span>© ${new Date().getFullYear()} ${esc(site.name)}.</span>
      <span class="footer-legal"><a href="/privacy/">Privacy</a><a href="/legal/">Legal information</a></span>
    </div>
    <p class="footer-disclaimer">${esc(site.disclaimer)}</p>
    <div class="footer-mark" aria-hidden="true">${wordmark('', true)}</div>
  </div>
</footer>
<a class="mobile-call" href="${site.phoneHref}">${icon('phone')}<span>Speak directly with Adam</span><strong>${esc(site.phone)}</strong>${icon('arrow-up-right')}</a>`;
}

export function closingCta(ctx, matter = '') {
  const { site } = ctx;
  const href = matter ? `/contact/?matter=${matter}` : '/contact/';
  return `
<section class="cta-band">
  <div class="cta-rings" aria-hidden="true"></div>
  <div class="container cta-inner">
    <div>
      ${eyebrow('Your next step', 'eyebrow-light')}
      <h2 class="h2">${twoLine(['Talk to Adam.', 'Start with one call.'])}</h2>
    </div>
    <div class="cta-actions">
      ${btn(href, 'Speak with Adam', 'btn btn-white')}
      <a class="cta-call" href="${site.phoneHref}">Or call <strong>${esc(site.phone)}</strong></a>
    </div>
  </div>
</section>`;
}

export function credentials(ctx) {
  const { site } = ctx;
  return `
<section class="creds" aria-label="Our credentials">
  <div class="container creds-inner">
    <a class="cred cred-doyles" href="${site.doylesUrl}" target="_blank" rel="noopener">${doylesBadges('badges-stack')}<span><span class="cred-doyles-name">Doyle’s Guide</span><span class="cred-sub caps">Recommended 2023–2026</span></span></a>
    <div class="cred">${icon('shield-check', 'cred-ico')}<span><span class="cred-title">Criminal defence</span><span class="cred-sub">A focused practice</span></span></div>
    <div class="cred">${icon('compass', 'cred-ico')}<span><span class="cred-title">NSW &amp; Queensland</span><span class="cred-sub">Local knowledge. Wider reach.</span></span></div>
    <div class="cred">${icon('user', 'cred-ico')}<span><span class="cred-title">Personal representation</span><span class="cred-sub">Your lawyer, from day one</span></span></div>
  </div>
</section>`;
}

export function areaCard(a, label, h = 'h3') {
  return `
<a class="area-card" href="${areaUrl(a.slug)}" data-category="${a.category}">
  <span class="area-card-top">${icon(a.icon, 'area-ico')}<span class="area-tag">${esc(label)}</span></span>
  <${h} class="area-title">${esc(a.title)}</${h}>
  <p>${esc(a.summary)}</p>
  <span class="area-more">Explore this area${icon('arrow-up-right')}</span>
</a>`;
}

let accId = 0;
export function accordion(items, { cls = '' } = {}) {
  return `<div class="accordion${cls ? ' ' + cls : ''}">${items
    .map((it) => {
      const id = `acc-${++accId}`;
      const attrs = it.category ? ` data-category="${it.category}"` : '';
      return `
  <div class="acc-item"${attrs}>
    <h3 class="acc-h"><button type="button" class="acc-btn" aria-expanded="false" aria-controls="${id}"><span>${it.tag ? `<span class="acc-tag">${esc(it.tag)}</span>` : ''}${esc(it.q)}</span>${icon('plus')}</button></h3>
    <div class="acc-panel" id="${id}" role="region" hidden><p>${esc(it.a)}</p></div>
  </div>`;
    })
    .join('')}</div>`;
}

let tabsId = 0;
export function locationTabs(ctx) {
  const { site } = ctx;
  const n = ++tabsId;
  const keys = Object.keys(site.locations);
  return `
<div class="loc-tabs" data-tabs>
  <div class="tablist" role="tablist" aria-label="Areas we serve">
    ${keys.map((k, i) => `<button type="button" role="tab" id="tab-${n}-${k}" aria-controls="panel-${n}-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(site.locations[k].label)}</button>`).join('')}
  </div>
  ${keys.map((k, i) => `
  <div class="tabpanel" role="tabpanel" id="panel-${n}-${k}" aria-labelledby="tab-${n}-${k}"${i === 0 ? '' : ' hidden'}>
    <ul class="loc-list">${site.locations[k].places.map((p) => `<li>${icon('map-pin')}${esc(p)}</li>`).join('')}</ul>
  </div>`).join('')}
</div>`;
}

export function steps() {
  const s = [
    ['chat', 'First, we listen.', 'Tell us what’s happened and what matters to you. We take the time to understand the full picture.'],
    ['doc', 'Then, we make a plan.', 'Understand your options, the proposed work and the costs. Make informed decisions with clear advice.'],
    ['shield-check', 'We stand beside you.', 'From preparation to representation, Adam stays involved and keeps you informed as your matter progresses.']
  ];
  return `<div class="steps">${s
    .map(([ic, t, p], i) => `
  <article class="step">
    <span class="step-num">0${i + 1}</span>
    ${icon(ic, 'step-ico')}
    <h3>${esc(t)}</h3>
    <p>${esc(p)}</p>
  </article>`)
    .join('')}</div>`;
}

export function breadcrumb(items) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${items
    .map(([t, h], i) => (i < items.length - 1 ? `<li><a href="${h}">${esc(t)}</a></li>` : `<li aria-current="page">${esc(t)}</li>`))
    .join('')}</ol></nav>`;
}

export function picture(name, alt, { cls = '', sizes = '(min-width: 900px) 50vw, 100vw', eager = false } = {}) {
  return `<img class="${cls}" src="/assets/images/${name}.webp" srcset="/assets/images/${name}-900.webp 900w, /assets/images/${name}.webp 1500w" sizes="${sizes}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}
