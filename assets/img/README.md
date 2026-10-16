# Imagens do site

As imagens atuais são **placeholders** (SVG, 1280 × 800 px, proporção 16:10). Cada uma mostra, escrito nela mesma, o caminho do arquivo que deve ser substituído.

## Onde cada imagem aparece

| Arquivo | Onde aparece |
| --- | --- |
| `services/landing.svg`, `services/institucional.svg`, `services/agendamento.svg` | Página principal → Serviços (cada imagem é um link para o site, definido em `js/config.js` → `services`) |
| `demos/landing.svg` | Página principal → Demonstrações → Landing page |
| `demos/institucional.svg` | Página principal → Demonstrações → Site institucional |
| `demos/agendamento.svg` | Página principal → Demonstrações → Site com agendamento |
| `projects/argos-1.svg`, `projects/argos-2.svg` | `/projetos` → ARGOS → Imagens |
| `projects/ia-antivirus-1.svg`, `projects/ia-antivirus-2.svg` | `/projetos` → IA Antivírus → Imagens |

## Como substituir

**Opção A — mesmo formato (mais simples):** salve a imagem nova com o mesmo nome e extensão `.svg`, sobrescrevendo o arquivo. Nada mais precisa mudar.

**Opção B — PNG, JPG ou WebP:** coloque o arquivo na mesma pasta e troque o caminho:

- **Serviços e Demonstrações:** em `index.html`, mude o `src` (e o `alt`) da tag `<img class="shot">` correspondente.
- **Projetos:** em `js/data/projects-data.js`, mude `src`, `alt` e `caption` do item em `images`. Para ter mais ou menos imagens, basta adicionar ou remover itens dessa lista.

Os caminhos são sempre relativos à raiz do site (por exemplo `assets/img/projects/argos-1.png`). O prefixo `../` da página `/projetos` é aplicado automaticamente.

## Dicas

- Use imagens em 16:10 (por exemplo 1280 × 800). Outras proporções são cortadas para caber (`object-fit: cover`).
- Atualize o texto `alt` ao trocar a imagem, para descrever o que ela realmente mostra.
- O script `tools/make-placeholders.py` só cria os placeholders que **não existem**; nada que você já trocou é sobrescrito. Para recriar todos (apagando as trocas), use `--force`.
- Imagens de **fundo** das seções não são placeholders: ficam em `backgrounds/` (vazia) e são configuradas em `js/config.js`. Veja `backgrounds/LEIA-ME.md`.
