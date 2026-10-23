(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // Footer year
  $("#year").textContent = new Date().getFullYear();

  // Theme toggle
  var themeBtn = $("#themeToggle");
  function syncTheme() {
    var dark = root.dataset.theme === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  themeBtn.addEventListener("click", function () {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store("soniq-theme", root.dataset.theme);
    syncTheme();
  });
  syncTheme();

  // Mobile menu
  var menuBtn = $("#menuToggle"), nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Image fallback (inline SVG, works offline)
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b7cff"/><stop offset="1" stop-color="#5ee0c1"/></linearGradient></defs><rect width="400" height="400" fill="#171b33"/><path d="M90 250v-50a110 110 0 0 1 220 0v50" fill="none" stroke="url(#g)" stroke-width="18" stroke-linecap="round"/><rect x="70" y="230" width="60" height="100" rx="26" fill="url(#g)"/><rect x="270" y="230" width="60" height="100" rx="26" fill="url(#g)"/></svg>';
  var fallback = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  $$("img[data-fallback]").forEach(function (img) {
    function swap() { if (img.src !== fallback) { img.src = fallback; img.alt = "SONIQ Aura One headphones illustration"; } }
    img.addEventListener("error", swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });

  // Pricing toggle
  var segs = $$(".seg"), nums = $$(".num"), pers = $$(".per");
  segs.forEach(function (b) {
    b.addEventListener("click", function () {
      var yearly = b.dataset.billing === "yearly";
      segs.forEach(function (s) {
        var on = s === b;
        s.classList.toggle("active", on);
        s.setAttribute("aria-pressed", String(on));
      });
      nums.forEach(function (n) { n.textContent = yearly ? n.dataset.yearly : n.dataset.monthly; });
      pers.forEach(function (p) { p.textContent = yearly ? "/year" : "/month"; });
    });
  });
  $$(".choose").forEach(function (b) {
    b.addEventListener("click", function () {
      var yearly = $(".seg.active").dataset.billing === "yearly";
      $("#planMsg").textContent = "SONIQ Care " + b.dataset.plan + " (" + (yearly ? "yearly" : "monthly") + ") added to your order.";
    });
  });

  // FAQ accordion
  $$(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!open));
      $("#" + q.getAttribute("aria-controls")).hidden = open;
    });
  });

  // Testimonials slider
  var track = $("#track"), slides = $$(".slide", track), idx = 0;
  function show(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = "translateX(-" + idx * 100 + "%)";
    slides.forEach(function (s, n) { s.setAttribute("aria-hidden", String(n !== idx)); });
    $("#count").textContent = (idx + 1) + " / " + slides.length;
  }
  $("#prev").addEventListener("click", function () { show(idx - 1); });
  $("#next").addEventListener("click", function () { show(idx + 1); });
  $(".slider").addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  show(0);

  // Scroll reveal
  var items = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
