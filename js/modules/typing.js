/* Kacire — animação de digitação no título */
(function (K) {
  "use strict";

  K.typing = {
    init: function () {
      var host = document.querySelector("[data-typing]");
      if (!host) return;
      var out = host.querySelector(".typed-text");
      var cursor = host.querySelector(".cursor");
      var phrases;
      try { phrases = JSON.parse(host.getAttribute("data-phrases")); } catch (e) { phrases = null; }
      if (!out || !phrases || !phrases.length) return;

      // Movimento reduzido: texto estático, sem cursor piscando.
      if (K.reduced.matches) {
        out.textContent = phrases[0];
        if (cursor) cursor.remove();
        return;
      }

      var p = 0, c = 0, deleting = false;

      function tick() {
        if (document.hidden) { setTimeout(tick, 600); return; }
        var phrase = phrases[p];
        c += deleting ? -1 : 1;
        out.textContent = phrase.slice(0, c);

        var delay = deleting ? 35 : 75;
        if (!deleting && c === phrase.length) { deleting = true; delay = 1600; }
        else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
        setTimeout(tick, delay);
      }
      tick();
    }
  };
})((window.Kacire = window.Kacire || {}));
