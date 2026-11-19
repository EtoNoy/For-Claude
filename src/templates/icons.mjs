// Line icons (24×24, stroke-based). Several shapes adapted from Lucide (ISC licence).
const P = {
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  'arrow-right': '<path d="M4 12h16"/><path d="m14 6 6 6-6 6"/>',
  'arrow-down': '<path d="M12 4v16"/><path d="m6 14 6 6 6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  phone: '<path d="M21 16.4v3a1.9 1.9 0 0 1-2.1 1.9 18.8 18.8 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.1 4.4 1.9 1.9 0 0 1 4 2.3h3a1.9 1.9 0 0 1 1.9 1.6c.1.9.4 1.8.7 2.7a1.9 1.9 0 0 1-.4 2L8 9.8a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.7.7a1.9 1.9 0 0 1 1.6 1.9Z"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="m3 6 9 7 9-7"/>',
  'shield-check': '<path class="f" d="M12 21.5s7.5-3.6 7.5-9.5V5.2L12 2.5 4.5 5.2V12c0 5.9 7.5 9.5 7.5 9.5Z"/><path d="m8.8 11.8 2.3 2.3 4.4-4.6"/>',
  shield: '<path class="f" d="M12 21.5s7.5-3.6 7.5-9.5V5.2L12 2.5 4.5 5.2V12c0 5.9 7.5 9.5 7.5 9.5Z"/>',
  'shield-lock': '<path class="f" d="M12 21.5s7.5-3.6 7.5-9.5V5.2L12 2.5 4.5 5.2V12c0 5.9 7.5 9.5 7.5 9.5Z"/><rect x="9.3" y="10.6" width="5.4" height="4.4" rx=".6"/><path d="M10.4 10.6V9.4a1.6 1.6 0 0 1 3.2 0v1.2"/>',
  compass: '<circle class="f" cx="12" cy="12" r="8.5"/><path d="m15.2 8.8-1.7 4.7-4.7 1.7 1.7-4.7Z"/><path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2"/>',
  user: '<circle class="f" cx="12" cy="7.5" r="4"/><path d="M4 21.5v-1.5a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1.5"/>',
  'map-pin': '<path d="M19 10c0 5.5-7 11.5-7 11.5S5 15.5 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  check: '<path d="m4.5 12.5 4.5 4.5L19.5 6.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  lock: '<rect class="f" x="4.5" y="10.5" width="15" height="11" rx="1.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  download: '<path d="M12 3.5v12"/><path d="m7 11 5 5 5-5"/><path d="M4 17.5v3h16v-3"/>',
  messages: '<path class="f" d="M3 4.5h13v9H8l-5 4Z"/><path d="M7.5 8h5M7.5 10.8h3.5"/><path d="M19 8.5h2v12l-3.5-3H10v-4"/>',
  'file-text': '<path class="f" d="M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5Z"/><path d="M14 2.5v5h5"/><path d="M8.5 12h7M8.5 15h7M8.5 18h5"/>',
  'file-pill': '<path d="M8 2.5h11.5v15"/><rect class="f" x="4.5" y="6" width="12" height="15.5" rx=".5"/><path d="m8 17.2 4.6-4.6a1.6 1.6 0 0 1 2.3 2.3l-4.6 4.6A1.6 1.6 0 0 1 8 17.2Z"/><path d="m10.3 14.9 2.3 2.3"/><path d="M7 9.5h5"/>',
  landmark: '<path d="M3 21.5h18"/><path d="M4 18.5h16"/><path d="M6 10.5v8M10 10.5v8M14 10.5v8M18 10.5v8"/><path class="f" d="M12 2.5 21 7.5H3Z"/><path d="M3.5 10.5h17"/>',
  crosshair: '<path d="M3 7.5v-4h4M17 3.5h4v4M21 16.5v4h-4M7 20.5H3v-4"/><circle class="f" cx="12" cy="12" r="4.5"/><path d="M12 10v4M10 12h4"/>',
  key: '<circle class="f" cx="7.5" cy="15.5" r="4.5"/><circle cx="7.5" cy="15.5" r="1.2"/><path d="m10.8 12.2 9.2-9.2"/><path d="m16.5 6.5 2.5 2.5M14 9l2 2"/><path d="M3 22.5h9"/>',
  car: '<path d="M5 16.5H3.5V12l2-5h13l2 5v4.5H19"/><path d="M3.5 12h17"/><circle cx="7.5" cy="16.5" r="2"/><circle cx="16.5" cy="16.5" r="2"/><path d="M9.5 16.5h5"/>',
  'id-card': '<rect class="f" x="2.5" y="5" width="19" height="14" rx="1.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16a3 3 0 0 1 6 0"/><path d="M14 10h4.5M14 13.5h4.5"/>',
  scale: '<path d="M12 3v18"/><path d="M7 21h10"/><path d="M4 7h16"/><path d="m4 7-2.5 6a3 3 0 0 0 5 0Z"/><path d="m20 7-2.5 6a3 3 0 0 0 5 0Z"/>',
  megaphone: '<path d="M3 10v4l3 .5V9.5Z"/><path class="f" d="M6 9.5 19 4.5v15L6 14.5"/><path d="m8 15 1.5 5h3l-1.4-4.2"/>',
  home: '<path d="M3.5 10.5 12 3.5l8.5 7"/><path class="f" d="M5.5 9v11.5h13V9l-6.5-5.4Z"/><path d="M10 20.5v-6h4v6"/>',
  monitor: '<rect class="f" x="2.5" y="3.5" width="19" height="13" rx="1.5"/><path d="M8 21h8M12 16.5V21"/><path d="m9.5 8.5-2 2 2 2M14.5 8.5l2 2-2 2"/>',
  banknote: '<rect class="f" x="2.5" y="6" width="19" height="12" rx="1.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  gavel: '<path d="m13.5 12.5-7.8 7.8a1.8 1.8 0 0 1-2.5-2.5l7.8-7.8"/><path d="m9.5 7 7.5 7.5"/><path d="m12.5 4 7.5 7.5"/><path d="m11 5.5 1.5-1.5M18.5 13 20 11.5"/><path d="M14 22.5h8"/>',
  road: '<path d="M5 21.5 9 2.5M19 21.5 15 2.5"/><path d="M12 4v2.5M12 10v3M12 16.5v3.5"/>',
  menu: '<path d="M3 8.5h18M3 15.5h18"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20.5 20.5-4.8-4.8"/>',
  chat: '<path class="f" d="M4 4.5h16v11H9l-5 4Z"/><path d="M8 8.5h8M8 11.5h5"/>',
  doc: '<path d="M8 2.5h11.5v15"/><rect class="f" x="4.5" y="6" width="12" height="15.5" rx=".5"/><path d="M7.5 10h6M7.5 13h6M7.5 16h6M7.5 19h4"/>',
  laurel: '<circle cx="12" cy="12" r="10"/><path d="m12 6.6 1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5Z"/><path d="M5.6 14.5c.9 2.6 3.4 4.4 6.4 4.4s5.5-1.8 6.4-4.4"/><path d="M4.2 11c0 .2 0 .5.1.8M19.8 11c0 .2 0 .5-.1.8"/>'
};

export function icon(name, cls = '', label = '') {
  const body = P[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`;
}

export function logoMark(cls = '') {
  return `<svg class="logo-mark${cls ? ' ' + cls : ''}" viewBox="0 0 40 44" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true" focusable="false"><path d="M20 2.5 36.5 8.6v15c0 8.6-7.4 14.6-16.5 18.4C10.9 38.2 3.5 32.2 3.5 23.6v-15Z" stroke-linejoin="round"/><path d="M13.6 12.5v18.5M17.6 12.5v18.5M17.6 12.9h9.6M17.6 21.5h7.4"/></svg>`;
}
