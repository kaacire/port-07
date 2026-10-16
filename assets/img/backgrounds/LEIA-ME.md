# Imagens de fundo

Esta pasta está **vazia de propósito**: nenhuma imagem de fundo é usada por enquanto e não há placeholder.

## Como preencher

1. Coloque aqui a imagem (por exemplo `hero.jpg`). Prefira JPG ou WebP, com pelo menos 1920 px de largura e até uns 300 KB.
2. Abra `js/config.js` e informe o caminho no campo `backgrounds`:

```js
backgrounds: {
  inicio: "assets/img/backgrounds/hero.jpg",
  servicos: "",
  demonstracoes: "",
  projetos: "",
  contato: "",
  paginaProjetos: ""
}
```

Os nomes dos campos são: `inicio`, `servicos`, `demonstracoes`, `projetos`, `contato` (seções da página principal) e `paginaProjetos` (topo da página `/projetos`).
Campo vazio = a seção fica sem fundo.

Um escurecido é aplicado automaticamente por cima da imagem para o texto continuar legível. Para ajustar a intensidade, edite `.bg-slot.has-image::after` em `css/base.css`.
