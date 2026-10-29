(function () {
  var P = {
    '반도체': '<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10" y="10" width="4" height="4" rx=".6"/><path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3"/>',
    '바이오': '<rect x="9" y="2.75" width="6" height="3.25" rx=".8"/><path d="M9.75 6v1.4c0 .9-1.75 1.5-1.75 2.8V19a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8.8c0-1.3-1.75-1.9-1.75-2.8V6"/><path d="M8 14.25h8"/>',
    '디지털헬스·의료기기': '<rect x="2.75" y="6.5" width="18.5" height="11" rx="5.5"/><path d="M6.5 12h2.75l1.5-3 2.25 6 1.5-3h3"/>',
    '수소·에너지': '<rect x="3" y="8.5" width="18" height="9" rx="4.5"/><path d="M12 8.5V5M9.75 5h4.5M7.5 17.5v3M16.5 17.5v3"/>',
    '모빌리티': '<path d="M5.4 16.5H3.25v-3.4l1.9-3.9a2 2 0 0 1 1.8-1.1h9.1a2 2 0 0 1 1.6.8l3.1 4.1v3.5h-2.15M9.6 16.5h4.8"/><circle cx="7.5" cy="16.5" r="2.1"/><circle cx="16.5" cy="16.5" r="2.1"/><path d="M3.25 12.75h17.5"/>',
    'ICT·데이터': '<rect x="4" y="3.75" width="16" height="4.75" rx="1.2"/><rect x="4" y="9.65" width="16" height="4.75" rx="1.2"/><rect x="4" y="15.5" width="16" height="4.75" rx="1.2"/><path d="M7.5 6.1h.01M7.5 12h.01M7.5 17.9h.01"/>',
    '정보보호': '<path d="M12 3l7 2.6v5.6c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V5.6Z"/><circle cx="12" cy="10.6" r="1.7"/><path d="M12 12.3v3.1"/>',
    '입주 공간': '<path d="M3.5 20.5h17M6 20.5V5.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75V20.5M15 9.5h3.25a.75.75 0 0 1 .75.75V20.5M9 8.25h3M9 11.75h3M9 15.25h3"/>',
    '공동 장비': '<path d="M6.5 20.5h11M9.25 20.5v-2.25M10.6 3.6l3 1.75-3.6 6.2-3-1.75z"/><path d="M9.9 12.4l1.4.8M14.1 8.7a5.2 5.2 0 0 1-2 9.55M7.75 18.25h6.5"/>',
    '전화': '<path d="M6.6 3.75h2.9l1.45 3.9-1.95 1.2a10.6 10.6 0 0 0 6.15 6.15l1.2-1.95 3.9 1.45v2.9a2 2 0 0 1-2.15 2A16.3 16.3 0 0 1 4.6 5.9a2 2 0 0 1 2-2.15z"/>',
    '전 분야': '<rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/>'
  };
  function icon(name, cls) {
    var body = P[name] || P['전 분야'];
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  }
  window.GWI = { icon: icon, names: Object.keys(P) };
})();
