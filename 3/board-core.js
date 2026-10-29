(function () {
  var G = window.GW, I = window.GWI;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var RANK = { open: 0, unknown: 1, always: 2 };
  var SECTORS = ['반도체', '바이오', '디지털헬스·의료기기', '수소·에너지', '모빌리티', 'ICT·데이터', '정보보호'];

  function sortKey(a, b) {
    var sa = G.status(a), sb = G.status(b);
    if (RANK[sa] !== RANK[sb]) return RANK[sa] - RANK[sb];
    if (sa === 'open') return G.dday(a) - G.dday(b);
    return (b.posted || '').localeCompare(a.posted || '');
  }
  function live() { return G.live().filter(function (n) { return RANK[G.status(n)] != null; }).sort(sortKey); }
  function list(q) {
    q = q || {};
    var L = live();
    if (q.s) L = L.filter(function (n) { return G.sectorOK(n, q.s); });
    if (q.w) {
      var w = q.w.trim().toLowerCase();
      if (w) L = L.filter(function (n) {
        return [n.title, n.short, n.target, n.benefit, n.dept].concat(n.sectors || [], n.types || [], n.regions || []).some(function (x) { return String(x || '').toLowerCase().indexOf(w) > -1; });
      });
    }
    return L;
  }
  function flapOf(n) {
    var st = G.status(n), d = G.dday(n);
    if (st === 'always') return { cells: ['상', '시'], unit: '', cls: 'always', label: '상시 모집' };
    if (st === 'unknown') return { cells: ['확', '인'], unit: '', cls: 'unknown', label: '마감일은 공고문 확인' };
    if (d === 0) return { cells: ['오', '늘'], unit: '', cls: 'urgent', label: '오늘 마감' };
    var t = d > 99 ? '99' : String(d);
    if (t.length < 2) t = ' ' + t;
    return { cells: t.split(''), unit: '일', cls: d <= 3 ? 'urgent' : 'open', label: '마감까지 ' + d + '일' };
  }
  function endText(n) {
    var st = G.status(n);
    if (st === 'always') return '상시 접수';
    if (st === 'unknown') return '공고문 확인';
    return G.fmtShort(n.apply_end) + '(' + G.weekday(n.apply_end) + ')' + (n.apply_end_time ? ' ' + n.apply_end_time : '') + '까지';
  }
  var pickedSector = '';
  function mainSector(n) {
    var all = n.sectors || [];
    var s = all.filter(function (x) { return x !== '전 분야'; });
    if (pickedSector && s.indexOf(pickedSector) < 0 && all.indexOf('전 분야') > -1) return '전 분야';
    return s.length ? s[0] : '전 분야';
  }
  function regionText(n) {
    var r = (n.regions || []).filter(function (x) { return x !== '도외 가능'; });
    if (!r.length) return '';
    return r.join(', ').replace('도내 전체', '강원 전체');
  }
  function cellHTML(c, show) {
    return '<span class="fc' + (c === ' ' ? ' blank' : '') + '"><span class="ft"><i>' + show + '</i></span><span class="fb"><i>' + show + '</i></span></span>';
  }
  function flapHTML(f, blank) {
    return '<span class="flap ' + f.cls + '" role="img" aria-label="' + f.label + '">' + f.cells.map(function (c) { return cellHTML(c, blank ? ' ' : c); }).join('') + '</span>' + (f.unit ? '<span class="unit" aria-hidden="true">' + f.unit + '</span>' : '');
  }
  function rowHTML(n, blank) {
    var f = flapOf(n), sec = mainSector(n), reg = regionText(n);
    return '<a class="row ' + f.cls + '" href="' + n.url + '" target="_blank" rel="noopener" data-idx="' + n.idx + '">' +
      '<span class="r-left">' + flapHTML(f, blank) + '</span>' +
      '<span class="r-main"><b class="r-short">' + G.esc(n.short) + '</b><span class="r-title">' + G.esc(n.title) + '</span></span>' +
      '<span class="r-sec">' + I.icon(sec) + '<span>' + sec + (reg ? '<em>' + reg + '</em>' : '') + '</span></span>' +
      '<span class="r-end">' + endText(n) + '</span></a>';
  }
  var DIG = '0123456789';
  function flipCell(cell, to, delay, hops) {
    var ft = cell.querySelector('.ft i'), fb = cell.querySelector('.fb i');
    var from = fb.textContent;
    if (reduce) { ft.textContent = to; fb.textContent = to; return 0; }
    var seq = [];
    var isDigit = DIG.indexOf(to) > -1;
    for (var h = 0; h < hops; h++) seq.push(isDigit ? DIG[(DIG.indexOf(to) + 7 + h * 3) % 10] : to);
    seq.push(to);
    var t = delay, prev = from;
    seq.forEach(function (ch) {
      step(cell, prev, ch, t);
      prev = ch;
      t += 150;
    });
    return t;
  }
  function leaf(cls, ch) { var s = document.createElement('span'); s.className = cls; s.innerHTML = '<i>' + ch + '</i>'; return s; }
  function step(cell, a, b, delay) {
    var nt = leaf('ft nt', b), lt = leaf('lt', a), lb = leaf('lb', b);
    cell.appendChild(nt); cell.appendChild(lt); cell.appendChild(lb);
    var show = [{ visibility: 'hidden' }, { visibility: 'visible' }];
    nt.animate(show, { duration: 1, delay: delay, fill: 'both' });
    lt.animate(show, { duration: 1, delay: delay, fill: 'both' });
    lt.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }], { duration: 75, delay: delay, easing: 'cubic-bezier(.5,0,1,1)', fill: 'both' });
    var a2 = lb.animate([{ transform: 'rotateX(90deg)' }, { transform: 'rotateX(0deg)' }], { duration: 75, delay: delay + 75, easing: 'cubic-bezier(0,0,.3,1)', fill: 'both' });
    a2.onfinish = function () {
      var ft = cell.querySelector('.ft:not(.nt) i'), fb = cell.querySelector('.fb i');
      if (ft) ft.textContent = b;
      if (fb) fb.textContent = b;
      nt.remove(); lt.remove(); lb.remove();
    };
  }
  function animateRows(box, rows) {
    var els = box.querySelectorAll('.row');
    var end = 0;
    els.forEach(function (el, i) {
      var n = rows[i]; if (!n) return;
      var f = flapOf(n);
      var cells = el.querySelectorAll('.fc');
      cells.forEach(function (c, k) {
        var e = flipCell(c, f.cells[k], i * 55 + k * 40, f.cells[k] === ' ' ? 0 : (i < 6 ? 2 : 1));
        if (e > end) end = e;
      });
      if (!reduce) {
        var m = el.querySelector('.r-main');
        m.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 260, delay: i * 55, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'both' });
      }
    });
    return end;
  }
  function fitText(el) {
    var full = el.getAttribute('data-full');
    if (full == null) { full = el.textContent; el.setAttribute('data-full', full); }
    el.textContent = full;
    if (el.scrollWidth <= el.clientWidth + 1) return;
    var lo = 0, hi = full.length;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; el.textContent = full.slice(0, mid).replace(/\s+$/, '') + '…'; if (el.scrollWidth <= el.clientWidth + 1) lo = mid; else hi = mid - 1; }
    el.textContent = full.slice(0, lo).replace(/\s+$/, '') + '…';
    el.title = full;
  }
  function fitAll(box) { box.querySelectorAll('.r-title').forEach(fitText); }
  var fitTimer;
  window.addEventListener('resize', function () { clearTimeout(fitTimer); fitTimer = setTimeout(function () { document.querySelectorAll('.rows,#board').forEach(fitAll); }, 120); });
  function counts() {
    var c = { open: 0, always: 0, unknown: 0 };
    live().forEach(function (n) { c[G.status(n)]++; });
    return c;
  }
  function chipsHTML(active, opts) {
    opts = opts || {};
    var all = live();
    var items = [{ s: '', name: '전체', n: all.length }].concat(SECTORS.map(function (s) { return { s: s, name: s, n: all.filter(function (x) { return G.sectorOK(x, s); }).length }; }));
    return items.map(function (it) {
      return '<button type="button" class="chip' + (it.s === active ? ' on' : '') + '" data-s="' + it.s + '" aria-pressed="' + (it.s === active) + '">' + (opts.noIcon ? '' : I.icon(it.s || '전 분야')) + '<span>' + (opts.short ? it.name.replace('디지털헬스·의료기기', '디지털헬스').replace('수소·에너지', '수소') : it.name) + '</span><b>' + it.n + '</b></button>';
    }).join('');
  }
  function mount(o) {
    var state = { s: '', w: '' };
    function draw(anim) {
      pickedSector = state.s;
      var rows = list(state);
      if (o.max) rows = rows.slice(0, o.max);
      o.board.innerHTML = rows.length ? rows.map(function (n) { return rowHTML(n, anim && !reduce); }).join('') : '<p class="empty">접수 중인 공고 중에는 ‘' + G.esc(state.w || state.s) + '’에 맞는 것이 없습니다. <a href="https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01b&keyvalue=sub01" target="_blank" rel="noopener">지난 공고까지 보기</a></p>';
      if (o.count) o.count.textContent = rows.length + '건';
      fitAll(o.board);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitAll(o.board); });
      if (anim) return animateRows(o.board, rows);
      return 0;
    }
    function setChips() { if (o.chips) o.chips.innerHTML = chipsHTML(state.s, o.chipOpts); }
    setChips();
    if (o.chips) o.chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.s = b.getAttribute('data-s'); setChips(); draw(true);
    });
    if (o.search) {
      var tm;
      o.search.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { state.w = o.search.value; draw(true); }, 120); });
      var f = o.search.closest('form'); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); state.w = o.search.value; draw(true); });
    }
    var api = { draw: draw, pick: function (s) { state.s = s; setChips(); return draw(true); }, state: state };
    draw(!o.still);
    return api;
  }
  window.GB = { fitAll: fitAll, live: live, list: list, counts: counts, flapOf: flapOf, endText: endText, mainSector: mainSector, rowHTML: rowHTML, chipsHTML: chipsHTML, mount: mount, SECTORS: SECTORS, reduce: reduce };
})();
