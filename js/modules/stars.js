/* Kacire — estrelas de quatro pontas discretas no fundo */
(function (K) {
  "use strict";

  K.stars = {
    init: function () {
      var layer = document.querySelector(".stars");
      if (!layer) return;
      var colors = ["#ffffff", "#3b82ff", "#8b5cf6", "#ff3b4e"];
      var total = window.innerWidth < 600 ? 10 : 18;
      var frag = document.createDocumentFragment();

      for (var i = 0; i < total; i++) {
        var star = document.createElement("span");
        star.className = "star";
        star.style.left = (Math.random() * 100).toFixed(1) + "%";
        star.style.top = (Math.random() * 100).toFixed(1) + "%";
        star.style.setProperty("--s", (8 + Math.random() * 12).toFixed(0) + "px");
        star.style.setProperty("--o", (0.14 + Math.random() * 0.2).toFixed(2));
        star.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
        star.style.setProperty("--d", (5 + Math.random() * 6).toFixed(1) + "s");
        star.style.setProperty("--delay", (-Math.random() * 6).toFixed(1) + "s");
        frag.appendChild(star);
      }
      layer.appendChild(frag);
    }
  };
})((window.Kacire = window.Kacire || {}));
