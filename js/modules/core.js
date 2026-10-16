/* Kacire — utilidades compartilhadas */
(function (K) {
  "use strict";

  K.reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  K.scrollBehavior = function () {
    return K.reduced.matches ? "auto" : "smooth";
  };

  /** Cria elementos de forma segura (sem innerHTML). */
  K.el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (value === null || value === undefined || value === false) return;
      if (key === "text") node.textContent = value;
      else if (key === "class") node.className = value;
      else node.setAttribute(key, value === true ? "" : value);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  };

  /** Resolve caminhos relativos à raiz do site (usa data-root do <body>: "" ou "../"). */
  K.asset = function (path) {
    if (!path || /^(?:[a-z]+:|\/\/|\/|data:)/i.test(path)) return path;
    return (document.body.getAttribute("data-root") || "") + path;
  };

  K.ARROW_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="M7 17 17 7M8 7h9v9"/></svg>';
})((window.Kacire = window.Kacire || {}));
