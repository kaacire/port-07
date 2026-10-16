/* Kacire — lightbox da galeria (<dialog> nativo: Esc fecha, foco volta ao botão de origem) */
(function (K) {
  "use strict";

  var dialog, imgEl, capEl, prevBtn, nextBtn, group = [], index = 0;

  function build() {
    if (dialog) return;
    imgEl = K.el("img", { alt: "" });
    capEl = K.el("figcaption", { class: "lightbox-caption", "aria-live": "polite" });
    var closeBtn = K.el("button", { type: "button", class: "lightbox-btn lightbox-close", "aria-label": "Fechar imagem", text: "×" });
    prevBtn = K.el("button", { type: "button", class: "lightbox-btn lightbox-prev", "aria-label": "Imagem anterior", text: "‹" });
    nextBtn = K.el("button", { type: "button", class: "lightbox-btn lightbox-next", "aria-label": "Próxima imagem", text: "›" });
    dialog = K.el("dialog", { class: "lightbox", "aria-label": "Visualizador de imagem" }, [
      K.el("figure", { class: "lightbox-figure" }, [imgEl, capEl]),
      prevBtn, nextBtn, closeBtn
    ]);
    document.body.appendChild(dialog);

    closeBtn.addEventListener("click", function () { dialog.close(); });
    prevBtn.addEventListener("click", function () { show(index - 1); });
    nextBtn.addEventListener("click", function () { show(index + 1); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    });
    dialog.addEventListener("close", function () { document.documentElement.style.overflow = ""; });
  }

  function show(i) {
    if (!group.length) return;
    index = (i + group.length) % group.length;
    var trigger = group[index];
    var thumb = trigger.querySelector("img");
    var fig = trigger.closest("figure");
    var cap = fig && fig.querySelector("figcaption");
    imgEl.src = thumb.currentSrc || thumb.src;
    imgEl.alt = thumb.alt || "";
    capEl.textContent = (cap ? cap.textContent : "") + (group.length > 1 ? " · " + (index + 1) + " / " + group.length : "");
    var many = group.length > 1;
    prevBtn.hidden = nextBtn.hidden = !many;
  }

  function open(trigger) {
    var thumb = trigger.querySelector("img");
    if (!thumb) return;
    if (typeof HTMLDialogElement === "undefined" || !document.createElement("dialog").showModal) {
      window.open(thumb.currentSrc || thumb.src, "_blank", "noopener"); // navegador antigo: abre a imagem
      return;
    }
    build();
    var scope = trigger.closest(".gallery") || document;
    group = Array.prototype.slice.call(scope.querySelectorAll("[data-lightbox]"));
    show(Math.max(0, group.indexOf(trigger)));
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
  }

  K.lightbox = {
    init: function () {
      document.addEventListener("click", function (e) {
        var trigger = e.target.closest && e.target.closest("[data-lightbox]");
        if (!trigger) return;
        e.preventDefault();
        open(trigger);
      });
    }
  };
})((window.Kacire = window.Kacire || {}));
