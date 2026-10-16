/* Kacire — carrossel "coverflow" (estilo do repositório de referência)
   Slide ativo no centro, vizinhos menores nas laterais, rotação infinita,
   gesto de deslizar, teclado, pontos e botões Anterior/Próximo. */
(function (K) {
  "use strict";

  function setup(root) {
    var track = root.querySelector(".carousel-track");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    var n = slides.length;
    if (!n) return;
    var label = root.getAttribute("aria-label") || "Carrossel";
    var index = 0;

    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carrossel");
    root.setAttribute("tabindex", "0");

    var names = slides.map(function (slide, i) {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", (i + 1) + " de " + n);
      return slide.getAttribute("data-label") || "Item " + (i + 1);
    });

    /* Controles criados por JS: nunca existem botões sem função. */
    var prev = K.el("button", { type: "button", class: "btn", "aria-label": "Item anterior", text: "Anterior" });
    var next = K.el("button", { type: "button", class: "btn", "aria-label": "Próximo item", text: "Próximo" });
    var dots = K.el("div", { class: "carousel-dots" });
    var dotBtns = slides.map(function (_, i) {
      var b = K.el("button", { type: "button", class: "carousel-dot", "aria-label": "Ir para o item " + (i + 1) + ": " + names[i] });
      b.addEventListener("click", function () { goTo(i); });
      dots.appendChild(b);
      return b;
    });
    var status = K.el("span", { class: "sr-only", "aria-live": "polite" });
    root.appendChild(K.el("div", { class: "carousel-controls" }, [prev, dots, next, status]));

    function wrap(i) { return ((i % n) + n) % n; }

    function render() {
      slides.forEach(function (slide, i) {
        var off = i - index;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        var active = i === index;
        slide.classList.toggle("is-active", active);
        slide.classList.toggle("is-prev", off === -1);
        slide.classList.toggle("is-next", off === 1);
        slide.setAttribute("data-offset", off);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        var inner = slide.firstElementChild;
        if (inner) {
          if (active) inner.removeAttribute("inert"); else inner.setAttribute("inert", "");
        }
      });
      dotBtns.forEach(function (b, i) {
        if (i === index) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      });
      status.textContent = "Item " + (index + 1) + " de " + n + ": " + names[index];
    }

    function goTo(i) { index = wrap(i); render(); }

    prev.addEventListener("click", function () { goTo(index - 1); });
    next.addEventListener("click", function () { goTo(index + 1); });

    /* Clique no slide vizinho traz ele para o centro. */
    slides.forEach(function (slide, i) {
      slide.addEventListener("click", function () { if (i !== index) goTo(i); });
    });

    root.addEventListener("keydown", function (e) {
      if (e.target !== root) return; // setas só quando o próprio carrossel tem o foco
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(n - 1); }
    });

    /* Gesto de deslizar (ignora rolagem vertical). */
    var sx = null, sy = null, vertical = false;
    root.addEventListener("touchstart", function (e) {
      var t = e.changedTouches[0];
      sx = t.clientX; sy = t.clientY; vertical = false;
    }, { passive: true });
    root.addEventListener("touchmove", function (e) {
      if (sx === null) return;
      var t = e.changedTouches[0];
      var dx = Math.abs(t.clientX - sx), dy = Math.abs(t.clientY - sy);
      if (dy > dx && dy > 10) vertical = true;
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var delta = e.changedTouches[0].clientX - sx;
      if (!vertical && Math.abs(delta) > 48) goTo(delta > 0 ? index - 1 : index + 1);
      sx = sy = null;
    }, { passive: true });

    render();
  }

  K.carousel = {
    init: function () {
      Array.prototype.forEach.call(document.querySelectorAll("[data-carousel]"), setup);
    }
  };
})((window.Kacire = window.Kacire || {}));
