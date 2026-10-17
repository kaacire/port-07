/* ==========================================================
   Kacire — configuração editável (nada aqui é inventado)
   Campos vazios ("") fazem o botão/imagem correspondente NÃO aparecer.
   ========================================================== */
window.Kacire = window.Kacire || {};

window.Kacire.config = {
  // Perfil informado: "kaciree"
  instagram: "kaaciree",

  // Preencha para ativar os botões de contato correspondentes.
  // WhatsApp: somente dígitos com DDI+DDD, ex.: "5574999999999"
  whatsapp: "",
  whatsappMessage: "Olá! Vim pelo site da Kacire e gostaria de falar sobre um site para o meu negócio.",
  email: "",

  // Seção "Serviços": link aberto ao clicar na imagem de cada slide (use https://...).
  // Vazio = a imagem aparece com o aviso "Link em breve" e não leva a lugar nenhum.
  // Se um campo daqui estiver vazio, o site usa o link do mesmo nome em "demos".
  services: {
    landing: "",
    institucional: "",
    agendamento: ""
  },

  // Seção "Demonstrações": links públicos (use https://...).
  // Vazio = mostra "link em breve" (sem botão).
  demos: {
    landing: "",
    institucional: "",
    agendamento: ""
  },

  // Imagens de fundo por seção. Vazio = nenhum fundo (o espaço fica reservado, sem placeholder).
  // Coloque o arquivo em assets/img/backgrounds/ e informe o caminho a partir da raiz do site,
  // por exemplo: "assets/img/backgrounds/hero.jpg". Um escurecido é aplicado automaticamente
  // por cima para o texto continuar legível.
  backgrounds: {
    inicio: "",
    servicos: "",
    demonstracoes: "",
    projetos: "",
    contato: "",
    paginaProjetos: ""   // topo da página /projetos
  }
};
