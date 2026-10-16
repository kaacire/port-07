/* Kacire — imagens de fundo por seção (espaços vazios até você informar o caminho em config.js) */
(function (K) {
  "use strict";

  K.backgrounds = {
    init: function () {
      var map = (K.config && K.config.backgrounds) || {};
      Array.prototype.forEach.call(document.querySelectorAll("[data-bg]"), function (slot) {
        var path = String(map[slot.getAttribute("data-bg")] || "").trim();
        if (!path) return; // vazio: nada é mostrado (sem placeholder)
        var url = K.asset(path);
        // encodeURI protege aspas e espaços dentro do url("...")
        slot.style.setProperty("--bg-image", 'url("' + encodeURI(url) + '")');
        slot.classList.add("has-image");
      });
    }
  };
})((window.Kacire = window.Kacire || {}));
