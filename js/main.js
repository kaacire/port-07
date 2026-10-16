/* Kacire — ponto de entrada: inicializa os módulos disponíveis em cada página */
(function (K) {
  "use strict";

  function run(name) {
    try {
      var mod = K[name];
      if (mod && typeof mod.init === "function") mod.init();
    } catch (err) {
      if (window.console) console.error("[Kacire] falha ao iniciar " + name, err);
    }
  }

  function start() {
    ["stars", "nav", "transition", "backgrounds", "contact", "typing", "particles", "carousel", "projects_ui", "motion", "lightbox"].forEach(run);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})((window.Kacire = window.Kacire || {}));
