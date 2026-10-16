(function () {
  'use strict';

  var projects = [
    { id: 'candle-holders', file: 'candle-holders.svg', title: 'Candle holders', alt: 'Three metallic candle holders in bronze and blue holding tall candles' },
    { id: 'sofa', file: 'sofa.svg', title: 'Sofa', alt: 'Soft grey sofa with loose cushions on an oak base' },
    { id: 'bowl', file: 'bowl.svg', title: 'Bowl', alt: 'White porcelain bowl on a pale background' },
    { id: 'rug-sneakers', file: 'rug-sneakers.svg', title: 'Rug', alt: 'Black canvas sneakers on a brown patterned rug' },
    { id: 'pendant-lamp', file: 'pendant-lamp.svg', title: 'Pendant lamp', alt: 'Dark pendant lamp with a warm light' },
    { id: 'oak-stool', file: 'oak-stool.svg', title: 'Stool', alt: 'Three-legged oak stool' },
    { id: 'ceramic-vases', file: 'ceramic-vases.svg', title: 'Vases', alt: 'Three ceramic vases in white and green' },
    { id: 'wall-shelf', file: 'wall-shelf.svg', title: 'Shelf', alt: 'Oak wall shelf with books, a vase and a plant' }
  ];

  // Each project's image is assets/images/<file>. To use a real photo, put it in
  // assets/images/ and change that project's `file` above, e.g. 'sofa.jpg'.
  function img(p) { return 'assets/images/' + p.file; }

  // Optional: give a project a `url` (a full https image link) and it will be used first.
  // If that link fails to load, the local file above is shown instead, so nothing looks broken.
  function useImage(el, p) {
    var local = img(p);
    el.onerror = function () { el.onerror = null; el.src = local; };
    el.src = p.url || local;
  }

  var grid = document.getElementById('work-grid');
  var viewer = document.getElementById('viewer');
  var els = {
    image: document.getElementById('viewer-image'),
    title: document.getElementById('viewer-title'),
    count: document.getElementById('viewer-count'),
    prev: document.getElementById('viewer-prev'),
    next: document.getElementById('viewer-next'),
    close: document.getElementById('viewer-close')
  };
  var index = 0;
  var lastTrigger = null;

  projects.forEach(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'work-item';
    b.setAttribute('data-index', i);
    b.setAttribute('aria-label', 'View ' + p.title);
    var im = document.createElement('img');
    useImage(im, p);
    im.alt = p.alt;
    im.width = 865;
    im.height = 435;
    if (i > 1) im.loading = 'lazy';
    b.appendChild(im);
    grid.appendChild(b);
  });

  function show(i) {
    index = (i + projects.length) % projects.length;
    var p = projects[index];
    useImage(els.image, p);
    els.image.alt = p.alt;
    els.title.textContent = p.title;
    els.count.textContent = (index + 1) + ' / ' + projects.length;
  }

  grid.addEventListener('click', function (e) {
    var t = e.target.closest('.work-item');
    if (!t) return;
    lastTrigger = t;
    show(parseInt(t.getAttribute('data-index'), 10));
    if (typeof viewer.showModal === 'function') viewer.showModal(); else viewer.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  });

  function closeViewer() {
    if (typeof viewer.close === 'function') viewer.close(); else viewer.removeAttribute('open');
  }
  els.close.addEventListener('click', closeViewer);
  els.prev.addEventListener('click', function () { show(index - 1); });
  els.next.addEventListener('click', function () { show(index + 1); });
  viewer.addEventListener('close', function () {
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  });
  viewer.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
