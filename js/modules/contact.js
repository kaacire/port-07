/* Kacire — botões de contato e links dos sites (a partir de config.js) */
(function (K) {
  "use strict";

  /* Só aceita http(s): qualquer outra coisa é tratada como "sem link". */
  function safeUrl(value) {
    var v = String(value || "").trim();
    return /^https?:\/\//i.test(v) ? v : "";
  }

  function button(href, label, cls, external) {
    var a = K.el("a", { href: href, class: "btn " + cls });
    a.appendChild(document.createTextNode(label));
    a.insertAdjacentHTML("beforeend", K.ARROW_SVG);
    if (external) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener noreferrer"); }
    return a;
  }

  K.contact = {
    init: function () {
      var cfg = K.config || {};

      /* Contato: Instagram vem do HTML; WhatsApp e e-mail só aparecem se informados. */
      var box = document.querySelector("[data-contact-actions]");
      if (box) {
        var insta = box.querySelector("[data-instagram]");
        if (insta && cfg.instagram) insta.href = "https://www.instagram.com/" + encodeURIComponent(cfg.instagram) + "/";

        var digits = String(cfg.whatsapp || "").replace(/\D/g, "");
        if (digits) {
          var text = cfg.whatsappMessage ? "?text=" + encodeURIComponent(cfg.whatsappMessage) : "";
          box.insertBefore(button("https://wa.me/" + digits + text, "WhatsApp", "btn--blue", true), box.firstChild);
        }
        if (cfg.email) box.appendChild(button("mailto:" + cfg.email, "E-mail", "btn--red", false));
      }

      /* Serviços: a imagem do slide vira link para o site (config.services; se vazio, usa config.demos).
         Sem URL válida, vira imagem comum com o aviso "Link em breve" — nunca um link falso. */
      Array.prototype.forEach.call(document.querySelectorAll("a[data-site-link]"), function (a) {
        var key = a.getAttribute("data-site-link");
        var name = a.getAttribute("data-name") || "";
        var url = safeUrl(cfg.services && cfg.services[key]) || safeUrl(cfg.demos && cfg.demos[key]);

        if (url) {
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.setAttribute("aria-label", name + " — abrir o site em nova aba");
          var arrow = K.el("span", { class: "slide-media__badge", "aria-hidden": "true" });
          arrow.innerHTML = "Abrir " + K.ARROW_SVG;
          a.appendChild(arrow);
        } else {
          var plain = K.el("div", { class: "slide-media is-pending" });
          while (a.firstChild) plain.appendChild(a.firstChild);
          plain.appendChild(K.el("span", { class: "slide-media__badge", text: "Link em breve" }));
          a.replaceWith(plain);
        }
      });

      /* Demonstrações: botão só com link real; sem link, aviso em texto. */
      Array.prototype.forEach.call(document.querySelectorAll("[data-demo-link]"), function (slot) {
        var url = safeUrl(cfg.demos && cfg.demos[slot.getAttribute("data-demo-link")]);
        if (url) slot.appendChild(button(url, "Ver demonstração", "btn--blue", true));
        else slot.appendChild(K.el("p", { class: "demo-note", text: "Link da demonstração em breve." }));
      });

      Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (n) {
        n.textContent = new Date().getFullYear();
      });
    }
  };
})((window.Kacire = window.Kacire || {}));
