/* Frontline Lawyers — small progressive enhancements. Everything works without JS except the filters. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Expertise mega menu */
  $$('[data-dropdown]').forEach(function (wrap) {
    var btn = $('button', wrap);
    var panel = $('.mega', wrap);
    var timer;
    function open() { clearTimeout(timer); btn.setAttribute('aria-expanded', 'true'); panel.hidden = false; }
    function close() { btn.setAttribute('aria-expanded', 'false'); panel.hidden = true; }
    btn.addEventListener('click', function () { btn.getAttribute('aria-expanded') === 'true' ? close() : open(); });
    if (window.matchMedia('(hover: hover)').matches) {
      wrap.addEventListener('mouseenter', open);
      wrap.addEventListener('mouseleave', function () { timer = setTimeout(close, 160); });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { close(); btn.focus(); } });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    wrap.addEventListener('focusout', function (e) { if (e.relatedTarget && !wrap.contains(e.relatedTarget)) close(); });
  });

  /* Header: solid once you scroll past the top */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  var toggle = $('[data-menu-toggle]');
  var mnav = $('#mobile-nav');
  if (toggle && mnav) {
    toggle.addEventListener('click', function () {
      var openNow = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(openNow));
      toggle.setAttribute('aria-label', openNow ? 'Close navigation' : 'Open navigation');
      mnav.hidden = !openNow;
      if (header) header.classList.toggle('menu-open', openNow);
    });
  }

  /* Accordions */
  $$('.acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var exp = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!exp));
      document.getElementById(b.getAttribute('aria-controls')).hidden = exp;
    });
  });

  /* Tabs */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    function select(t) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!n) return;
        e.preventDefault();
        var next = tabs[(i + n + tabs.length) % tabs.length];
        select(next); next.focus();
      });
    });
  });

  /* Filters (practice areas + questions), with optional search */
  $$('[data-filter-group]').forEach(function (bar) {
    var name = bar.getAttribute('data-filter-group');
    var list = $('[data-filter-items="' + name + '"]');
    if (!list) return;
    var items = $$('[data-category]', list);
    var buttons = $$('[data-filter]', bar);
    var search = $('[data-search]', bar);
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var current = 'all';
    function apply() {
      var q = search ? search.value.trim().toLowerCase() : '';
      var shown = 0;
      items.forEach(function (el) {
        var ok = (current === 'all' || el.getAttribute('data-category') === current) && (!q || el.textContent.toLowerCase().indexOf(q) !== -1);
        el.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      if (count) count.textContent = shown + ' ' + (shown === 1 ? count.getAttribute('data-singular') : count.getAttribute('data-plural'));
      if (empty) empty.hidden = shown !== 0;
    }
    function choose(b) {
      current = b.getAttribute('data-filter');
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      apply();
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { choose(b); }); });
    if (search) search.addEventListener('input', function () {
      var all = $('[data-filter="all"]', bar);
      if (search.value.trim() && current !== 'all' && all) choose(all); else apply();
    });
    var topic = new URLSearchParams(location.search).get('topic');
    var start = topic && $('[data-filter="' + topic.replace(/[^a-z-]/g, '') + '"]', bar);
    if (start) { choose(start); start.scrollIntoView({ block: 'nearest', inline: 'center' }); }
  });

  /* Preparation checklists (kept on the page only) */
  $$('[data-checklist]').forEach(function (box) {
    var inputs = $$('input[type="checkbox"]', box);
    var status = $('[data-checklist-status]', box);
    function update() {
      var n = inputs.filter(function (i) { return i.checked; }).length;
      status.textContent = n + ' of ' + inputs.length + ' items ready';
    }
    inputs.forEach(function (i) { i.addEventListener('change', update); });
    $('[data-checklist-reset]', box).addEventListener('click', function () { inputs.forEach(function (i) { i.checked = false; }); update(); });
  });

  /* "On this page" active link */
  var onpage = $('.onpage');
  if (onpage && 'IntersectionObserver' in window) {
    var links = $$('a[href^="#"]', onpage);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (l) { var t = document.getElementById(l.getAttribute('href').slice(1)); if (t) io.observe(t); });
  }

  /* Contact form: pre-select the matter and submit to Netlify Forms without leaving the page */
  var form = $('[data-enquiry]');
  if (form) {
    var params = new URLSearchParams(location.search);
    var slug = params.get('matter');
    var sel = $('[data-matter]', form);
    if (slug && sel) {
      var opt = $('option[data-slug="' + slug.replace(/[^a-z0-9-]/g, '') + '"]', sel);
      if (opt) opt.selected = true;
    }
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !form.checkValidity()) return;
      e.preventDefault();
      var btn = $('button[type="submit"]', form);
      var err = $('.form-error', form);
      btn.disabled = true; err.hidden = true;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.hidden = true;
        var ok = $('.form-success');
        ok.hidden = false; ok.focus();
      }).catch(function () {
        err.hidden = false; btn.disabled = false;
      });
    });
  }

  /* Reviews carousel */
  $$('[data-reviews]').forEach(function (root) {
    var track = $('[data-reviews-track]', root);
    function step(dir) {
      var card = $('.review', track);
      var w = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
      track.scrollBy({ left: dir * w, behavior: 'smooth' });
    }
    $('[data-reviews-prev]', root).addEventListener('click', function () { step(-1); });
    $('[data-reviews-next]', root).addEventListener('click', function () { step(1); });
  });

  /* Subtle parallax on the statement band */
  var bands = $$('[data-parallax]');
  if (bands.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    var move = function () {
      ticking = false;
      bands.forEach(function (b) {
        var r = b.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        b.style.setProperty('--py', (p * -60).toFixed(1) + 'px');
      });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }

  /* Gentle reveal on scroll */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var targets = $$('.section .section-head, .area-card, .step, .profile-copy, .portrait, .locations-copy, .locations-figure, .value-card, .expect li, .statement-inner, .review, .timing, .area-law');
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t, i) {
      if (t.getBoundingClientRect().top < window.innerHeight) return;
      t.classList.add('reveal');
      t.style.transitionDelay = (t.classList.contains('area-card') || t.classList.contains('step') ? (i % 3) * 70 : 0) + 'ms';
      rio.observe(t);
    });
  }
})();
