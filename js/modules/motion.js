/* Kacire — movimento: revelação ao rolar, paralaxe do hero e inclinação 3D dos cartões
   (técnicas inspiradas no repositório de referência) */
(function (K) {
  "use strict";

  var finePointer = function () {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 768;
  };

  function reveal() {
    var items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  function parallax() {
    var layer = document.getElementById("particles");
    var hero = document.getElementById("inicio");
    if (!layer || !hero || K.reduced.matches || window.innerWidth < 768) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY;
        if (y < hero.offsetHeight) layer.style.transform = "translate3d(0," + (y * 0.25).toFixed(1) + "px,0)";
      });
    }, { passive: true });
  }

  function tilt() {
    if (K.reduced.matches || !finePointer()) return;
    Array.prototype.forEach.call(document.querySelectorAll(".tilt"), function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
      });
      card.addEventListener("mouseleave", function () {
        card.style.removeProperty("--ry");
        card.style.removeProperty("--rx");
      });
    });
  }

  K.motion = {
    init: function () { reveal(); parallax(); tilt(); }
  };
})((window.Kacire = window.Kacire || {}));
