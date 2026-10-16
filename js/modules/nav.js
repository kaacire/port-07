/* Kacire — navegação: menu móvel, rolagem para seções e seção ativa */
(function (K) {
  "use strict";

  K.nav = {
    init: function () {
      var toggle = document.querySelector(".nav-toggle");
      var menu = document.getElementById("nav");
      var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

      /* ---- Cabeçalho: transparente no topo, vidro ao rolar (ou com menu aberto) ---- */
      var header = document.querySelector(".site-header");
      function updateHeader() {
        if (!header) return;
        var open = !!(menu && menu.classList.contains("is-open"));
        header.classList.toggle("scrolled", window.scrollY > 50 || open);
      }
      window.addEventListener("scroll", updateHeader, { passive: true });
      updateHeader();

      /* ---- Menu móvel ---- */
      function setOpen(open, returnFocus) {
        if (!toggle || !menu) return;
        menu.classList.toggle("is-open", open);
        updateHeader();
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (!open && returnFocus) toggle.focus();
      }
      if (toggle && menu) {
        toggle.addEventListener("click", function () {
          setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false, true);
        });
        document.addEventListener("click", function (e) {
          if (menu.classList.contains("is-open") && !menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
        });
      }

      /* ---- Rolagem para seções (somente links "#id" da própria página) ---- */
      document.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
        var id = a.getAttribute("href").slice(1);
        var target = id ? document.getElementById(id) : null;
        if (!target) return;
        e.preventDefault();
        setOpen(false);
        target.scrollIntoView({ behavior: K.scrollBehavior(), block: "start" });
        if (history.replaceState) history.replaceState(null, "", "#" + id);
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });

      /* ---- Seção ativa ---- */
      var sections = Array.prototype.slice.call(document.querySelectorAll("main [data-section]"));
      if (!sections.length || !links.length) return;

      function mark(id) {
        links.forEach(function (link) {
          var on = link.getAttribute("data-section") === id;
          link.classList.toggle("is-active", on);
          if (on) link.setAttribute("aria-current", "location");
          else if (link.getAttribute("aria-current") === "location") link.removeAttribute("aria-current");
        });
      }

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) mark(entry.target.getAttribute("data-section"));
          });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
        sections.forEach(function (s) { io.observe(s); });
      } else {
        window.addEventListener("scroll", function () {
          var y = window.scrollY + window.innerHeight * 0.4, current = sections[0];
          sections.forEach(function (s) { if (s.offsetTop <= y) current = s; });
          mark(current.getAttribute("data-section"));
        }, { passive: true });
      }
      mark(sections[0].getAttribute("data-section"));
    }
  };
})((window.Kacire = window.Kacire || {}));
