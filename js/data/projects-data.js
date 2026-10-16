/* ==========================================================
   Kacire — dados da página /projetos
   Baseado apenas em informações fornecidas pelo autor.
   TODO (autor): confirmar/atualizar status e adicionar atualizações
   datadas (updates: [{ date: "AAAA-MM-DD", title, text }]).

   IMAGENS: cada item de images é { src, alt, caption }. O src é relativo
   à raiz do site (ex.: "assets/img/projects/argos-1.svg"); o prefixo
   "../" da página /projetos é aplicado automaticamente. Hoje são
   placeholders: para trocar, sobrescreva o arquivo com o mesmo nome
   ou mude o src aqui. Veja assets/img/README.md.
   state: "done" = concluído | "open" = pendente/em aberto
   ========================================================== */
window.Kacire = window.Kacire || {};

window.Kacire.projects = [
  {
    id: "argos",
    name: "ARGOS",
    tagline: "Monitoramento e alerta de desastres naturais",
    tag: { label: "Liga Jovem", tone: "blue" },
    summary:
      "Aplicação web de monitoramento e alerta de desastres naturais, criada para a competição Liga Jovem. Começou focada em Sento Sé (BA), com visão de expansão nacional.",
    progress: [
      { state: "done", text: "Dados meteorológicos reais (Open-Meteo) ligados à página inicial" },
      { state: "done", text: "Mapa com geolocalização, camadas e polígonos GeoJSON de suscetibilidade a deslizamentos" },
      { state: "done", text: "Rota e serviço de rios implementados, com modelo de observação no Prisma" },
      { state: "done", text: "Proxy /api/* da Netlify para o backend no Render configurado" },
      { state: "done", text: "Tipos do serviço de risco definidos (RiskLevel, RiskFactorResult, RiskScoreResponse)" },
      { state: "open", text: "Serviço de cálculo de risco (riskService.ts) por regras de limiares, sem ML" },
      { state: "open", text: "Causa do erro 500 do serviço de nível dos rios (ANA)" },
      { state: "open", text: "Geometria dos polígonos da CPRM/SGB ainda não testada no endpoint real" },
      { state: "open", text: "Status do deploy no Render ainda não confirmado" },
      { state: "open", text: "Verificar no frontend: ocultar mensagens após 5 s e botão “Minha localização”" }
    ],
    notes: [
      "Regra central: nunca inventar um valor. Dado ausente reduz a confiança do resultado; nunca é tratado como risco zero.",
      "Frontend em React/TypeScript hospedado na Netlify; backend em Node.js/TypeScript hospedado no Render.",
      "Fontes de dados: Open-Meteo (clima), ANA (nível dos rios) e CPRM/SGB (suscetibilidade a deslizamentos).",
      "Telas de relatórios e alertas ainda exibem dados de exemplo, identificados como tal."
    ],
    updates: [],
    images: [
      { src: "assets/img/projects/argos-1.svg", alt: "Imagem de exemplo do ARGOS (1)", caption: "ARGOS — imagem 1" },
      { src: "assets/img/projects/argos-2.svg", alt: "Imagem de exemplo do ARGOS (2)", caption: "ARGOS — imagem 2" }
    ]
  },
  {
    id: "ia-antivirus",
    name: "IA Antivírus",
    tagline: "Um antivírus “pensante”",
    tag: { label: "Conceito", tone: "purple" },
    summary:
      "Ideia de uma IA que funciona como antivírus “pensante”: analisa cada arquivo individualmente, testa contra vários tipos de ameaça e, em seguida, questiona se a própria análise faz sentido antes de exibir o resultado.",
    progress: [
      { state: "done", text: "Conceito definido" },
      { state: "open", text: "Análise individual de cada arquivo contra vários tipos de vírus" },
      { state: "open", text: "Etapa de autoverificação: a análise faz sentido para o código e o tipo do arquivo?" },
      { state: "open", text: "Exibição do resultado final" }
    ],
    notes: [
      "O diferencial pretendido é a segunda etapa: a IA revisa o próprio raciocínio antes de concluir.",
      "A autoverificação considera o código e o tipo do arquivo analisado."
    ],
    updates: [],
    images: [
      { src: "assets/img/projects/ia-antivirus-1.svg", alt: "Imagem de exemplo da IA Antivírus (1)", caption: "IA Antivírus — imagem 1" },
      { src: "assets/img/projects/ia-antivirus-2.svg", alt: "Imagem de exemplo da IA Antivírus (2)", caption: "IA Antivírus — imagem 2" }
    ]
  }
];
