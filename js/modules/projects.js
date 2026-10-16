/* Kacire — página /projetos: blocos selecionáveis com painéis */
(function (K) {
  "use strict";

  function formatDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? m[3] + "/" + m[2] + "/" + m[1] : iso || "";
  }

  function block(title, body) {
    return K.el("section", { class: "panel-block" }, [K.el("h3", { text: title })].concat(body));
  }

  function buildPanel(project, tabId) {
    var done = project.progress.filter(function (i) { return i.state === "done"; }).length;
    var total = project.progress.length;
    var pct = total ? Math.round((done / total) * 100) : 0;

    var bar = K.el("span", { "data-pct": pct });
    var progress = K.el("div", { class: "progress" }, [
      K.el("div", { class: "progress-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": pct, "aria-label": "Progresso do checklist de " + project.name }, [bar]),
      K.el("p", { class: "progress-label", text: done + " de " + total + " itens do checklist concluídos" })
    ]);
    var checklist = K.el("ul", { class: "checklist" }, project.progress.map(function (item) {
      return K.el("li", { class: item.state === "done" ? "is-done" : "is-open" }, [
        K.el("span", {}, [
          item.text + " ",
          K.el("span", { class: "state", text: item.state === "done" ? "· concluído" : "· em aberto" })
        ])
      ]);
    }));

    var notes = K.el("ul", { class: "notes" }, project.notes.map(function (n) { return K.el("li", { text: n }); }));

    var updates = project.updates && project.updates.length
      ? K.el("ul", { class: "notes" }, project.updates.map(function (u) {
          return K.el("li", {}, [K.el("strong", { text: formatDate(u.date) + " — " + u.title }), u.text ? K.el("span", { text: " " + u.text }) : null]);
        }))
      : K.el("p", { class: "empty-note", text: "Nenhuma atualização datada foi registrada ainda." });

    var images = project.images && project.images.length
      ? K.el("div", { class: "gallery" }, project.images.map(function (img) {
          return K.el("figure", {}, [
            K.el("button", { type: "button", class: "gallery-open", "data-lightbox": true, "aria-label": "Ampliar imagem" + (img.caption ? ": " + img.caption : "") }, [
              K.el("img", { src: K.asset(img.src), alt: img.alt || "", width: "1280", height: "800", loading: "lazy" })
            ]),
            img.caption ? K.el("figcaption", { text: img.caption }) : null
          ]);
        }))
      : K.el("p", { class: "empty-note", text: "Nenhuma imagem foi adicionada ainda." });

    return K.el("div", { class: "proj-panel", role: "tabpanel", id: "panel-" + project.id, "aria-labelledby": tabId, hidden: true, tabindex: "0" }, [
      K.el("header", { class: "panel-block" }, [
        K.el("span", { class: "tag tag--" + project.tag.tone, text: project.tag.label }),
        K.el("h2", { text: project.name }),
        K.el("p", { class: "muted", text: project.summary })
      ]),
      K.el("div", { class: "panel-grid" }, [
        block("Progresso", [progress, checklist]),
        block("Notas de desenvolvimento", [notes])
      ]),
      K.el("div", { class: "panel-grid" }, [
        block("Atualizações", [updates]),
        block("Imagens", [images])
      ])
    ]);
  }

  K.projects_ui = {
    init: function () {
      var tablist = document.getElementById("proj-tabs");
      var host = document.getElementById("proj-panels");
      var data = K.projects;
      if (!tablist || !host || !data || !data.length) return;

      var tabs = [], panels = [];
      data.forEach(function (project, i) {
        var tabId = "tab-" + project.id;
        var tab = K.el("button", { type: "button", class: "proj-tab", role: "tab", id: tabId, "aria-controls": "panel-" + project.id, "aria-selected": "false", tabindex: "-1" }, [
          K.el("span", { class: "tag tag--" + project.tag.tone, text: project.tag.label }),
          K.el("span", { class: "tab-title", text: project.name }),
          K.el("span", { class: "tab-sub", text: project.tagline })
        ]);
        tab.addEventListener("click", function () { select(i, true); });
        tab.addEventListener("keydown", function (e) {
          var n = data.length, to = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") to = (i + 1) % n;
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") to = (i - 1 + n) % n;
          else if (e.key === "Home") to = 0;
          else if (e.key === "End") to = n - 1;
          if (to === null) return;
          e.preventDefault();
          select(to, true);
          tabs[to].focus();
        });
        var panel = buildPanel(project, tabId);
        tabs.push(tab); panels.push(panel);
        tablist.appendChild(tab);
        host.appendChild(panel);
      });

      function select(i, updateHash) {
        tabs.forEach(function (tab, j) {
          var on = i === j;
          tab.setAttribute("aria-selected", on ? "true" : "false");
          tab.setAttribute("tabindex", on ? "0" : "-1");
          panels[j].hidden = !on;
        });
        // anima a barra de progresso do painel aberto
        var bar = panels[i].querySelector(".progress-bar span");
        if (bar) { bar.style.width = "0"; requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = bar.getAttribute("data-pct") + "%"; }); }); }
        if (updateHash && history.replaceState) history.replaceState(null, "", "#" + data[i].id);
      }

      function fromHash() {
        var id = location.hash.slice(1);
        for (var i = 0; i < data.length; i++) if (data[i].id === id) return i;
        return 0;
      }

      select(fromHash(), false);
      window.addEventListener("hashchange", function () { select(fromHash(), false); });
    }
  };
})((window.Kacire = window.Kacire || {}));
