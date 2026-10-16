/* Kacire — partículas decorativas (canvas) no hero */
(function (K) {
  "use strict";

  var COLORS = ["255,255,255", "59,130,255", "139,92,246", "255,59,78"];

  K.particles = {
    init: function () {
      var canvas = document.getElementById("particles");
      if (!canvas || !canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = 0, h = 0, list = [], raf = 0, visible = true;

      function build() {
        var rect = canvas.getBoundingClientRect();
        w = rect.width; h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var count = Math.max(18, Math.min(70, Math.round((w * h) / 20000)));
        list = [];
        for (var i = 0; i < count; i++) {
          list.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.18,
            vy: -0.05 - Math.random() * 0.2,
            size: 1.5 + Math.random() * 3.5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: 0.2 + Math.random() * 0.5
          });
        }
      }

      var LINK = 120; // distância máxima para ligar duas partículas

      function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = 0.5;
        for (var i = 0; i < list.length; i++) {
          var p = list[i];
          ctx.fillStyle = "rgba(" + p.color + "," + p.alpha + ")";
          ctx.fillRect(p.x, p.y, p.size, p.size);

          for (var j = i + 1; j < list.length; j++) {
            var q = list[j], dx = p.x - q.x, dy = p.y - q.y;
            if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK) {
              ctx.strokeStyle = "rgba(139,92,246," + (0.18 * (1 - dist / LINK)).toFixed(3) + ")";
              ctx.beginPath();
              ctx.moveTo(p.x + p.size / 2, p.y + p.size / 2);
              ctx.lineTo(q.x + q.size / 2, q.y + q.size / 2);
              ctx.stroke();
            }
          }
        }
      }

      function step() {
        for (var i = 0; i < list.length; i++) {
          var p = list[i];
          p.x += p.vx; p.y += p.vy;
          if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
          if (p.x < -6) p.x = w + 6;
          if (p.x > w + 6) p.x = -6;
        }
        draw();
        raf = requestAnimationFrame(step);
      }

      function start() {
        if (raf || K.reduced.matches || !visible || document.hidden) return;
        raf = requestAnimationFrame(step);
      }
      function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

      build();
      draw();
      start();

      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { build(); draw(); }, 150);
      });
      document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          visible ? start() : stop();
        }).observe(canvas);
      }
      if (K.reduced.addEventListener) {
        K.reduced.addEventListener("change", function () { K.reduced.matches ? (stop(), draw()) : start(); });
      }
    }
  };
})((window.Kacire = window.Kacire || {}));
