# Portfolio Multi-Demo Rename Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renomear o repositório `jvictorsparedes/ocupacao-deposito-demo` para `jvictorsparedes/victor-paredes-portfolio`, ajustar o README raiz para refletir que é um portfólio em crescimento, e preparar o texto de divulgação da demo existente para o LinkedIn.

**Architecture:** Nenhuma mudança de código ou estrutura de pastas — a estrutura de subpasta-por-demo com README-índice na raiz já existe. O trabalho é: (1) operação de rename via `gh` CLI, que atualiza GitHub e mantém redirect automático da URL antiga; (2) edição pontual de texto no `README.md` raiz; (3) redação de um texto de post para LinkedIn (conteúdo apresentado ao usuário, não persistido no repo).

**Tech Stack:** `gh` CLI (GitHub), `git`.

## Global Constraints

- Rename in-place — não criar repositório novo. Fonte: spec, decisão 1.
- Novo nome exato: `victor-paredes-portfolio` (owner `jvictorsparedes`). Fonte: spec, decisão 2.
- Não alterar a estrutura de pastas existente (subpasta por demo + README-índice raiz). Fonte: spec, decisão 3.
- Publicação real no LinkedIn sempre exige confirmação explícita do usuário no momento — nunca publicar sozinho. Fonte: spec, decisão 5 e "Fora de escopo".
- Marca fictícia "Distribuidora Modelo" é a convenção para toda demo futura (não há ação de código para isso agora, é referência para tarefas futuras). Fonte: spec, "Convenção para demos futuras".

---

### Task 1: Renomear o repositório no GitHub e atualizar o remote local

**Files:**
- Nenhum arquivo de código. Efeito colateral: `.git/config` (remote `origin`) é atualizado automaticamente pelo `gh repo rename` quando executado dentro do clone local.

**Interfaces:**
- Consumes: nenhum.
- Produces: repositório remoto acessível em `https://github.com/jvictorsparedes/victor-paredes-portfolio`; remote `origin` local apontando para essa URL.

- [ ] **Step 1: Confirmar estado atual antes da mudança**

Run: `cd "C:\Users\jvict\OneDrive\Documentos\victorparedes-portfolio" && git remote -v`
Expected: mostra `origin` apontando para `https://github.com/jvictorsparedes/ocupacao-deposito-demo.git` (fetch e push).

- [ ] **Step 2: Renomear o repositório via gh CLI**

Run: `cd "C:\Users\jvict\OneDrive\Documentos\victorparedes-portfolio" && gh repo rename victor-paredes-portfolio --yes`

Expected (stdout aproximado):
```
✓ Renamed repository jvictorsparedes/ocupacao-deposito-demo to jvictorsparedes/victor-paredes-portfolio
✓ Updated the "origin" remote
```

Se o comando pedir confirmação interativa mesmo com `--yes` (versão antiga do `gh` sem essa flag), rodar sem a flag e verificar se ele detecta ambiente não-interativo; caso contrário, usar `gh api -X PATCH repos/jvictorsparedes/ocupacao-deposito-demo -f name=victor-paredes-portfolio` como alternativa, e então atualizar o remote manualmente no Step 3.

- [ ] **Step 3: Verificar que o remote local foi atualizado**

Run: `git remote -v`
Expected: `origin` agora aponta para `https://github.com/jvictorsparedes/victor-paredes-portfolio.git` (fetch e push). Se ainda mostrar a URL antiga, rodar:
`git remote set-url origin https://github.com/jvictorsparedes/victor-paredes-portfolio.git`

- [ ] **Step 4: Verificar que o repositório responde no novo nome**

Run: `gh repo view jvictorsparedes/victor-paredes-portfolio --json name,url`
Expected: JSON com `"name":"victor-paredes-portfolio"` e a URL nova.

- [ ] **Step 5: Verificar que a URL antiga redireciona (best-effort, não falha o plano)**

Run: `gh api repos/jvictorsparedes/ocupacao-deposito-demo --jq .full_name`
Expected: retorna `jvictorsparedes/victor-paredes-portfolio` (GitHub resolve o nome antigo via redirect). Se der erro 404, apenas anotar — não é bloqueante, já que o redirect do GitHub pode levar alguns segundos para propagar.

---

### Task 2: Ajustar o README raiz para refletir o portfólio em crescimento

