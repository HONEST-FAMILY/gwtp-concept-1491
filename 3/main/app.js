(function () {
  var MENU=[["공고안내", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01a&keyvalue=sub01", [["공지사항", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01a&keyvalue=sub01"], ["모집공고", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01b&keyvalue=sub01"], ["계약공고", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01c&keyvalue=sub01"], ["채용공고", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01d&keyvalue=sub01"], ["타기관소식", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01g&keyvalue=sub01"]]], ["사업안내", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub02a&keyvalue=sub02", [["지역사업안내", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub02a&keyvalue=sub02"], ["부서별사업안내", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub02b&keyvalue=sub02"], ["장비지원", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub02c&keyvalue=sub02"]]], ["입주안내", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub04a&keyvalue=sub04", [["입주안내", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub04a&keyvalue=sub04"], ["입주기업소개", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub04b&keyvalue=sub04"], ["시설현황", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub04c&keyvalue=sub04"]]], ["경영공시", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05a&keyvalue=sub05", [["운영계획 및 결과", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05b&keyvalue=sub05"], ["재무정보", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05a&keyvalue=sub05"], ["임직원현황", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05c&keyvalue=sub05"], ["강원TP규정", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05f&keyvalue=sub05"], ["회의록", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05d&keyvalue=sub05"], ["감사결과", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05e&keyvalue=sub05"], ["기부금 모금 및 실적", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub05g&keyvalue=sub05"]]], ["TP NOW", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub06a&keyvalue=sub06", [["언론보도", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub06b&keyvalue=sub06"], ["홍보자료", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub06c&keyvalue=sub06"], ["지역정보", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub06d&keyvalue=sub06"], ["뉴스레터", "https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub06g&keyvalue=sub06"], ["뉴스레터신청", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub06h&keyvalue=sub06"]]], ["TP소개", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07a&keyvalue=sub07", [["일반현황", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07a&keyvalue=sub07"], ["연혁", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07d&keyvalue=sub07"], ["인사말", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07b&keyvalue=sub07"], ["비전 및 목표", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07c&keyvalue=sub07"], ["조직안내", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07e&keyvalue=sub07"], ["ESG경영", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07f&keyvalue=sub07"], ["찾아오시는 길", "https://www.gwtp.or.kr/gwtp/pageview.php?url=sub07g&keyvalue=sub07"]]]];
  var G = window.GW, I = window.GWI, B = window.GW_BASE, H = window.GW_HOME, F = window.GW_FACILITIES;
  var STILL = /[?&]still=1/.test(location.search);
  var $ = function (id) { return document.getElementById(id); };
  var esc = G.esc;

  $('menu').innerHTML = MENU.map(function (m, i) {
    return '<a href="' + m[1] + '" data-i="' + i + '">' + m[0] + '</a><div class="msub" hidden>' + m[2].map(function (c) { return '<a href="' + c[1] + '">' + c[0] + '</a>'; }).join('') + '</div>';
  }).join('');
  $('megain').innerHTML = MENU.map(function (m) {
    return '<div><h3>' + m[0] + '</h3>' + m[2].map(function (c) { return '<a href="' + c[1] + '">' + c[0] + '</a>'; }).join('') + '</div>';
  }).join('');
  $('ftmap').innerHTML = $('megain').innerHTML;

  var c = GB.counts(), t = G.today;
  $('date').textContent = (t.getMonth() + 1) + '월 ' + t.getDate() + '일 기준';
  $('count').innerHTML = '접수 중 <b>' + c.open + '건</b>, 상시 모집 <b>' + c.always + '건</b><br>마감일은 공고문 확인 <b>' + c.unknown + '건</b>';
  var q = '<a href="https://www.gwtp.or.kr/gwtp/pageview.php?url=sub04c&keyvalue=sub04">' + I.icon('입주 공간') + '<span>입주 공간</span><b>6개 시군 15곳</b></a>' +
    '<a href="' + H.eqnet.url + '">' + I.icon('공동 장비') + '<span>공동 장비</span><b>1,143점</b></a>' +
    '<a href="tel:033-248-5600">' + I.icon('전화') + '<span>대표전화</span><b>033-248-5600</b></a>';
  $('quick').innerHTML = q;
  $('quickm').innerHTML = q;

  var all = GB.live(), tiles = $('tiles'), cur = '';
  var api = GB.mount({ board: $('board'), search: $('q'), still: STILL });
  function drawTiles() {
    var items = [{ s: '', n: '전체' }].concat(GB.SECTORS.map(function (s) { return { s: s, n: s.replace('디지털헬스·의료기기', '디지털헬스').replace('수소·에너지', '수소') }; }));
    tiles.innerHTML = items.map(function (it) {
      var k = it.s ? all.filter(function (x) { return G.sectorOK(x, it.s); }).length : all.length;
      return '<button type="button" class="tile' + (it.s === cur ? ' on' : '') + '" data-s="' + it.s + '" aria-pressed="' + (it.s === cur) + '" aria-label="' + it.n + ' ' + k + '건"><span class="sq">' + I.icon(it.s || '전 분야') + '</span><span>' + it.n + '<b>' + k + '</b></span></button>';
    }).join('');
  }
  drawTiles();
  function pick(s) { cur = s; drawTiles(); api.pick(cur); }
  tiles.addEventListener('click', function (e) { var b = e.target.closest('.tile'); if (b) pick(b.getAttribute('data-s')); });
  $('qf').addEventListener('submit', function (e) { e.preventDefault(); });

  var TABS = [['notice', '공지사항'], ['recruit', '모집공고'], ['bid', '계약공고'], ['jobs', '채용공고']];
  var tab = 'recruit';
  function dot(d) { var p = d.split('-'); return p[0] + '.' + p[1] + '.' + p[2]; }
  function drawTabs(anim) {
    $('tabs').innerHTML = TABS.map(function (x) { return '<button type="button" role="tab" class="tab' + (x[0] === tab ? ' on' : '') + '" data-k="' + x[0] + '" aria-selected="' + (x[0] === tab) + '">' + x[1] + '</button>'; }).join('');
    var L = $('bbslist');
    L.innerHTML = (H[tab] || []).map(function (n) {
      var title = n.title.replace(/\s*\.\.$/, '…');
      return '<a href="' + esc(n.url) + '" target="_blank" rel="noopener"><span class="b-d">' + dot(n.date) + '</span><span class="b-t">' + esc(title) + '</span>' + (n.badge ? '<span class="b-b">' + esc(n.badge) + '</span>' : '<span></span>') + '</a>';
    }).join('');
    $('bbsall').href = H.boards[tab];
    if (anim) { L.classList.remove('swap'); void L.offsetWidth; L.classList.add('swap'); }
  }
  drawTabs(false);
  $('tabs').addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (!b) return; tab = b.getAttribute('data-k'); drawTabs(true); });

  function flapNum(str) {
    return '<span class="flap n" aria-hidden="true">' + str.split('').map(function (ch) {
      if (ch === ',') return '</span><span class="sep" aria-hidden="true">,</span><span class="flap n" aria-hidden="true">';
      return '<span class="fc"><span class="ft"><i>' + ch + '</i></span><span class="fb"><i>' + ch + '</i></span></span>';
    }).join('') + '</span>';
  }
  var NUMS = [
    { n: '15', k: '입주 시설', v: '춘천, 강릉, 원주, 삼척, 태백, 홍천' },
    { n: '6', k: '시군', v: '6개 시군에 거점' },
    { n: String(c.open), k: '접수 중 공고', v: '상시 모집 ' + c.always + '건은 따로' },
    { n: '1,143', k: '공동활용 장비', v: '29개 기관, 10월 28일 기준' },
    { n: '2003', k: '설립', v: '2003년 12월 22일' }
  ];
  $('nums').innerHTML = NUMS.map(function (x) {
    return '<li aria-label="' + x.k + ' ' + x.n + '">' + flapNum(x.n) + '<span class="k">' + x.k + '</span><span class="v">' + x.v + '</span></li>';
  }).join('');

  var BIZ = [
    { name: '반도체', s: '반도체', ev: '강릉에서 반도체 부재용 대형 세라믹 제품 제조를 지원하고, 원주 권역은 반도체 특화입니다.' },
    { name: '바이오', s: '바이오', ev: '춘천 바이오 특화와 천연물소재 전주기 표준화 허브, 홍천 항체의약품소재 특화.' },
    { name: '디지털헬스', s: '디지털헬스·의료기기', ev: '원주 디지털헬스케어 특화 — 의료기기 기업의 실증과 사업화.' },
    { name: '수소', s: '수소·에너지', ev: '삼척 액화수소 특화 — 액화수소 저장·운송 클러스터.' },
    { name: '모빌리티', s: '모빌리티', ev: '미래차 전주기 실증, 완전정밀분해 기반 미래차 부품 재제조 지원(10월 27일 보도).' },
    { name: 'AI', s: 'ICT·데이터', ev: '소양강댐 냉수를 자원으로 한 K-클라우드파크, 지역 산업의 AI 대전환.' }
  ];
  function specific(s) { return all.filter(function (n) { return (n.sectors || []).indexOf(s) > -1; }).length; }
  $('bizrows').innerHTML = BIZ.map(function (b) {
    var k = specific(b.s);
    var go = k ? '<button type="button" class="b-go" data-s="' + b.s + '">' + flapNum(String(k)) + '<span>건 공고 보기</span></button>' : '<span class="b-go zero">지금 열린 공고 없음</span>';
    return '<div class="biz-row"><span class="b-ic">' + I.icon(b.s) + '</span><h3 class="b-name">' + b.name + '</h3><p class="b-ev">' + b.ev + '</p>' + go + '</div>';
  }).join('');

  var CITIES = ['춘천시', '강릉시', '원주시', '삼척시', '태백시', '홍천군'];
  var city = '춘천시';
  function drawCities() {
    $('cities').innerHTML = CITIES.map(function (cn) {
      var k = F.filter(function (f) { return f.city === cn; }).length;
      return '<button type="button" role="tab" class="city' + (cn === city ? ' on' : '') + '" data-c="' + cn + '" aria-selected="' + (cn === city) + '">' + cn.replace(/[시군]$/, '') + '<b>' + k + '</b></button>';
    }).join('');
  }
  function facImg(f) { return 'img/f-' + (f.img || 'taebaek') + '.jpg'; }
  function drawFac(anim) {
    var L = $('facrows');
    L.innerHTML = F.filter(function (f) { return f.city === city; }).map(function (f, i) {
      var floors = (f.floors || []).length ? '<ul>' + f.floors.map(function (x) { return '<li><b>' + esc(x.level) + '</b><span>' + esc(x.use.replace(/\s*,\s*/g, ', ')) + '</span></li>'; }).join('') + '</ul>' : '<ul><li><b>규모</b><span>' + esc(f.scaleRaw || f.scale) + '</span></li></ul>';
      var extra = [];
      if (f.facility) extra.push('<b>기타 시설</b> ' + esc(f.facility));
      if (f.lift) extra.push('<b>승강 시설</b> ' + esc(f.lift));
      var area = esc((f.area || '').replace(/\s*·\s*/g, ', '));
      var scale = f.city === '홍천군' ? '' : esc((f.scaleRaw || '').replace(/\s*·\s*/g, ', '));
      return '<div class="f-row" id="f' + i + '"><button type="button" class="f-head" aria-expanded="false" aria-controls="ff' + i + '">' +
        '<img class="f-img" src="' + facImg(f) + '" alt="' + esc(f.name) + '" width="240" height="180">' +
        '<span><span class="f-name">' + esc(f.name) + '</span><span class="f-addr">' + esc(f.addr) + '</span><span class="f-use">' + esc((f.use || '').replace(/\s*·\s*/g, ', ')) + '</span></span>' +
        '<span class="f-area">' + area + (scale ? '<br>' + scale : '') + '</span>' +
        '<span class="f-tog">층별 구성 보기</span></button>' +
        '<div class="f-floors" id="ff' + i + '">' + floors + extra.map(function (x) { return '<p class="f-extra">' + x + '</p>'; }).join('') + '</div></div>';
    }).join('');
    if (anim) { L.classList.remove('swap'); void L.offsetWidth; L.classList.add('swap'); }
  }
  drawCities();
  drawFac(false);
  $('cities').addEventListener('click', function (e) { var b = e.target.closest('.city'); if (!b) return; city = b.getAttribute('data-c'); drawCities(); drawFac(true); });
  $('facrows').addEventListener('click', function (e) {
    var h = e.target.closest('.f-head'); if (!h) return;
    var row = h.parentNode, open = !row.classList.contains('open');
    row.classList.toggle('open', open);
    h.setAttribute('aria-expanded', open);
    h.querySelector('.f-tog').textContent = open ? '층별 구성 닫기' : '층별 구성 보기';
  });

  var N = B.news || [];
  $('newsall').href = B.newsUrl;
  if (N.length) {
    var first = N[0];
    $('newsgrid').innerHTML = '<a class="n-big" href="' + B.newsUrl + '" target="_blank" rel="noopener"><span class="n-pic"><img src="img/n-1.jpg" alt="" width="1200" height="750"></span><span class="n-d">' + dot(first.date) + '</span><span class="n-t">' + esc(first.title) + '</span></a>' +
      '<div class="n-list">' + N.slice(1, 5).map(function (n, i) {
        return '<a class="n-item" href="' + B.newsUrl + '" target="_blank" rel="noopener"><span class="n-pic"><img src="img/n-' + (i + 2) + '-s.jpg" alt="" width="168" height="126"></span><span><span class="n-d">' + dot(n.date) + '</span><span class="n-t">' + esc(n.title) + '</span></span></a>';
      }).join('') + '</div>';
  }

  $('sys').innerHTML = (B.systems || []).map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '<span>' + esc(s.group) + '</span></a>'; }).join('');
  $('addr').textContent = B.address;
  $('ftaddr').textContent = B.address;

  var mb = $('mbtn'), mn = $('menu');
  mb.addEventListener('click', function () {
    var o = mn.classList.toggle('open');
    mb.setAttribute('aria-expanded', o);
    mn.querySelectorAll('.msub').forEach(function (s) { s.hidden = !o; });
  });

  window.__main = { pick: pick, api: api };
  var reduce = GB.reduce;
  var hd = $('hd'), lastY = window.scrollY, ticking = false;
  document.body.classList.add('hd-on');
  function onScroll() {
    var y = window.scrollY;
    if (y > 120 && y > lastY + 4) { hd.classList.add('up'); document.body.classList.remove('hd-on'); closeMega(); }
    else if (y < lastY - 4 || y <= 120) { hd.classList.remove('up'); document.body.classList.add('hd-on'); }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  var mega = $('mega'), menuEl = $('menu'), megaTimer;
  function openMega() { if (window.innerWidth <= 720) return; clearTimeout(megaTimer); mega.classList.add('open'); mega.setAttribute('aria-hidden', 'false'); }
  function closeMega() { clearTimeout(megaTimer); mega.classList.remove('open'); mega.setAttribute('aria-hidden', 'true'); }
  menuEl.addEventListener('mouseenter', openMega);
  menuEl.addEventListener('focusin', openMega);
  hd.addEventListener('mouseleave', function () { megaTimer = setTimeout(closeMega, 120); });
  mega.addEventListener('mouseenter', function () { clearTimeout(megaTimer); });
  hd.addEventListener('focusout', function (e) { if (!hd.contains(e.relatedTarget)) closeMega(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMega(); });

  function leaf(cls, ch) { var s = document.createElement('span'); s.className = cls; s.innerHTML = '<i>' + ch + '</i>'; return s; }
  function hop(cell, a, b, delay) {
    var nt = leaf('ft nt', b), lt = leaf('lt', a), lb = leaf('lb', b);
    cell.appendChild(nt); cell.appendChild(lt); cell.appendChild(lb);
    var show = [{ visibility: 'hidden' }, { visibility: 'visible' }];
    nt.animate(show, { duration: 1, delay: delay, fill: 'both' });
    lt.animate(show, { duration: 1, delay: delay, fill: 'both' });
    lt.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }], { duration: 75, delay: delay, easing: 'cubic-bezier(.5,0,1,1)', fill: 'both' });
    var a2 = lb.animate([{ transform: 'rotateX(90deg)' }, { transform: 'rotateX(0deg)' }], { duration: 75, delay: delay + 75, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
    a2.onfinish = function () { nt.remove(); lt.remove(); lb.remove(); };
  }
  var DIG = '0123456789';
  function reflip(box) {
    box.querySelectorAll('.fc').forEach(function (cell, k) {
      var to = cell.querySelector('.fb i').textContent;
      if (DIG.indexOf(to) < 0) return;
      var a = DIG[(+to + 6) % 10];
      var d = k * 25;
      hop(cell, to, a, d);
      hop(cell, a, to, d + 150);
    });
  }
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { reflip(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    io.observe($('nums'));
  }

  $('bizrows').addEventListener('click', function (e) {
    var b = e.target.closest('.b-go[data-s]'); if (!b) return;
    var s = b.getAttribute('data-s');
    var top = $('notices').getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(function () { pick(s); }, reduce ? 0 : 350);
  });
})();
