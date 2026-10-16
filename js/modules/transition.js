/* Kacire — transição suave ao navegar entre páginas (links continuam funcionando sem JS) */
(function (K) {
  "use strict";

  K.transition = {
    init: function () {
      window.addEventListener("pageshow", function () { document.body.classList.remove("is-leaving"); });

      document.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest("a[href]");
        if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
        if (a.target && a.target !== "_self") return;
        if (a.hasAttribute("download")) return;
        var url;
        try { url = new URL(a.href, location.href); } catch (err) { return; }
        if (url.origin !== location.origin) return;
        // mesma página (apenas âncora): a rolagem fica por conta do módulo nav
        if (url.pathname === location.pathname && url.search === location.search) return;
        if (K.reduced.matches) return;

        e.preventDefault();
        document.body.classList.add("is-leaving");
        setTimeout(function () { location.href = url.href; }, 220);
      });
    }
  };
})((window.Kacire = window.Kacire || {}));
