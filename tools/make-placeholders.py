#!/usr/bin/env python3
"""Gera as imagens de placeholder (SVG, 1280x800) em assets/img/.

Cada imagem mostra o próprio caminho, para ficar óbvio qual arquivo substituir.
Uso (na raiz do projeto):
  python3 tools/make-placeholders.py           só cria os que ainda NÃO existem
  python3 tools/make-placeholders.py --force   recria todos (sobrescreve!)
"""
import sys
from pathlib import Path

W, H = 1280, 800
ROOT = Path(__file__).resolve().parent.parent

# (arquivo, rótulo curto, cor de destaque)
ITEMS = [
    ("assets/img/services/landing.svg",         "Serviço · Landing page",             "#3b82ff"),
    ("assets/img/services/institucional.svg",   "Serviço · Site institucional",       "#8b5cf6"),
    ("assets/img/services/agendamento.svg",     "Serviço · Site com agendamento",     "#ff3b4e"),
    ("assets/img/demos/landing.svg",            "Demonstração · Landing page",        "#3b82ff"),
    ("assets/img/demos/institucional.svg",      "Demonstração · Site institucional",  "#8b5cf6"),
    ("assets/img/demos/agendamento.svg",        "Demonstração · Site com agendamento", "#ff3b4e"),
    ("assets/img/projects/argos-1.svg",         "ARGOS · imagem 1",                    "#3b82ff"),
    ("assets/img/projects/argos-2.svg",         "ARGOS · imagem 2",                    "#8b5cf6"),
    ("assets/img/projects/ia-antivirus-1.svg",  "IA Antivírus · imagem 1",             "#8b5cf6"),
    ("assets/img/projects/ia-antivirus-2.svg",  "IA Antivírus · imagem 2",             "#ff3b4e"),
]

STAR = "M0 -1 .2 -.2 1 0 .2 .2 0 1 -.2 .2 -1 0 -.2 -.2Z"

def svg(path: str, label: str, accent: str) -> str:
    uid = path.split("/")[-1].replace(".svg", "").replace("-", "")
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Imagem de exemplo: {label}">
  <defs>
    <linearGradient id="g{uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b14"/>
      <stop offset="1" stop-color="#14101f"/>
    </linearGradient>
    <radialGradient id="r{uid}" cx=".78" cy=".2" r=".6">
      <stop offset="0" stop-color="{accent}" stop-opacity=".35"/>
      <stop offset="1" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#g{uid})"/>
  <rect width="{W}" height="{H}" fill="url(#r{uid})"/>
  <rect x="24" y="24" width="{W-48}" height="{H-48}" fill="none" stroke="#ffffff" stroke-opacity=".22"/>
  <g stroke="#ffffff" stroke-opacity=".12">
    <path d="M24 24 {W-24} {H-24}M{W-24} 24 24 {H-24}"/>
  </g>
  <g fill="{accent}" transform="translate({W/2} {H/2-92}) scale(34)"><path d="{STAR}"/></g>
  <g font-family="Segoe UI, system-ui, Helvetica, Arial, sans-serif" text-anchor="middle" fill="#f4f4f7">
    <text x="{W/2}" y="{H/2-8}" font-size="26" letter-spacing="8" fill-opacity=".6">IMAGEM DE EXEMPLO</text>
    <text x="{W/2}" y="{H/2+46}" font-size="46" font-weight="700">{label}</text>
    <text x="{W/2}" y="{H/2+104}" font-size="24" fill-opacity=".7" font-family="Consolas, Menlo, monospace">{path}</text>
    <text x="{W/2}" y="{H/2+144}" font-size="20" fill-opacity=".5">{W} × {H} px · proporção 16:10 · substitua este arquivo</text>
  </g>
</svg>
'''

force = "--force" in sys.argv
for rel, label, accent in ITEMS:
    out = ROOT / rel
    if out.exists() and not force:
        print("mantido (já existe)", rel)
        continue
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(svg(rel, label, accent), encoding="utf-8")
    print("criado", rel)
