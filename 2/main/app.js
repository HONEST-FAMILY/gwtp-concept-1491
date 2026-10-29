(function () {
  var G = window.GW, B = window.GW_BASE, H = window.GW_HOME, F = window.GW_FACILITIES || [];
  var A = '../assets/';
  var SITE = 'https://www.gwtp.or.kr/gwtp/';
  var esc = G.esc;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function swap(el, fn) {
    if (reduce) { fn(); return; }
    el.classList.add('swap');
    setTimeout(function () { fn(); el.classList.remove('swap'); }, 140);
  }

  var MENU = [
    ['공고안내', [['공지사항', 'bbsNew_list.php?code=sub01a&keyvalue=sub01'], ['모집공고', 'bbsNew_list.php?code=sub01b&keyvalue=sub01'], ['계약공고', 'bbsNew_list.php?code=sub01c&keyvalue=sub01'], ['채용공고', 'bbsNew_list.php?code=sub01d&keyvalue=sub01'], ['타기관소식', 'bbsNew_list.php?code=sub01g&keyvalue=sub01']]],
    ['사업안내', [['지역사업안내', 'pageview.php?url=sub02a&keyvalue=sub02'], ['부서별사업안내', 'pageview.php?url=sub02b&keyvalue=sub02'], ['장비지원', 'pageview.php?url=sub02c&keyvalue=sub02']]],
    ['입주안내', [['입주안내', 'pageview.php?url=sub04a&keyvalue=sub04'], ['입주기업소개', 'pageview.php?url=sub04b&keyvalue=sub04'], ['시설현황', 'pageview.php?url=sub04c&keyvalue=sub04']]],
    ['경영공시', [['운영계획 및 결과', 'bbsNew_list.php?code=sub05b&keyvalue=sub05'], ['재무정보', 'bbsNew_list.php?code=sub05a&keyvalue=sub05'], ['임직원현황', 'bbsNew_list.php?code=sub05c&keyvalue=sub05'], ['강원TP규정', 'bbsNew_list.php?code=sub05f&keyvalue=sub05'], ['회의록', 'bbsNew_list.php?code=sub05d&keyvalue=sub05'], ['감사결과', 'bbsNew_list.php?code=sub05e&keyvalue=sub05'], ['기부금 모금 및 실적', 'bbsNew_list.php?code=sub05g&keyvalue=sub05']]],
    ['TP NOW', [['언론보도', 'bbsNew_list.php?code=sub06b&keyvalue=sub06'], ['홍보자료', 'bbsNew_list.php?code=sub06c&keyvalue=sub06'], ['지역정보', 'bbsNew_list.php?code=sub06d&keyvalue=sub06'], ['뉴스레터', 'bbsNew_list.php?code=sub06g&keyvalue=sub06'], ['뉴스레터신청', 'pageview.php?url=sub06h&keyvalue=sub06']]],
    ['TP소개', [['일반현황', 'pageview.php?url=sub07a&keyvalue=sub07'], ['연혁', 'pageview.php?url=sub07d&keyvalue=sub07'], ['인사말', 'pageview.php?url=sub07b&keyvalue=sub07'], ['비전 및 목표', 'pageview.php?url=sub07c&keyvalue=sub07'], ['조직안내', 'pageview.php?url=sub07e&keyvalue=sub07'], ['ESG경영', 'pageview.php?url=sub07f&keyvalue=sub07'], ['찾아오시는 길', 'pageview.php?url=sub07g&keyvalue=sub07']]]
  ];

  var ST = [
    ['cc-v2', '춘천벤처2공장', 0.8, 1.55, '50%', '춘천', 3],
    ['cc-hq', '기술혁신지원센터', 1.0, 1.5437, '100%'],
    ['cc-v1', '춘천벤처1공장', 0.8, 1.55, '0%'],
    ['hc-antibody', '중화항체치료제개발지원센터', 1.0, 1.55, '0%', '홍천', 1],
    ['wj-v1', '원주벤처공장', 0.8, 1.55, '50%', '원주', 3],
    ['wj-v2', '원주벤처2공장', 1.0, 1.55, '100%'],
    ['wj-openlab', '강원혁신지원 OpenLAB센터', 1.2, 1.0947, '50%', null, null, 1],
    ['gn-ceramic', '세라믹신소재지원센터', 1.2, 1.4533, '40%', '강릉', 5],
    ['gn-sop', 'SoP지원센터', 1.0, 1.55, '50%'],
    ['gn-v1', '강릉벤처1공장', 0.8, 1.55, '50%'],
    ['gn-v2', '강릉벤처2공장', 1.0, 1.55, '50%'],
    ['gn-semi', '반도체부재공장', 0.62, 1.55, '50%'],
    ['taebaek', '원료산업지원센터', 0.8, 1.55, '50%', '태백', 1],
    ['sc-energy', '에너지방재지원센터', 1.0, 1.55, '40%', '삼척', 2],
    ['sc-bi', '삼척창업보육센터', 1.0, 1.55, '50%']
  ];
  var MINI_R = { 'cc-v2': 1.8, 'cc-hq': 1.544, 'cc-v1': 1.8, 'hc-antibody': 1.8, 'wj-v1': 1.769, 'wj-v2': 1.8, 'wj-openlab': 1.095, 'gn-ceramic': 1.453, 'gn-sop': 1.8, 'gn-v1': 1.8, 'gn-v2': 1.8, 'gn-semi': 1.8, 'taebaek': 1.8, 'sc-energy': 1.8, 'sc-bi': 1.8 };
  var CITY = [['춘천시', '춘천', '바이오 특화'], ['홍천군', '홍천', '항체의약품소재 특화'], ['원주시', '원주', '디지털헬스케어 특화'], ['강릉시', '강릉', '세라믹 특화'], ['태백시', '태백', '경석자원 특화'], ['삼척시', '삼척', '액화수소 특화']];

  var BZ = [
    { nm: '반도체', sec: '반도체', ev: ['강릉 반도체부재공장에서 반도체 부재용 대형 세라믹 제품 제조를 지원합니다.', '세라믹신소재지원센터에 실험실, 창업보육실, 기기분석실이 있습니다.'], b: ['gn-semi', 'gn-ceramic'] },
    { nm: '바이오', sec: '바이오', ev: ['춘천은 바이오, 홍천은 항체의약품소재 특화 지역입니다.', '홍천 중화항체치료제개발지원센터에 기업입주공간과 바이오 관련 실험실이 있습니다.'], b: ['hc-antibody'] },
    { nm: '디지털헬스', sec: '디지털헬스·의료기기', ev: ['원주는 디지털헬스케어 특화 지역입니다.', '원주에 원주벤처공장, 원주벤처2공장, 강원혁신지원 OpenLAB센터가 있습니다.'], b: ['wj-v1', 'wj-v2', 'wj-openlab'] },
    { nm: '수소', sec: '수소·에너지', ev: ['삼척은 액화수소 특화 지역입니다.', '삼척 입주 공간은 강원테크노파크 입주기업 모집공고(삼척)로 상시 모집합니다.'], b: ['sc-energy', 'sc-bi'] },
    { nm: '모빌리티', sec: '모빌리티', ev: ['미래차 전주기 실증 지원 체계 구축을 통한 미래차 산업 중심지 도약을 목표로 합니다.', '10월 27일, 완전정밀분해 기반 미래차 부품 재제조 지원을 본격 추진한다고 알렸습니다.'], b: [] },
    { nm: 'AI', sec: 'ICT·데이터', ev: ['소양강댐의 냉수를 자원으로 한 K-클라우드파크(데이터센터)를 그립니다.', '강원디지털혁신센터가 데이터 기반 신산업 생태계를 만들고 SW, ICT 융합 기업의 성장을 이끕니다.'], b: [] }
  ];

  function byImg(k) { for (var i = 0; i < ST.length; i++) if (ST[i][0] === k) return ST[i]; return null; }
  function facOf(name) { for (var i = 0; i < F.length; i++) if (F[i].name === name) return F[i]; return null; }
  function commas(s) { return String(s || '').replace(/\s*·\s*/g, ', '); }
  function live() { return G.live().slice().sort(G.byDeadline); }
  function stOf(n) { return G.status(n); }
  function ddText(n) {
    var s = stOf(n);
    if (s === 'always') return '상시 모집';
    if (s === 'unknown') return '마감일 공고문 확인';
    return G.badge(n).text;
  }
  function urgent(n) { var d = G.dday(n); return stOf(n) === 'open' && d !== null && d <= 3; }

  function menu() {
    $('gnb').innerHTML = MENU.map(function (m) { return '<a href="' + SITE + m[1][0][1] + '" target="_blank" rel="noopener">' + esc(m[0]) + '</a>'; }).join('');
    var cols = MENU.map(function (m) { return '<div><h3>' + esc(m[0]) + '</h3><ul>' + m[1].map(function (s) { return '<li><a href="' + SITE + s[1] + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></div>'; }).join('');
    $('megaCols').innerHTML = cols;
    $('sheetBody').innerHTML = MENU.map(function (m) { return '<div class="grp"><h3>' + esc(m[0]) + '</h3><ul>' + m[1].map(function (s) { return '<li><a href="' + SITE + s[1] + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></div>'; }).join('');
    $('map').innerHTML = MENU.map(function (m) { return '<div><h3>' + esc(m[0]) + '</h3><ul>' + m[1].map(function (s) { return '<li><a href="' + SITE + s[1] + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul></div>'; }).join('');
    var hd = $('hd'), t;
    function openM() { clearTimeout(t); hd.classList.add('open'); }
    function closeM() { t = setTimeout(function () { hd.classList.remove('open'); }, 120); }
    $('gnb').addEventListener('mouseenter', openM);
    $('gnb').addEventListener('focusin', openM);
    $('mega').addEventListener('mouseenter', openM);
    $('gnb').addEventListener('mouseleave', closeM);
    $('mega').addEventListener('mouseleave', closeM);
    $('mega').addEventListener('focusout', function (e) { if (!hd.contains(e.relatedTarget)) closeM(); });
    var sh = $('sheet'), mb = $('menuBtn');
    mb.addEventListener('click', function () { sh.classList.add('on'); mb.setAttribute('aria-expanded', 'true'); $('sheetX').focus(); });
    $('sheetX').addEventListener('click', function () { sh.classList.remove('on'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); });
  }

  function street() {
    function fig(s, hidden) {
      var city = s[5] ? '<span class="cn">' + esc(s[5]) + '<em>' + s[6] + '곳</em></span>' : '';
      var img = A + 'b-' + s[0] + '.webp';
      var band = s[7] ? '<img class="band" src="' + img + '" alt="" aria-hidden="true">' : '';
      var inner = '<div class="im"><img src="' + img + '" alt="' + (hidden ? '' : esc(s[1])) + '" style="object-position:' + s[4] + ' 100%">' + band + '</div>';
      var body = hidden ? inner : '<button type="button" data-fac="' + esc(s[1]) + '" aria-label="' + esc(s[1]) + ' 층별 구성 보기">' + inner + '</button>';
      return '<figure class="bd' + (s[5] ? ' c0' : '') + (s[7] ? ' part' : '') + '" style="--k:' + s[2] + ';--r:' + s[3] + '"' + (hidden ? ' aria-hidden="true"' : '') + '>' + body + '<figcaption>' + city + '</figcaption></figure>';
    }
    $('track').innerHTML = ST.map(function (s) { return fig(s, false); }).join('') + ST.map(function (s) { return fig(s, true); }).join('');
    var groups = [];
    ST.forEach(function (s) { if (s[5]) groups.push({ c: s[5], items: [] }); groups[groups.length - 1].items.push(s); });
    $('mini').innerHTML = groups.map(function (g) {
      return '<div class="mc"><div class="mr">' + g.items.map(function (s) { var k = s[2]; return '<img src="' + A + 'b-' + s[0] + '.webp" alt="" style="height:calc(var(--mh) * ' + k + ');width:calc(var(--mh) * ' + k + ' * ' + MINI_R[s[0]] + ')">'; }).join('') + '</div><span>' + esc(g.c) + '</span></div>';
    }).join('');
  }

  var state = { s: '', w: '' };
  function notices() {
    var L = live();
    var o = L.filter(function (n) { return stOf(n) === 'open'; }).length;
    var a = L.filter(function (n) { return stOf(n) === 'always'; }).length;
    var u = L.filter(function (n) { return stOf(n) === 'unknown'; }).length;
    $('ncnt').textContent = '접수 중 ' + o + '건, 상시 모집 ' + a + '건' + (u ? ', 마감일 공고문 확인 ' + u + '건' : '');
    var secs = ['반도체', '바이오', '디지털헬스·의료기기', '수소·에너지', '모빌리티', 'ICT·데이터', '정보보호'];
    var btns = [['', '전체', L.length]].concat(secs.map(function (s) { return [s, s, L.filter(function (n) { return G.sectorOK(n, s); }).length]; }).filter(function (x) { return x[2] > 0; }));
    $('filt').innerHTML = btns.map(function (b) { return '<button type="button" data-s="' + esc(b[0]) + '" aria-pressed="' + (b[0] === state.s) + '">' + esc(b[1]) + '<b>' + b[2] + '</b></button>'; }).join('') +
      '<form class="srch" role="search" id="srch"><input id="q" type="search" placeholder="공고 이름이나 분야로 찾기" aria-label="공고 찾기"><button type="submit">찾기</button></form>';
    $('filt').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-s]');
      if (!b) return;
      state.s = b.getAttribute('data-s');
      Array.prototype.forEach.call($('filt').querySelectorAll('button[data-s]'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      swap($('nl'), drawN);
    });
    $('srch').addEventListener('submit', function (e) { e.preventDefault(); state.w = $('q').value.trim(); swap($('nl'), drawN); });
    $('q').addEventListener('input', function () { state.w = $('q').value.trim(); drawN(); });
    drawN();
  }
  function drawN() {
    var L = live();
    if (state.s) L = L.filter(function (n) { return G.sectorOK(n, state.s); });
    if (state.w) {
      var w = state.w.toLowerCase();
      L = L.filter(function (n) { return [n.title, n.short, n.target, n.benefit, n.dept].concat(n.sectors || []).some(function (x) { return String(x || '').toLowerCase().indexOf(w) > -1; }); });
    }
    if (!L.length) { $('nl').innerHTML = '<li class="none">조건에 맞는 공고가 없습니다. 분야를 전체로 바꾸거나 다른 낱말로 찾아 보세요.</li>'; return; }
    $('nl').innerHTML = L.map(function (n) {
      var meta = [(n.sectors || []).join(', '), G.deadlineText(n), n.dept].filter(Boolean).join(', ');
      return '<li><a href="' + esc(n.url || B.listUrl) + '" target="_blank" rel="noopener"><span class="dd' + (urgent(n) ? ' u' : '') + '">' + esc(ddText(n)) + '</span><span class="t">' + esc(n.short || n.title) + '</span><span class="o">' + esc(n.title) + '</span><span class="m">' + esc(meta) + '</span></a></li>';
    }).join('');
  }

  function boards() {
    var T = [['notice', '공지사항'], ['recruit', '모집공고'], ['bid', '계약공고'], ['jobs', '채용공고']];
    $('tabs').innerHTML = T.map(function (t, i) { return '<button type="button" role="tab" id="tab-' + t[0] + '" aria-selected="' + (i === 1) + '" data-k="' + t[0] + '">' + t[1] + '</button>'; }).join('');
    function draw(k) {
      var L = (H[k] || []);
      $('bl').innerHTML = L.map(function (x) { return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener"><span class="bt">' + esc(x.title) + '</span>' + (x.badge ? '<span class="bg">' + esc(x.badge) + '</span>' : '<span></span>') + '<time class="bdt">' + esc(String(x.date).replace(/-/g, '.')) + '</time></a></li>'; }).join('');
      $('bl').setAttribute('aria-labelledby', 'tab-' + k);
      $('bmore').href = (H.boards && H.boards[k]) || B.listUrl;
    }
    $('tabs').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-k]');
      if (!b) return;
      Array.prototype.forEach.call($('tabs').children, function (x) { x.setAttribute('aria-selected', String(x === b)); });
      var k = b.getAttribute('data-k');
      swap($('bl'), function () { draw(k); });
    });
    draw('recruit');
  }

  function nums() {
    var L = live();
    var o = L.filter(function (n) { return stOf(n) === 'open'; }).length;
    var a = L.filter(function (n) { return stOf(n) === 'always'; }).length;
    var eq = (H && H.eqnet) || { equipment: 1143, institutions: 29, asOf: '2026-10-28' };
    var items = [
      ['15', '곳', '입주 공간과 지원센터'],
      ['6', '개 시군', '춘천, 홍천, 원주, 강릉, 태백, 삼척'],
      [String(o + a), '건', '지금 신청할 수 있는 공고(접수 중 ' + o + '건, 상시 ' + a + '건)'],
      [Number(eq.equipment).toLocaleString('ko-KR'), '점', '공동활용 장비, ' + eq.institutions + '개 기관(' + String(eq.asOf).replace(/-/g, '.') + ' 기준)'],
      ['2003', '년', '12월 22일 설립']
    ];
    $('nums').innerHTML = items.map(function (x) { return '<li><b>' + esc(x[0]) + '<small>' + esc(x[1]) + '</small></b><span>' + esc(x[2]) + '</span></li>'; }).join('');
  }

  function biz() {
    var L = live();
    $('bz').innerHTML = BZ.map(function (z) {
      var mine = L.filter(function (n) { return (n.sectors || []).indexOf(z.sec) > -1; });
      var ct = mine.length ? '<p class="ct">' + esc(z.sec) + ' 분야 공고 <a href="#notices" data-go="' + esc(z.sec) + '">' + mine.length + '건 보기</a></p>' : '<p class="ct">지금 열린 ' + esc(z.sec) + ' 분야 공고는 없습니다.</p>';
      var right;
      if (z.b.length) {
        right = '<div class="bs">' + z.b.map(function (k) { var s = byImg(k); return '<button type="button" data-fac="' + esc(s[1]) + '" aria-label="' + esc(s[1]) + ' 층별 구성 보기"><img src="' + A + 'b-' + k + '.webp" alt="' + esc(s[1]) + '" style="--h:' + Math.round(130 * Math.min(s[2], 1.2)) + 'px"></button>'; }).join('') + '</div>';
      } else {
        right = '<div class="bs nb"><div class="nt">' + (mine.length ? mine.slice(0, 2).map(function (n) { return '<a href="' + esc(n.url) + '" target="_blank" rel="noopener">' + esc(ddText(n)) + ', ' + esc(n.short || n.title) + '</a>' + esc(G.deadlineText(n)); }).join('<br>') : '') + '</div></div>';
      }
      return '<li><h3 class="nm">' + esc(z.nm) + '</h3><div class="ev">' + z.ev.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + ct + '</div>' + right + '</li>';
    }).join('');
    $('bz').addEventListener('click', function (e) {
      var a = e.target.closest('a[data-go]');
      if (!a) return;
      e.preventDefault();
      var s = a.getAttribute('data-go');
      var b = $('filt').querySelector('button[data-s="' + s + '"]');
      if (b) b.click();
      $('notices').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }

  function places() {
    $('cities').innerHTML = [['', '전체']].concat(CITY.map(function (c) { return [c[1], c[1]]; })).map(function (c) { return '<button type="button" data-c="' + esc(c[0]) + '" aria-pressed="' + (c[0] === '') + '">' + esc(c[1]) + '</button>'; }).join('');
    $('rows').innerHTML = CITY.map(function (c) {
      var fs = ST.filter(function (s) { var f = facOf(s[1]); return f && f.city === c[0]; });
      return '<div class="crow" data-city="' + esc(c[1]) + '"><div class="cl"><h3>' + esc(c[1]) + '<em>' + fs.length + '곳</em></h3><p>' + esc(c[2]) + '</p></div><div class="lot">' + fs.map(function (s) {
        var f = facOf(s[1]);
        var area = (f.area || '').split(' · ')[0];
        return '<button type="button" data-fac="' + esc(s[1]) + '"><img src="' + A + 'b-' + s[0] + '.webp" alt="" style="--h:' + Math.round(150 * Math.min(s[2], 1.2)) + 'px"><span class="ln">' + esc(s[1]) + '<span class="la">' + esc(area) + '</span></span></button>';
      }).join('') + '</div></div>';
    }).join('');
    $('cities').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-c]');
      if (!b) return;
      var c = b.getAttribute('data-c');
      Array.prototype.forEach.call($('cities').children, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      Array.prototype.forEach.call($('rows').children, function (r) {
        r.hidden = !!c && r.getAttribute('data-city') !== c;
        r.classList.remove('rise');
        if (!r.hidden && !reduce) { void r.offsetWidth; r.classList.add('rise'); }
      });
    });
  }

  var lastFocus = null;
  function openFac(name) {
    var f = facOf(name), s = null;
    for (var i = 0; i < ST.length; i++) if (ST[i][1] === name) s = ST[i];
    if (!f || !s) return;
    $('dImg').src = A + 'b-' + s[0] + '.webp';
    $('dImg').alt = name;
    $('dCity').textContent = f.addr;
    $('dName').textContent = name;
    var rows = [['면적', commas(f.area)]];
    if (f.city !== '홍천군') rows.push(['규모', f.scaleRaw || f.scale]);
    rows.push(['주요 용도', commas(f.use)]);
    if (f.facility) rows.push(['기타 시설', f.facility]);
    if (f.lift && f.lift !== '-') rows.push(['승강기', f.lift]);
    $('dInfo').innerHTML = rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('');
    $('dFloors').innerHTML = (f.floors && f.floors.length) ? '<caption class="ci" style="text-align:left;padding-bottom:6px">층별 구성</caption>' + f.floors.map(function (x) { return '<tr><th scope="row">' + esc(x.level) + '</th><td>' + esc(x.use) + '</td></tr>'; }).join('') : '';
    lastFocus = document.activeElement;
    $('dlg').classList.add('on');
    document.body.style.overflow = 'hidden';
    $('dlg').querySelector('.box').scrollTop = 0;
    $('dX').focus({ preventScroll: true });
  }
  function closeFac() {
    $('dlg').classList.remove('on');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function dialog() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fac]');
      if (b) { openFac(b.getAttribute('data-fac')); }
    });
    $('dX').addEventListener('click', closeFac);
    $('dlg').addEventListener('click', function (e) { if (e.target === $('dlg')) closeFac(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if ($('dlg').classList.contains('on')) closeFac();
        if ($('sheet').classList.contains('on')) $('sheetX').click();
      }
    });
  }

  function news() {
    var N = B.news || [];
    $('newsMore').href = B.newsUrl;
    var lead = N[0];
    var rest = N.slice(1, 5);
    $('newsBox').innerHTML = (lead ? '<a class="lead-n" href="' + esc(B.newsUrl) + '" target="_blank" rel="noopener"><img src="img/news-1.jpg" alt=""><time>' + esc(lead.date.replace(/-/g, '.')) + '</time><h3>' + esc(lead.title) + '</h3></a>' : '') +
      '<ul>' + rest.map(function (n, i) { return '<li class="li"><a href="' + esc(B.newsUrl) + '" target="_blank" rel="noopener"><img src="img/news-' + (i + 2) + '.jpg" alt=""><div><time>' + esc(n.date.replace(/-/g, '.')) + '</time><h4>' + esc(n.title) + '</h4></div></a></li>'; }).join('') + '</ul>';
  }

  function links() {
    var groups = [];
    (B.systems || []).forEach(function (s) {
      var g = null;
      for (var i = 0; i < groups.length; i++) if (groups[i].n === s.group) g = groups[i];
      if (!g) { g = { n: s.group, items: [] }; groups.push(g); }
      g.items.push(s);
    });
    $('sys').innerHTML = groups.map(function (g) { return '<div><h3>' + esc(g.n) + '</h3>' + g.items.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>'; }).join('') + '</div>'; }).join('');
    $('addr').innerHTML = esc(B.address) + '<br>대표전화 ' + esc(B.phone);
  }

  function header() {
    var hd = $('hd'), last = window.scrollY, busy = false;
    window.addEventListener('scroll', function () {
      if (busy) return;
      busy = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > last + 4 && y > 140 && !hd.classList.contains('open')) hd.classList.add('up');
        else if (y < last - 4) hd.classList.remove('up');
        hd.classList.toggle('solid', y > 8);
        last = y;
        busy = false;
      });
    }, { passive: true });
    window.__recStart = function () {
      document.querySelectorAll('.road,.track').forEach(function (e) { e.getAnimations().forEach(function (a) { a.currentTime = 0; }); });
    };
  }

  menu(); street(); notices(); boards(); nums(); biz(); places(); dialog(); news(); links(); header();
})();
