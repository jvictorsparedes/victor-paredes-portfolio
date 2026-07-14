# Painel de Ocupação de Depósito — Demo

Demonstração de um sistema de gestão logística para acompanhamento em tempo real
da ocupação de um depósito, desenvolvida por **Victor Paredes** para fins de
portfólio.

> Esta é uma versão **de demonstração**, derivada de um sistema real que uso no
> meu dia a dia como Analista de Logística. Toda identidade visual da empresa
> original (logo, nome, cores de marca, localização) foi removida e substituída
> por uma marca fictícia ("Distribuidora Modelo"). A conexão com banco de dados
> real também foi removida: os dados aqui são apenas de exemplo e ficam salvos
> localmente no seu navegador.

## O que o sistema faz

- Calcula a **saturação (%) de ocupação** de um depósito dividido em dois
  setores (aqui chamados "Alimentos" e "Saneantes"), a partir da quantidade de
  posições disponíveis e de itens em trânsito informados.
- Classifica automaticamente o status por faixa de saturação: **Normal**,
  **Atenção**, **Crítico** e **Sobrecapacidade**.
- Destaca o indicador de **"Transitório Sem Endereço"** — itens em trânsito que
  excedem as posições disponíveis, sinalizando risco operacional.
- Gera uma **imagem (PNG) de relatório**, pronta para compartilhar por
  WhatsApp, com os indicadores do dia.
- Mantém um **histórico filtrável por período**, com edição e exclusão
  (soft-delete) de registros.

## Stack

HTML, CSS e JavaScript puro (sem framework, sem build step) — o mesmo padrão
usado nos sistemas internos que desenvolvo, com um design system próprio
(tokens de cor, tipografia, componentes de UI reutilizáveis).

- `index.html` — aplicação (marcação, estilos específicos da tela e lógica)
- `styles_base.css` — tokens de design (cores, tipografia) e componentes base
  (cabeçalho, KPIs, cards, tabelas, botões)
- `ui_base.js` — modal de confirmação e toast de aviso, reutilizáveis
- `vendor/html2canvas.min.js` — biblioteca de terceiros usada para gerar o PNG

## Diferenças em relação ao sistema original (produção)

| Original | Nesta demo |
|---|---|
| Login obrigatório para gravar (Supabase Auth) | Sem login — qualquer visitante pode testar |
| Dados gravados no Supabase (banco real da empresa) | Dados gravados no `localStorage` do navegador |
| Logo e nome da empresa real | Marca fictícia ("Distribuidora Modelo") |
| Botão "Voltar ao Portal" (suíte interna de sistemas) | Removido — este é um sistema avulso |

A lógica de cálculo de saturação, o layout e o design system são os mesmos da
versão em produção.

## Como rodar localmente

Não requer instalação nem servidor. Basta abrir o `index.html` num navegador —
ou, para evitar restrições de `file://` em alguns navegadores, servir a pasta
com qualquer servidor estático simples, por exemplo:

```bash
npx serve .
# ou
python -m http.server 8080
```

Ao carregar pela primeira vez, o histórico já vem com alguns registros de
exemplo (dados fictícios) para ilustrar as diferentes faixas de status.

---

Feito por Victor Paredes — Analista de Logística.
