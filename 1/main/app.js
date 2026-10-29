(function () {
  var G = window.GW, B = window.GW_BASE, H = window.GW_HOME, F = window.GW_FACILITIES;
  var Q = new URLSearchParams(location.search);
  var STATIC = Q.has('static');
  var reduce = STATIC || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var EASE = 'cubic-bezier(.16,1,.3,1)';
  var ROOT = 'https://www.gwtp.or.kr/gwtp/';
  var esc = G.esc;
  function $(id) { return document.getElementById(id); }

  var MENU = [
    ['공고안내', [['공지사항', 'bbsNew_list.php?code=sub01a&keyvalue=sub01'], ['모집공고', 'bbsNew_list.php?code=sub01b&keyvalue=sub01'], ['계약공고', 'bbsNew_list.php?code=sub01c&keyvalue=sub01'], ['채용공고', 'bbsNew_list.php?code=sub01d&keyvalue=sub01'], ['타기관소식', 'bbsNew_list.php?code=sub01g&keyvalue=sub01']]],
    ['사업안내', [['지역사업안내', 'pageview.php?url=sub02a&keyvalue=sub02'], ['부서별사업안내', 'pageview.php?url=sub02b&keyvalue=sub02'], ['장비지원', 'pageview.php?url=sub02c&keyvalue=sub02']]],
    ['입주안내', [['입주안내', 'pageview.php?url=sub04a&keyvalue=sub04'], ['입주기업소개', 'pageview.php?url=sub04b&keyvalue=sub04'], ['시설현황', 'pageview.php?url=sub04c&keyvalue=sub04']]],
    ['경영공시', [['운영계획 및 결과', 'bbsNew_list.php?code=sub05b&keyvalue=sub05'], ['재무정보', 'bbsNew_list.php?code=sub05a&keyvalue=sub05'], ['임직원현황', 'bbsNew_list.php?code=sub05c&keyvalue=sub05'], ['강원TP규정', 'bbsNew_list.php?code=sub05f&keyvalue=sub05'], ['회의록', 'bbsNew_list.php?code=sub05d&keyvalue=sub05'], ['감사결과', 'bbsNew_list.php?code=sub05e&keyvalue=sub05'], ['기부금 모금 및 실적', 'bbsNew_list.php?code=sub05g&keyvalue=sub05']]],
    ['TP NOW', [['언론보도', 'bbsNew_list.php?code=sub06b&keyvalue=sub06'], ['홍보자료', 'bbsNew_list.php?code=sub06c&keyvalue=sub06'], ['지역정보', 'bbsNew_list.php?code=sub06d&keyvalue=sub06'], ['뉴스레터', 'bbsNew_list.php?code=sub06g&keyvalue=sub06'], ['뉴스레터신청', 'pageview.php?url=sub06h&keyvalue=sub06']]],
    ['TP소개', [['일반현황', 'pageview.php?url=sub07a&keyvalue=sub07'], ['연혁', 'pageview.php?url=sub07d&keyvalue=sub07'], ['인사말', 'pageview.php?url=sub07b&keyvalue=sub07'], ['비전 및 목표', 'pageview.php?url=sub07c&keyvalue=sub07'], ['조직안내', 'pageview.php?url=sub07e&keyvalue=sub07'], ['ESG경영', 'pageview.php?url=sub07f&keyvalue=sub07'], ['찾아오시는 길', 'pageview.php?url=sub07g&keyvalue=sub07']]]
  ];

  var FIELDS = [
    { name: '반도체', sector: '반도체', place: '강릉', img: 'biz-semi.jpg', alt: '분석 장비를 다루는 연구원', lines: ['강릉 반도체 부재용 대형 세라믹 제품 제조 지원', '강릉 세라믹신소재지원센터와 반도체부재공장'], src: '2026 홍보영상, 입주안내 > 시설현황' },
    { name: '바이오', sector: '바이오', place: '춘천, 홍천', img: 'biz-bio.jpg', alt: '실험실에서 일하는 연구원', lines: ['춘천 바이오 특화, 천연물소재 전주기 표준화 허브', '홍천 항체의약품소재 특화, 중화항체치료제개발지원센터'], src: 'TP소개 > 일반현황, 입주안내 > 시설현황' },
    { name: '디지털헬스', sector: '디지털헬스·의료기기', place: '원주', img: 'biz-health.jpg', alt: '원주 강원테크노파크 시설', lines: ['원주 디지털헬스케어 특화', '원주벤처공장과 강원혁신지원 OpenLAB센터'], src: '2026 홍보영상 1:03, 입주안내 > 시설현황' },
    { name: '수소', sector: '수소·에너지', place: '삼척', img: 'biz-h2.jpg', alt: '삼척 강원테크노파크 시설', lines: ['삼척 액화수소 특화', '액화수소 저장·운송 핵심 소재부품 국산화'], src: '2026 홍보영상 1:03, 2:24' },
    { name: '모빌리티', sector: '모빌리티', place: '', img: 'biz-mob.jpg', alt: '제조 현장의 대형 설비', lines: ['미래차 전주기 실증 지원 체계 구축을 통한 미래차 산업 중심지 도약', '완전정밀분해 기반 미래차 부품 재제조 지원'], src: '2026 홍보영상 2:17, 언론보도 2026.10.27' },
    { name: 'AI', sector: 'ICT·데이터', place: '춘천', img: 'biz-ai.jpg', alt: '춘천 강원테크노파크 단지', lines: ['소양강댐 냉수를 자원으로 한 K-클라우드파크 조성', '디지털 혁신을 통한 창의적인 AI 생태계 조성'], src: '2026 홍보영상 2:31' }
  ];
  var CITY = ['춘천시', '홍천군', '원주시', '강릉시', '태백시', '삼척시'];

  function live() { return G.live().slice().sort(G.byDeadline); }
  function sectorCount(s) { return live().filter(function (n) { return G.sectorOK(n, s); }).length; }
  function shortCity(c) { return c.replace(/[시군]$/, ''); }
  function commas(t) { return String(t || '').replace(/\s+·\s+/g, ', '); }

  function renderMenus() {
    $('gnb').innerHTML = MENU.map(function (m, i) { return '<a href="' + ROOT + m[1][0][1] + '" data-m="' + i + '">' + esc(m[0]) + '</a>'; }).join('');
    $('megaIn').innerHTML = MENU.map(function (m) { return '<div class="mg-col"><p class="mg-t">' + esc(m[0]) + '</p><ul>' + m[1].map(function (s) { return '<li><a href="' + ROOT + s[1] + '">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></div>'; }).join('');
    $('mmList').innerHTML = MENU.map(function (m) { return '<div class="mm-g"><p class="mm-t">' + esc(m[0]) + '</p><ul>' + m[1].map(function (s) { return '<li><a href="' + ROOT + s[1] + '">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></div>'; }).join('');
    $('ftMap').innerHTML = MENU.map(function (m) { return '<div class="fm-col"><p>' + esc(m[0]) + '</p><ul>' + m[1].map(function (s) { return '<li><a href="' + ROOT + s[1] + '">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></div>'; }).join('');
  }

  function dueText(n) {
    var st = G.status(n);
    if (n.apply_end) return G.fmtShort(n.apply_end) + '(' + G.weekday(n.apply_end) + ')' + (n.apply_end_time ? ' ' + n.apply_end_time : '') + ' 마감';
    if (st === 'always') return n.apply_note || '연중 상시';
    return '마감일은 공고문에서 확인';
  }

  function renderBar() {
    var items = live().slice(0, 4);
    $('barList').innerHTML = items.map(function (n) {
      var b = G.badge(n);
      var meta = n.apply_end ? G.fmtShort(n.apply_end) + '(' + G.weekday(n.apply_end) + ') 마감' : (G.status(n) === 'always' ? (n.apply_note || '연중 상시') : (n.dept || ''));
      return '<a class="nt" href="' + esc(n.url || B.listUrl) + '" target="_blank" rel="noopener"><span class="nt-d ' + b.cls + '">' + esc(b.text) + '</span><span class="nt-t">' + esc(n.short || n.title) + '</span><span class="nt-m">' + esc(meta) + '</span></a>';
    }).join('');
    var c = document.querySelector('[data-open-count]');
    if (c) c.textContent = live().filter(function (n) { return G.status(n) !== 'unknown'; }).length;
  }

  var nState = { s: '', w: '', all: false };
  function renderTabs() {
    var all = live().length;
    var tabs = [['', '전체', all]].concat(B.sectors.map(function (s) { return [s, s, sectorCount(s)]; }));
    $('ntabs').innerHTML = tabs.map(function (t) { return '<button role="tab" data-s="' + esc(t[0]) + '" aria-selected="' + (t[0] === nState.s) + '">' + esc(t[1]) + '<span>' + t[2] + '</span></button>'; }).join('');
  }
  function renderNotices(animate) {
    var L = live().filter(function (n) { return G.sectorOK(n, nState.s); });
    var w = nState.w.trim().toLowerCase();
    if (w) L = L.filter(function (n) { return [n.title, n.short, n.target, n.benefit, n.dept].concat(n.sectors || [], n.types || [], n.regions || []).some(function (x) { return String(x || '').toLowerCase().indexOf(w) > -1; }); });
    var g = $('ngrid');
    if (!L.length) { g.innerHTML = '<p class="empty">신청할 수 있는 공고 중에는 ‘' + esc(w || nState.s) + '’에 맞는 것이 없습니다. <a href="' + esc(B.listUrl) + '" target="_blank" rel="noopener">지난 공고까지 보기</a></p>'; return; }
    g.innerHTML = L.map(function (n) {
      var b = G.badge(n), big = /^D-\d+$/.test(b.text) || b.text === '오늘 마감';
      var sec = (n.sectors || []).filter(function (x) { return x !== '전 분야'; });
      if (nState.s && sec.indexOf(nState.s) < 0) sec = ['전 분야'];
      var reg = (n.regions || []).filter(function (x) { return x !== '도외 가능'; }).join(', ').replace('도내 전체', '강원 전체');
      return '<a class="nc" href="' + esc(n.url || B.listUrl) + '" target="_blank" rel="noopener">' +
        '<span class="nc-d ' + b.cls + (big ? '' : ' txt') + '">' + esc(b.text) + '</span>' +
        '<span class="nc-t">' + esc(n.short || n.title) + '</span>' +
        '<span class="nc-f">' + esc(n.title) + '</span>' +
        '<span class="nc-m"><span>' + esc(dueText(n)) + '</span><span>' + esc([sec.join(', ') || '전 분야', reg].filter(Boolean).join(', ')) + '</span><span>' + esc(n.dept || '') + '</span></span></a>';
    }).join('');
    var cut = matchMedia('(max-width: 900px)').matches && !nState.all && L.length > 6;
    if (cut) {
      [].forEach.call(g.children, function (el, i) { if (i >= 6) el.hidden = true; });
      g.insertAdjacentHTML('beforeend', '<button class="nmore" id="nmore">나머지 ' + (L.length - 6) + '건 더 보기</button>');
    }
    if (animate && !reduce) {
      [].forEach.call(g.children, function (el, i) { if (!el.hidden) el.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: Math.min(i, 8) * 25, easing: EASE, fill: 'backwards' }); });
    }
  }
  function bindNotices() {
    $('ngrid').addEventListener('click', function (e) { if (e.target.closest('#nmore')) { nState.all = true; renderNotices(true); } });
    $('ntabs').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      nState.s = b.getAttribute('data-s'); nState.all = false;
      [].forEach.call($('ntabs').children, function (x) { x.setAttribute('aria-selected', x === b); });
      renderNotices(true);
    });
    var tm = 0, q = $('nq');
    q.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { nState.w = q.value; renderNotices(true); }, 150); });
    $('nsearch').addEventListener('submit', function (e) { e.preventDefault(); nState.w = q.value; renderNotices(true); });
  }

  var BOARDS = [['notice', '공지사항'], ['recruit', '모집공고'], ['bid', '계약공고'], ['jobs', '채용공고']];
  var bCur = 'recruit';
  function renderBoards() {
    $('btabs').innerHTML = BOARDS.map(function (b) { return '<button role="tab" data-b="' + b[0] + '" aria-selected="' + (b[0] === bCur) + '">' + b[1] + '</button>'; }).join('');
    var list = H[bCur] || [];
    $('blist').innerHTML = list.map(function (r) {
      return '<li><a href="' + esc(r.url || H.boards[bCur]) + '" target="_blank" rel="noopener"><span class="bl-t">' + esc(r.title) + '</span>' + (r.badge ? '<span class="bl-b">' + esc(r.badge) + '</span>' : '') + '<span class="bl-d">' + esc(r.date.replace(/-/g, '.')) + '</span></a></li>';
    }).join('');
    $('bmore').href = H.boards[bCur];
  }
  function bindBoards() {
    $('btabs').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      bCur = b.getAttribute('data-b'); renderBoards();
    });
  }

  function renderNums() {
    var open = live().filter(function (n) { return G.status(n) !== 'unknown'; }).length;
    var cities = {}; F.forEach(function (f) { cities[f.city] = 1; });
    var eq = H.eqnet || {};
    var rows = [
      ['2003', '년 설립', '2003년 12월 22일 재단법인 설립'],
      [String(Object.keys(cities).length), '개 시군', '춘천, 홍천, 원주, 강릉, 태백, 삼척'],
      [String(F.length), '곳 시설', '입주 공간과 지원센터'],
      [String(open), '건 공고', '지금 신청할 수 있는 지원사업'],
      [(eq.equipment || 0).toLocaleString('ko-KR'), '점 장비', (eq.institutions || 0) + '개 기관 공동활용, ' + String(eq.asOf || '').replace(/-/g, '.') + ' 기준']
    ];
    $('nums').innerHTML = rows.map(function (r) { return '<div><dt><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></dt><dd>' + esc(r[2]) + '</dd></div>'; }).join('');
  }

  function fieldHTML(f, i) {
    var c = sectorCount(f.sector);
    return '<p class="f-name">' + esc(f.name) + '</p>' +
      '<ul class="f-lines">' + f.lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
      '<p class="f-src">' + esc(f.src) + '</p>' +
      '<button class="f-go" data-s="' + esc(f.sector) + '">신청할 수 있는 ' + esc(f.name) + ' 공고 ' + c + '건 보기</button>';
  }
  function renderBiz() {
    $('bizList').innerHTML = FIELDS.map(function (f, i) {
      return '<article class="bz"><figure class="bz-pic"><img src="img/' + f.img + '" alt="' + esc(f.alt) + '" loading="lazy">' + (f.place ? '<figcaption>' + esc(f.place) + '</figcaption>' : '') + '</figure><div class="bz-txt">' + fieldHTML(f, i) + '</div></article>';
    }).join('');
    $('stageNav').innerHTML = FIELDS.map(function (f, i) { return '<li><button data-i="' + i + '"' + (i === 0 ? ' class="on"' : '') + '>' + esc(f.name) + '</button></li>'; }).join('');
    $('stagePic').innerHTML = FIELDS.map(function (f, i) { return '<figure class="sp' + (i === 0 ? ' on' : '') + '"><img src="img/' + f.img + '" alt="' + esc(f.alt) + '" loading="lazy">' + (f.place ? '<figcaption>' + esc(f.place) + '</figcaption>' : '') + '</figure>'; }).join('');
    $('stageTxt').innerHTML = '<div class="st-in">' + fieldHTML(FIELDS[0], 0) + '</div>';
  }
  function goSector(s) {
    nState.s = s; nState.w = ''; $('nq').value = '';
    renderTabs(); renderNotices(true);
    var y = $('notices').getBoundingClientRect().top + scrollY - 20;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }
  function bindBiz() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.f-go'); if (!b) return;
      goSector(b.getAttribute('data-s'));
    });
  }

  var pCity = '';
  function renderPlaceTabs() {
    var tabs = [['', '전체', F.length]].concat(CITY.map(function (c) { return [c, shortCity(c), F.filter(function (f) { return f.city === c; }).length]; }));
    $('ptabs').innerHTML = tabs.map(function (t) { return '<button role="tab" data-c="' + esc(t[0]) + '" aria-selected="' + (t[0] === pCity) + '">' + esc(t[1]) + '<span>' + t[2] + '</span></button>'; }).join('');
  }
  function facImg(f) { return 'img/f-' + (f.img || 'taebaek') + '.jpg'; }
  function renderPlaces(animate) {
    var L = F.map(function (f, i) { return { f: f, i: i }; }).filter(function (x) { return !pCity || x.f.city === pCity; });
    L.sort(function (a, b) { return CITY.indexOf(a.f.city) - CITY.indexOf(b.f.city) || a.i - b.i; });
    $('pgrid').innerHTML = L.map(function (x) {
      var f = x.f;
      return '<button class="pc" data-i="' + x.i + '"><span class="pc-pic"><img src="' + facImg(f) + '" alt="' + esc(f.name) + '" loading="lazy"></span><span class="pc-city">' + esc(f.city) + '</span><span class="pc-name">' + esc(f.name) + '</span><span class="pc-meta">' + esc(commas(f.area)) + '</span><span class="pc-use">' + esc(commas(f.use)) + '</span></button>';
    }).join('');
    if (animate && !reduce) {
      [].forEach.call($('pgrid').children, function (el, i) { el.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: Math.min(i, 8) * 25, easing: EASE, fill: 'backwards' }); });
    }
  }
  var lastFocus = null;
  function openDrawer(i) {
    var f = F[i];
    var hideScale = f.city === '홍천군';
    $('drBody').innerHTML = '<figure class="dr-pic"><img src="' + facImg(f) + '" alt="' + esc(f.name) + '"></figure>' +
      '<p class="dr-city">' + esc(f.city) + '</p><h3 id="drTitle" class="dr-name">' + esc(f.name) + '</h3>' +
      '<dl class="dr-info"><div><dt>위치</dt><dd>' + esc(f.addr) + '</dd></div><div><dt>면적</dt><dd>' + esc(commas(f.area)) + '</dd></div>' + (hideScale ? '' : '<div><dt>규모</dt><dd>' + esc(commas(f.scaleRaw || f.scale)) + '</dd></div>') + (f.facility ? '<div><dt>보유시설</dt><dd>' + esc(commas(f.facility)) + '</dd></div>' : '') + (f.lift ? '<div><dt>승강시설</dt><dd>' + esc(f.lift) + '</dd></div>' : '') + '</dl>' +
      '<p class="dr-sub">층별 구성</p><ul class="dr-floors">' + (f.floors || []).map(function (r) { return '<li><b>' + esc(r.level) + '</b><span>' + esc(r.use) + '</span></li>'; }).join('') + '</ul>' +
      '<a class="dr-link" href="' + ROOT + 'pageview.php?url=sub04c&keyvalue=sub04" target="_blank" rel="noopener">시설현황 원문 보기</a>';
    var d = $('drawer');
    lastFocus = document.activeElement;
    d.hidden = false;
    document.documentElement.classList.add('lock');
    if (!reduce) {
      $('drPanel').animate([{ transform: 'translateX(100%)' }, { transform: 'none' }], { duration: 300, easing: EASE });
      $('drBack').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE });
    }
    $('drClose').focus();
  }
  function closeDrawer() {
    var d = $('drawer');
    if (d.hidden) return;
    function done() { d.hidden = true; document.documentElement.classList.remove('lock'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    if (reduce) { done(); return; }
    $('drBack').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: EASE, fill: 'forwards' });
    $('drPanel').animate([{ transform: 'none' }, { transform: 'translateX(100%)' }], { duration: 220, easing: EASE, fill: 'forwards' }).onfinish = done;
  }
  function bindPlaces() {
    $('ptabs').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      pCity = b.getAttribute('data-c');
      [].forEach.call($('ptabs').children, function (x) { x.setAttribute('aria-selected', x === b); });
      renderPlaces(true);
    });
    $('pgrid').addEventListener('click', function (e) { var b = e.target.closest('.pc'); if (b) openDrawer(+b.getAttribute('data-i')); });
    $('drClose').addEventListener('click', closeDrawer);
    $('drBack').addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); closeMobile(); } });
  }

  function renderNews() {
    var N = B.news || [];
    $('newsMore').href = B.newsUrl;
    $('newsGrid').innerHTML = N.map(function (n, i) {
      return '<a class="nw' + (i === 0 ? ' lead' : '') + '" href="' + esc(B.newsUrl) + '" target="_blank" rel="noopener"><span class="nw-pic"><img src="img/news-' + (i + 1) + '.jpg" alt="" loading="lazy"></span><span class="nw-txt"><span class="nw-d">' + esc(n.date.replace(/-/g, '.')) + '</span><span class="nw-t">' + esc(n.title) + '</span></span></a>';
    }).join('');
  }

  function renderLinks() {
    $('callNum').textContent = B.phone;
    $('callNum').href = 'tel:' + B.phone.replace(/-/g, '');
    $('callAddr').textContent = B.address;
    $('ftAddr').innerHTML = esc(B.address) + '<br>대표전화 ' + esc(B.phone);
    $('sys').innerHTML = B.systems.map(function (s) {
      var host = s.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener"><span class="sy-g">' + esc(s.group) + '</span><span class="sy-n">' + esc(s.name) + '</span><span class="sy-h">' + esc(host) + '</span></a></li>';
    }).join('');
  }

  var mOpen = false;
  function openMobile() { var m = $('mmenu'); m.hidden = false; mOpen = true; $('mbtn').setAttribute('aria-expanded', 'true'); document.documentElement.classList.add('lock'); if (!reduce) m.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: EASE }); $('mclose').focus(); }
  function closeMobile() { if (!mOpen) return; var m = $('mmenu'); m.hidden = true; mOpen = false; $('mbtn').setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('lock'); $('mbtn').focus(); }

  function bindHeader() {
    var hd = $('hd'), mega = $('mega'), lastY = scrollY, hideT = 0;
    $('mbtn').addEventListener('click', openMobile);
    $('mclose').addEventListener('click', closeMobile);
    $('mmList').addEventListener('click', function (e) { if (e.target.closest('a')) closeMobile(); });
    function openMega() { clearTimeout(hideT); hd.classList.add('mega-on'); }
    function closeMega() { clearTimeout(hideT); hideT = setTimeout(function () { hd.classList.remove('mega-on'); }, 120); }
    $('gnb').addEventListener('mouseenter', openMega);
    $('gnb').addEventListener('focusin', openMega);
    mega.addEventListener('mouseenter', openMega);
    mega.addEventListener('mouseleave', closeMega);
    $('gnb').addEventListener('mouseleave', closeMega);
    mega.addEventListener('focusout', function (e) { if (!hd.contains(e.relatedTarget)) closeMega(); });
    function onScroll() {
      var y = scrollY, heroH = document.querySelector('.hero').offsetHeight;
      hd.classList.toggle('solid', y > 40);
      if (!reduce && y > heroH * 0.6 && y > lastY + 4 && !hd.classList.contains('mega-on')) hd.classList.add('away');
      else if (y < lastY - 4 || y < heroH * 0.6) hd.classList.remove('away');
      lastY = y;
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function heroMotion() {
    var sc = [].slice.call(document.querySelectorAll('.sc')), bt = [].slice.call(document.querySelectorAll('.prog button'));
    var DUR = 3400, cur = -1, t0 = 0, raf = 0, push = null;
    function show(i) {
      cur = i;
      sc.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      bt.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      if (reduce) return;
      if (push) push.cancel();
      push = sc[i].animate([{ transform: 'scale(1.0) translate3d(0,0,0)' }, { transform: 'scale(1.07) translate3d(-1.2%,-0.6%,0)' }], { duration: DUR + 1100, easing: 'cubic-bezier(.33,0,.4,1)', fill: 'forwards' });
    }
    if (reduce) { show(0); bt.forEach(function (b, k) { b.style.setProperty('--p', k === 0 ? 1 : 0); b.addEventListener('click', function () { show(k); bt.forEach(function (x, j) { x.style.setProperty('--p', j === k ? 1 : 0); }); }); }); return; }
    function tick(now) {
      var e = now - t0, i = Math.floor(e / DUR) % sc.length;
      if (i !== cur) show(i);
      var p = (e % DUR) / DUR;
      bt.forEach(function (b, k) { b.style.setProperty('--p', k < i ? 1 : (k === i ? p : 0)); });
      raf = requestAnimationFrame(tick);
    }
    document.querySelectorAll('h1 .ln1>span').forEach(function (el, k) { el.animate([{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }], { duration: 1000, delay: 120 + k * 130, easing: EASE, fill: 'backwards' }); });
    document.querySelector('.lead').animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 520, easing: EASE, fill: 'backwards' });
    document.querySelector('.prog').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: 700, easing: EASE, fill: 'backwards' });
    bt.forEach(function (b, k) { b.addEventListener('click', function () { t0 = performance.now() - k * DUR; cur = -1; }); });
    t0 = performance.now(); raf = requestAnimationFrame(tick);
  }

  function stageMotion() {
    var stage = $('stage'), pics = [].slice.call(document.querySelectorAll('#stagePic .sp')), navs = [].slice.call(document.querySelectorAll('#stageNav button')), txt = $('stageTxt');
    var mq = matchMedia('(min-width: 901px) and (min-aspect-ratio: 4/5)');
    var cur = 0;
    function set(i) {
      if (i === cur) return;
      var dir = i > cur ? 1 : -1;
      cur = i;
      pics.forEach(function (p, k) { p.classList.toggle('on', k === i); });
      navs.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      txt.innerHTML = '<div class="st-in">' + fieldHTML(FIELDS[i], i) + '</div>';
      txt.firstChild.animate([{ opacity: 0, transform: 'translateY(' + (24 * dir) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: EASE });
    }
    function onScroll() {
      if (!mq.matches) return;
      var r = stage.getBoundingClientRect(), span = stage.offsetHeight - innerHeight;
      var p = Math.min(Math.max(-r.top / Math.max(span, 1), 0), 0.9999);
      set(Math.floor(p * FIELDS.length));
    }
    navs.forEach(function (b, k) {
      b.addEventListener('click', function () {
        var span = stage.offsetHeight - innerHeight;
        var y = stage.getBoundingClientRect().top + scrollY + span * (k + 0.5) / FIELDS.length;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
    function apply() { document.documentElement.classList.toggle('staged', mq.matches); onScroll(); }
    mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
    addEventListener('scroll', onScroll, { passive: true });
    apply();
  }

  renderMenus();
  renderBar();
  renderTabs();
  renderNotices(false);
  renderBoards();
  renderNums();
  renderBiz();
  renderPlaceTabs();
  renderPlaces(false);
  renderNews();
  renderLinks();
  bindNotices();
  bindBoards();
  bindBiz();
  bindPlaces();
  bindHeader();
  if (!reduce) document.documentElement.classList.add('motion');
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
    heroMotion();
    if (!reduce) stageMotion();
  });
})();
