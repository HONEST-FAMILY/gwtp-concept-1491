(function () {
  var G = window.GW;
  var LIST = 'https://www.gwtp.or.kr/gwtp/bbsNew_list.php?code=sub01b&keyvalue=sub01';
  function meta(n) {
    var parts = [];
    if (n.sectors && n.sectors.length) parts.push(n.sectors.filter(function (s) { return s !== '전 분야'; }).join(', ') || '전 분야');
    if (n.dept) parts.push(n.dept);
    return parts.join(', ');
  }
  function render(el, max) {
    var items = G.live().sort(G.byDeadline).slice(0, max || 4);
    el.innerHTML = items.map(function (n) {
      var b = G.badge(n);
      var due = n.apply_end ? G.fmtShort(n.apply_end) + '(' + G.weekday(n.apply_end) + ') 마감' : (n.apply_note || '연중 상시');
      return '<a class="nt" href="' + G.esc(n.url || LIST) + '" target="_blank" rel="noopener">' +
        '<span class="nt-d ' + b.cls + '">' + G.esc(b.text) + '</span>' +
        '<span class="nt-t">' + G.esc(n.short || n.title) + '</span>' +
        '<span class="nt-m">' + G.esc(due) + '</span></a>';
    }).join('');
    var cnt = document.querySelector('[data-open-count]');
    if (cnt) cnt.textContent = G.live().filter(function (n) { return G.status(n) !== 'unknown'; }).length;
  }
  window.GW1 = { render: render, LIST: LIST };
  document.querySelectorAll('[data-notices]').forEach(function (el) { render(el, +el.getAttribute('data-notices') || 4); });
})();
