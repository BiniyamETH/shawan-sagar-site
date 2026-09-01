/* =============================================================================
   Shawan Sagar — interactions & futuristic FX
   Vanilla JS, no dependencies. Enhances the page; site works without it.
   ============================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer  = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Run an init block in isolation: if one feature throws (an element missing on
  // some page, an API an old in-app browser doesn't support), the rest still boot.
  function safe(fn, label) {
    try { fn(); }
    catch (e) { if (window.console) console.error("[" + (label || "init") + "] skipped:", e); }
  }
  // Last-resort net: log anything uncaught instead of dying silently.
  window.addEventListener("error", function (e) {
    if (window.console) console.error("caught:", e.message, "@", (e.filename || "") + ":" + (e.lineno || ""));
  });
  window.addEventListener("unhandledrejection", function (e) {
    if (window.console) console.error("caught (promise):", e.reason);
  });

  /* ---------------------------------------------------------------- year */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------- media from config */
  // isolated in its own try/catch: a hero/media failure must never take the
  // rest of the page's JS (nav, reveal animations, form, FAQ...) down with it
  try { applyMedia(); } catch (e) { if (window.console) console.error("applyMedia failed:", e); }

  function applyMedia() {
    var cfg = window.SITE_MEDIA || {};

    // background photos (hero + enquire section)
    function setBg(id, url) {
      var el = $("#" + id);
      if (!el) return;
      if (url) {
        url = asset(url);
        var probe = new Image();
        probe.onload = function () { el.style.backgroundImage = "url('" + url.replace(/'/g, "%27") + "')"; };
        probe.src = url;
      }
    }
    setBg("enquireBg", cfg.enquireBg);

    // HERO BACKGROUND — a cross-fading slideshow of houses (cfg.heroSlides).
    function buildHeroSlides(list) {
      var wrap = $("#heroSlides");
      if (!wrap || !Array.isArray(list) || !list.length) return false;

      var esc = function (u) { return String(u || "").replace(/'/g, "%27"); };
      var speed = parseFloat(cfg.heroClipSpeed);
      speed = (isFinite(speed) && speed > 0 ? speed : 1.5);   // video playback rate
      var first = list[0];
      var firstUrl = typeof first === "string" ? first : (first && (first.poster || first.image)) || "";
      if (firstUrl) wrap.style.backgroundImage = "url('" + esc(asset(firstUrl)) + "')";

      var slides = [];
      list.forEach(function (item, i) {
        var slide = document.createElement("div");
        slide.className = "hero__slide";
        if (item && item.video) {
          var v = document.createElement("video");
          v.muted = true; v.loop = true; v.playsInline = true;
          v.playbackRate = v.defaultPlaybackRate = speed;
          v.addEventListener("loadedmetadata", function () { try { this.playbackRate = speed; } catch (e) {} });
          var fallBackToPoster = function () {   // clip 404s, CDN blocks it, or a phone can't decode it
            slide.classList.add("is-broken");
            if (item.poster) slide.style.backgroundImage = "url('" + esc(asset(item.poster)) + "')";
          };
          v.addEventListener("error", fallBackToPoster);
          slide._fallback = fallBackToPoster;
          v.preload = i === 0 ? "auto" : "none";
          if (item.poster) v.poster = asset(item.poster);
          slide.dataset.video = item.video;
          slide._video = v;
          if (i === 0) v.src = item.video;
          slide.appendChild(v);
        } else {
          var im = document.createElement("div");
          im.className = "hero__slide-img";
          var u = esc(asset(typeof item === "string" ? item : (item && item.image) || ""));
          if (i === 0) im.style.backgroundImage = "url('" + u + "')";   // only slide 1 loads now
          else slide.dataset.img = u;                                   // the rest load just in time
          slide._img = im;
          slide.appendChild(im);
        }
        wrap.appendChild(slide);
        slides.push(slide);
      });

      var idx = 0;
      var loadImg = function (n) {
        var s = slides[n];
        if (s && s.dataset && s.dataset.img && s._img) {
          s._img.style.backgroundImage = "url('" + s.dataset.img + "')";
          delete s.dataset.img;
        }
      };
      var warm = function (n) {                 // start the next clip buffering ahead of time
        var s = slides[n];
        if (s && s._video && !s._video.getAttribute("src") && s.dataset.video) {
          s._video.preload = "auto";
          s._video.src = s.dataset.video;
        }
      };
      var activate = function (n) {
        var s = slides[n];
        loadImg(n);
        loadImg((n + 1) % slides.length);   // pre-load the next one so the cross-fade is smooth
        warm((n + 1) % slides.length);
        if (s._video) {
          if (!s._video.getAttribute("src") && s.dataset.video) s._video.src = s.dataset.video;
          try { s._video.currentTime = 0; s._video.playbackRate = speed; } catch (e) {}
          var pr = s._video.play(); if (pr && pr.catch) pr.catch(function () {});
          // watchdog: if no frame is ready a few seconds after this slide goes
          // live (a phone that silently fails to decode never fires "error"),
          // drop to the still poster instead of showing an empty dark panel.
          clearTimeout(s._watch);
          s._watch = setTimeout(function () {
            if (s.classList.contains("is-active") && !s.classList.contains("is-broken") &&
                s._video.readyState < 2 && s._fallback) s._fallback();
          }, 7000);
        }
        s.classList.add("is-active");
      };
      activate(0);

      if (slides.length > 1 && !reduceMotion) {
        var secs = parseFloat(cfg.heroSlideSeconds);
        var ms = (isFinite(secs) && secs > 0.25 ? secs : 3) * 1000;
        // heavy cross-fade overlap so quick swaps read as a dissolve, never a hard cut
        var fade = Math.round(Math.min(1600, Math.max(ms * 0.8, 260)));
        // ken-burns zoom always runs long & slow, independent of swap speed — keeps it calm
        var ken = Math.max(ms * 3, 9000);
        wrap.style.setProperty("--slide-ms", ken + "ms");       // ken-burns zoom length
        wrap.style.setProperty("--fade-ms", fade + "ms");       // cross-fade length
        setInterval(function () {
          var cur = slides[idx];
          cur.classList.remove("is-active");
          if (cur._video) cur._video.pause();
          idx = (idx + 1) % slides.length;
          activate(idx);
        }, ms);
      }
      return true;
    }

    if (buildHeroSlides(cfg.heroSlides)) {
      var hbEl = $("#heroBg"); if (hbEl) hbEl.style.display = "none";
      var hvEl = $("#heroVideo"); if (hvEl) hvEl.style.display = "none";
    } else {
      // fallback: single photo (#heroBg) + optional clip list (#heroVideo)
      setBg("heroBg", cfg.heroImage);
      var hv = $("#heroVideo");
      if (hv) {
        var srcs = cfg.heroVideo;
        if (typeof srcs === "string") srcs = srcs ? [srcs] : [];
        if (Array.isArray(srcs) && srcs.length && !reduceMotion) {
          if (cfg.heroImage) hv.poster = asset(cfg.heroImage);
          var vi = 0, vSettled = false;
          var tryNextVideo = function () {
            if (vSettled) return;
            if (vi >= srcs.length) { hv.style.opacity = "0"; return; }
            hv.src = srcs[vi++];
            if (hv.load) hv.load();
            var pp = hv.play(); if (pp && pp.catch) pp.catch(function () {});
          };
          hv.addEventListener("loadeddata", function () { vSettled = true; hv.style.opacity = ""; });
          hv.addEventListener("error", function () { if (!vSettled) tryNextVideo(); });
          var vGuard = setInterval(function () {
            if (vSettled) { clearInterval(vGuard); return; }
            if (hv.readyState === 0) tryNextVideo();
          }, 8000);
          setTimeout(function () { clearInterval(vGuard); }, 45000);
          tryNextVideo();
        } else {
          hv.style.display = "none";
        }
      }
    }

    // listings — the homes Shawan is selling (from js/listings.js, or config fallback)
    var lc = $("#listings");
    var listings = (window.SITE_LISTINGS && window.SITE_LISTINGS.length) ? window.SITE_LISTINGS
                 : (Array.isArray(cfg.listings) ? cfg.listings : []);
    if (lc && listings.length) {
      listings.forEach(function (home, i) {
        var slug = (home.status || "").toLowerCase().replace(/[^a-z]+/g, "-") || "listing";
        var cover = (home.photos && home.photos[0]) || home.image || "";
        var count = (home.photos ? home.photos.length : 0) + (home.video ? 1 : 0);
        var facts = [];
        if (home.beds) facts.push(home.beds + " bd");
        if (home.baths) facts.push(home.baths + " ba");
        if (home.type) facts.push(esc(home.type));

        var card = document.createElement("article");
        card.className = "listing-card";
        card.style.setProperty("--i", i % 6);
        card.setAttribute("data-reveal", "");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", "View " + (home.address || "listing"));
        card.innerHTML =
          '<div class="listing-card__img">' +
            "<picture>" + webpSource(cover) +
              '<img loading="lazy" alt="' + esc(home.address || "") + '" src="' + esc(cover) + '" />' +
            "</picture>" +
            '<span class="listing-card__badge is-' + slug + '">' + esc(home.status || "For sale") + "</span>" +
            (count > 1 ? '<span class="listing-card__count">' + count + " photos</span>" : "") +
          "</div>" +
          '<div class="listing-card__body">' +
            '<span class="listing-card__price">' + esc(home.price || "") + "</span>" +
            '<span class="listing-card__addr">' + esc(home.address || "") + "</span>" +
            '<span class="listing-card__facts">' + facts.join(" · ") + "</span>" +
          "</div>";
        var img = card.querySelector("img");
        if (img) img.addEventListener("error", function () { card.classList.add("is-broken"); });
        card.addEventListener("click", function () { openListing(home); });
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openListing(home); }
        });
        lc.appendChild(card);
      });
      applyTilt($$(".listing-card", lc));
    }
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  }); }

  // For a local ".jpg/.png" asset, the sibling ".webp" <source> markup; "" for
  // remote URLs or non-images. If the .webp isn't there, <picture> ignores it.
  function webpSource(u) {
    if (!u || /^(https?:)?\/\//i.test(u) || /^data:/i.test(u)) return "";
    var w = u.replace(/\.(jpe?g|png)(\?.*)?$/i, ".webp");
    return w === u ? "" : '<source type="image/webp" srcset="' + esc(w) + '" />';
  }

  // Can this browser decode WebP? (used for CSS backgrounds and <video poster>,
  // where <picture>'s automatic fallback isn't available). Computed on first use
  // so source order vs. applyMedia() doesn't matter.
  var _webpOk;
  function webpOk() {
    if (_webpOk === undefined) {
      try { _webpOk = document.createElement("canvas").toDataURL("image/webp").lastIndexOf("data:image/webp", 0) === 0; }
      catch (e) { _webpOk = false; }
    }
    return _webpOk;
  }
  // Swap a local "assets/x.jpg" for its "assets/x.webp" sibling when supported.
  // Pair every local .jpg in config.js / listings.js with a same-name .webp.
  function asset(p) {
    return (webpOk() && /^assets\/[^?]+\.jpg$/i.test(p)) ? p.replace(/\.jpg$/i, ".webp") : p;
  }

  /* ---------------------------------------------------------------- nav */
  var nav = $("#nav"), lastY = window.scrollY, ticking = false;
  function onScroll() {
    var sy = window.scrollY;
    if (nav) {
      nav.classList.toggle("is-scrolled", sy > 20);
      if (sy > lastY && sy > 400 && !document.body.classList.contains("menu-open")) {
        nav.classList.add("is-hidden");
      } else {
        nav.classList.remove("is-hidden");
      }
    }
    lastY = sy;

    if (typeof manualRevealCheck === "function") manualRevealCheck();

    var prog = $("#scrollProgress");
    if (prog) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------- mobile menu */
  var toggle = $("#navToggle"), links = $("#navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("menu-open", open);
    });
    $$("a", links).forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---------------------------------------------------------------- word-split headline */
  $$("[data-reveal-words]").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "word";
      span.style.setProperty("--w", i);
      span.textContent = w;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });

  /* ---------------------------------------------------------------- reveal on scroll */
  // Promote grouped items so each one reveals on its own as you scroll past,
  // instead of the whole block appearing at once.
  ["#listings", ".statgrid", "#areaPills", ".contact__grid", ".faq__list", ".ticklist"].forEach(function (sel) {
    $$(sel).forEach(function (parent) {
      parent.removeAttribute("data-reveal");
      Array.prototype.forEach.call(parent.children, function (child, i) {
        child.setAttribute("data-reveal", "");
        child.style.setProperty("--i", i % 8);
      });
    });
  });
  // steps already carry data-reveal — just give them a stagger index
  $$(".steps .step").forEach(function (el, i) { el.style.setProperty("--i", i % 8); });

  function revealNow(el) {
    if (el.classList.contains("is-visible")) return;
    el.classList.add("is-visible");
    $$("[data-count]", el).forEach(runCount);
    if (el.hasAttribute("data-count")) runCount(el);
  }

  // Manual in-view check — the reliable fallback if IntersectionObserver
  // callbacks are throttled (background tabs, some embedded webviews).
  function manualRevealCheck() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    $$("[data-reveal]:not(.is-visible)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) revealNow(el);
    });
  }

  var revealEls = $$("[data-reveal]");
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    $$("[data-count]").forEach(runCount);
  } else {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { revealNow(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
    // fallback + initial pass (covers the case where IO never fires)
    manualRevealCheck();
    [200, 600, 1500, 3000].forEach(function (t) { setTimeout(manualRevealCheck, t); });
    window.addEventListener("resize", manualRevealCheck, { passive: true });
  }

  /* ---------------------------------------------------------------- counters */
  function runCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var pre = el.getAttribute("data-prefix") || "";
    var suf = el.getAttribute("data-suffix") || "";
    var dur = 1100, start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = pre + Math.round(target * eased) + suf;
      if (t < 1) requestAnimationFrame(tick);
    }
    if (reduceMotion) { el.textContent = pre + target + suf; }
    else requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------- magnetic buttons */
  if (finePointer && !reduceMotion) {
    $$("[data-magnetic]").forEach(function (btn) {
      var strength = 0.35;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------------- tilt cards */
  function applyTilt(list) {
    if (!finePointer || reduceMotion) return;
    list.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.transform =
          "perspective(900px) rotateY(" + (px - 0.5) * 9 + "deg) rotateX(" + (0.5 - py) * 9 + "deg) translateZ(0)";
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }
  applyTilt($$("[data-tilt]"));

  /* ---------------------------------------------------------------- custom cursor */
  safe(function () {
    if (!finePointer || reduceMotion) return;
    var dot = $("#cursorDot"), ring = $("#cursorRing");
    if (!dot || !ring) return;
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    $$("a, button, .listing-card, [data-tilt], summary").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-active"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-active"); });
    });
  }, "cursor");

  /* ---------------------------------------------------------------- particle field */
  (function particles() {
    var cv = $("#fxParticles");
    // skip on phones/tablets and small screens — saves battery, avoids scroll jank
    if (reduceMotion || !finePointer || window.innerWidth < 760) {
      if (cv) cv.style.display = "none";
      return;
    }
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w, h, pts = [], mouse = { x: -9999, y: -9999 };
    var COUNT;

    function size() {
      w = cv.width = innerWidth * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px";
      cv.style.height = innerHeight + "px";
      COUNT = Math.round((innerWidth * innerHeight) / 17000);
      COUNT = Math.max(50, Math.min(150, COUNT));
      pts = [];
      for (var i = 0; i < COUNT; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25 * dpr,
          vy: (Math.random() - 0.5) * 0.25 * dpr,
          r: (Math.random() * 1.4 + 0.4) * dpr
        });
      }
    }
    size();
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", function (e) { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
    window.addEventListener("mouseout", function () { mouse.x = mouse.y = -9999; });

    var running = true;
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) draw();
    });

    var LINK = 130 * dpr;
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        var dxm = p.x - mouse.x, dym = p.y - mouse.y;
        var dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 150 * dpr) {
          p.x += (dxm / dm) * 0.8;
          p.y += (dym / dm) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140,210,255,.85)";
        ctx.fill();

        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(120,160,255," + (0.22 * (1 - d / LINK)) + ")";
            ctx.lineWidth = dpr * 0.7;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ---------------------------------------------------------------- listing popup + photo carousel */
  var lb = $("#lightbox"), stage = $("#lightboxStage"), lbInfo = $("#lightboxInfo"), lbClose = $("#lightboxClose");
  var carGo = null;

  function openListing(home) {
    if (!lb) return;
    var slides = (home.photos || []).map(function (p) { return { type: "image", src: p }; });
    if (home.video) slides.push({ type: "video", src: home.video });
    if (!slides.length && home.image) slides.push({ type: "image", src: home.image });
    if (!slides.length) return;

    stage.innerHTML =
      '<div class="carousel">' +
        '<div class="carousel__track" id="carTrack"></div>' +
        (slides.length > 1 ? '<button class="carousel__nav carousel__nav--prev" id="carPrev" aria-label="Previous photo">‹</button>' +
                             '<button class="carousel__nav carousel__nav--next" id="carNext" aria-label="Next photo">›</button>' +
                             '<div class="carousel__dots" id="carDots"></div>' : "") +
      "</div>";
    var track = $("#carTrack"), dots = $("#carDots"), idx = 0;
    slides.forEach(function (s, i) {
      var cell = document.createElement("div");
      cell.className = "carousel__cell";
      var node;
      if (s.type === "video") {
        node = document.createElement("video");
        node.src = s.src; node.controls = true; node.loop = true; node.playsInline = true; node.preload = "none";
      } else {
        var ws = webpSource(s.src);
        if (ws) {
          node = document.createElement("picture");
          node.innerHTML = ws + '<img alt="' + esc(home.address || "") + '" src="' + esc(s.src) +
            '" loading="' + (i === 0 ? "eager" : "lazy") + '" />';
        } else {
          node = document.createElement("img");
          node.src = s.src; node.alt = home.address || ""; node.loading = i === 0 ? "eager" : "lazy";
        }
      }
      cell.appendChild(node);
      track.appendChild(cell);
      if (dots) {
        var d = document.createElement("button");
        d.className = "carousel__dot"; d.type = "button";
        d.setAttribute("aria-label", "Photo " + (i + 1));
        d.addEventListener("click", function () { go(i); });
        dots.appendChild(d);
      }
    });
    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      if (dots) $$(".carousel__dot", dots).forEach(function (d, i) { d.classList.toggle("is-active", i === idx); });
      $$("video", track).forEach(function (v) { v.pause(); });
    }
    if (slides.length > 1) {
      $("#carPrev").addEventListener("click", function () { go(idx - 1); });
      $("#carNext").addEventListener("click", function () { go(idx + 1); });
      carGo = function (dir) { go(idx + dir); };
    }
    go(0);

    var slug = (home.status || "").toLowerCase().replace(/[^a-z]+/g, "-") || "listing";
    var rows = "";
    [["Type", home.type], ["Bedrooms", home.beds], ["Bathrooms", home.baths]].forEach(function (r) {
      if (r[1]) rows += "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(String(r[1])) + "</dd></div>";
    });
    var localForm = document.getElementById("enquire");
    var enquireHref = localForm ? "#enquire"
      : "contact.html?re=" + encodeURIComponent(home.address || "") + "#enquire";
    lbInfo.innerHTML =
      '<span class="lightbox__tag is-' + slug + '">' + esc(home.status || "For sale") + "</span>" +
      "<h3>" + esc(home.price || "") + "</h3>" +
      (home.address ? '<p class="listing-addr">' + esc(home.address) + "</p>" : "") +
      (rows ? '<dl class="lightbox__meta">' + rows + "</dl>" : "") +
      (home.blurb ? '<p class="lightbox__note">' + esc(home.blurb) + "</p>" : "") +
      '<a href="' + enquireHref + '" class="btn btn--primary lightbox__cta">Book a viewing' +
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
    var cta = lbInfo.querySelector(".lightbox__cta");
    if (cta && localForm) cta.addEventListener("click", function () {
      var a = document.getElementById("f-area"); if (a && !a.value) a.value = home.address || "";
      closeLightbox();
    });

    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    lbClose.focus();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    stage.innerHTML = "";
    if (lbInfo) lbInfo.innerHTML = "";
    carGo = null;
    document.body.classList.remove("menu-open");
  }
  safe(function () {
    if (!lb || !lbClose) return;
    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft" && carGo) carGo(-1);
      else if (e.key === "ArrowRight" && carGo) carGo(1);
    });
  }, "lightbox");

  /* ---------------------------------------------------------------- FAQ: close others */
  safe(function () {
    $$(".qa").forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) $$(".qa").forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }, "faq");

  /* ---------------------------------------------------------------- enquiry form */
  safe(function () {
  var form = $("#enquireForm");
  if (form) {
    var statusEl = $("#enquireStatus");
    var setStatus = function (msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      statusEl.className = "enquire__status" + (kind ? " is-" + kind : "");
    };
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // spam gate: a hidden honeypot field, plus "did a human actually interact,
    // and not submit within a few seconds of the page loading?" Bots trip one of
    // these; a real visitor filling a form this far down the page trips none.
    var formReady = Date.now();
    var touched = false;
    form.addEventListener("focusin", function () { touched = true; });

    var mailFallback = function (d) {
      var body =
        "Name: " + d.name + "\n" +
        "Email: " + d.email + "\n" +
        "Phone: " + (d.phone || "—") + "\n" +
        "Looking to: " + d.intent + "\n" +
        "Area: " + (d.area || "—") + "\n\n" +
        (d.message || "");
      window.location.href = "mailto:Infodhakaauto@gmail.com?subject=" +
        encodeURIComponent("Free evaluation request — " + d.name) +
        "&body=" + encodeURIComponent(body);
      setStatus("Opening your email app to send the request…", "ok");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot filled, or no interaction at all, or submitted implausibly soon
      // after load: acknowledge like a normal success, but send nothing.
      var hp = $("#f-company");
      if ((hp && hp.value.trim()) || !touched || (Date.now() - formReady) < 2500) {
        form.reset();
        setStatus("Thanks — Shawan will be in touch within one business day.", "ok");
        return;
      }

      var ok = true;
      [["f-name", false], ["f-email", true]].forEach(function (pair) {
        var el = $("#" + pair[0]);
        var bad = !el.value.trim() || (pair[1] && !emailRe.test(el.value.trim()));
        el.parentElement.classList.toggle("is-error", bad);
        if (bad) ok = false;
      });
      if (!ok) { setStatus("Please add your name and a valid email address.", "err"); return; }

      var data = {
        name: $("#f-name").value.trim(),
        email: $("#f-email").value.trim(),
        phone: $("#f-phone").value.trim(),
        intent: $("#f-intent").value,
        area: $("#f-area").value.trim(),
        message: $("#f-msg").value.trim()
      };

      var endpoint = (window.SITE_MEDIA || {}).formEndpoint;
      if (endpoint) {
        setStatus("Sending…", "");
        fetch(endpoint, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (r.ok) { form.reset(); setStatus("Thanks — Shawan will be in touch within one business day.", "ok"); }
          else { mailFallback(data); }
        }).catch(function () { mailFallback(data); });
      } else {
        mailFallback(data);
      }
    });

    $$(".field input, .field select, .field textarea", form).forEach(function (el) {
      el.addEventListener("input", function () { el.parentElement.classList.remove("is-error"); });
    });
  }
  }, "form");

})();