**Files:**
- Modify: `README.md:1-11` (raiz do repo)

**Interfaces:**
- Consumes: nenhum.
- Produces: nenhuma interface consumida por outra task — mudança de conteúdo isolada.

- [ ] **Step 1: Ler o conteúdo atual**

Run: já lido nesta sessão — conteúdo atual:
```markdown
# Portfólio — Victor Paredes

Repositório pessoal com versões de demonstração de sistemas que desenvolvo,
sem vínculo com nenhuma empresa — identidade visual e dados sempre fictícios
ou de exemplo.

## Demos

- [`ocupacao-deposito-demo/`](ocupacao-deposito-demo/) — Painel de Ocupação de
  Depósito: acompanhamento em tempo real da saturação de um depósito logístico,
  com geração de relatório em imagem e histórico de registros.
```

- [ ] **Step 2: Editar o parágrafo de introdução para mencionar crescimento contínuo**

Substituir o parágrafo de introdução por:
```markdown
# Portfólio — Victor Paredes

Repositório pessoal com versões de demonstração de sistemas que desenvolvo,
sem vínculo com nenhuma empresa — identidade visual e dados sempre fictícios
ou de exemplo. Novas demos são adicionadas periodicamente conforme novos
módulos são recriados para portfólio.

## Demos

- [`ocupacao-deposito-demo/`](ocupacao-deposito-demo/) — Painel de Ocupação de
  Depósito: acompanhamento em tempo real da saturação de um depósito logístico,
  com geração de relatório em imagem e histórico de registros.
```

Usar a ferramenta de edição para trocar apenas a frase final do parágrafo (de `ou de exemplo.` para `ou de exemplo. Novas demos são adicionadas periodicamente conforme novos módulos são recriados para portfólio.`), mantendo o resto do arquivo idêntico.

- [ ] **Step 3: Verificar o resultado**

Run: ler o arquivo `README.md` novamente e confirmar que só essa frase mudou, sem quebrar a lista de demos.

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\jvict\OneDrive\Documentos\victorparedes-portfolio"
git add README.md
git commit -m "Atualiza README raiz para refletir portfólio em crescimento contínuo"
```

---

### Task 3: Preparar texto de divulgação da demo existente para o LinkedIn

**Files:**
- Nenhum arquivo do repositório é criado ou modificado — o texto é apresentado diretamente ao usuário no chat, para ele revisar e (depois, sob pedido explícito) publicar.

**Interfaces:**
- Consumes: URL final do repositório (Task 1) e conteúdo do `ocupacao-deposito-demo/README.md` (já lido nesta sessão) como base factual do post.
- Produces: texto de post pronto para revisão do usuário.

- [ ] **Step 1: Redigir o texto do post**

Escrever, em português, um texto curto (4-8 linhas) para LinkedIn cobrindo: o que é a demo (painel de ocupação de depósito), que é uma versão de portfólio sem identidade real de empresa, principais funcionalidades (saturação em tempo real, relatório em imagem, histórico), stack (HTML/CSS/JS puro, sem framework), e o link `https://github.com/jvictorsparedes/victor-paredes-portfolio/tree/main/ocupacao-deposito-demo`.

- [ ] **Step 2: Apresentar o texto ao usuário no chat**

Mostrar o texto completo na resposta, deixando claro que é uma sugestão para revisão — não será publicado sem confirmação explícita.

- [ ] **Step 3: Perguntar se o usuário quer que o post seja aberto no navegador agora**

Se o usuário confirmar, usar o Browser pane para abrir o LinkedIn e preencher o campo de post com o texto aprovado — mas o clique final em "Publicar" só acontece com confirmação explícita do usuário naquele momento, conforme a restrição global.

---

## Self-Review Notes

- **Spec coverage:** rename in-place (Task 1), estrutura de pastas mantida (nenhuma task a mexe, conforme decisão), ajuste de texto no README raiz (Task 2), texto de divulgação preparado sem publicar (Task 3), convenção de marca fictícia para demos futuras (documentada nas Global Constraints, sem ação de código necessária agora). Todos os itens do escopo da spec têm task correspondente.
- **Placeholder scan:** nenhum "TBD"/"TODO" — todos os steps têm comando exato ou texto completo.
- **Type consistency:** não aplicável (sem código/funções neste plano).
