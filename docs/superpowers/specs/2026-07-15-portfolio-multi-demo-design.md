# Reestruturação para portfolio multi-demo

## Contexto

O repositório `ocupacao-deposito-demo` foi criado para hospedar uma única demo
(Painel de Ocupação de Depósito, derivada de um sistema real da Nova DAG). O
objetivo agora é transformá-lo no repositório de portfólio geral de Victor
Paredes, que vai receber novas demos periodicamente — cada uma derivada de um
módulo diferente do sistema da Nova DAG, com identidade da empresa removida.

## Decisões

1. **Rename in-place**, não repo novo. O repo atual tem só 1 commit e ainda
   não foi divulgado (nem no LinkedIn), então não há risco de quebrar links
   externos. GitHub mantém redirect automático da URL antiga após o rename.
2. **Novo nome**: `victor-paredes-portfolio` (owner: `jvictorsparedes`).
3. **Estrutura de pastas**: uma subpasta por demo na raiz do repo (padrão já
   usado por `ocupacao-deposito-demo/`), cada uma com README próprio. O
   `README.md` da raiz funciona como índice, com uma entrada por demo — esse
   padrão já existe e não precisa de mudança estrutural, só pequenos ajustes
   de texto para deixar claro que é um portfólio vivo, em crescimento.
4. **Marca fictícia compartilhada**: todas as demos futuras reutilizam
   "Distribuidora Modelo" como identidade fictícia, para dar consistência
   narrativa ao portfólio (em vez de uma marca nova por demo).
5. **LinkedIn**: quando solicitado, uso o Browser pane para preencher um post
   no LinkedIn, mas a publicação final (clicar em "Publicar") sempre exige
   confirmação explícita do usuário na hora — nunca publico sozinho.

## Escopo desta mudança

- Renomear o repositório no GitHub via `gh repo rename`.
- Atualizar o `git remote` local para a nova URL.
- Pequenos ajustes de texto no `README.md` raiz (sem mudança estrutural).
- Preparar (sem publicar) um texto de divulgação da demo
  `ocupacao-deposito-demo` para o LinkedIn, já que ela nunca foi postada.

## Fora de escopo

- Criar a próxima demo em si (será pedida sob demanda, dia a dia).
- Qualquer automação/agendamento do fluxo de criação de demos — é um processo
  manual, sob pedido do usuário.
- Publicar de fato no LinkedIn — só preparo o conteúdo; a publicação em si
  precisa de aprovação explícita a cada vez.

## Convenção para demos futuras (para referência do assistente)

Toda nova demo baseada em um sistema da Nova DAG deve:

- Reutilizar a marca fictícia "Distribuidora Modelo".
- Remover toda identidade real da empresa original (nome, logo, cores,
  localização, dados reais, credenciais).
- Viver em sua própria subpasta na raiz do repo, com README próprio seguindo
  o padrão de `ocupacao-deposito-demo/README.md` (o que o sistema faz, stack,
  diferenças em relação ao original, como rodar localmente).
- Ganhar uma nova entrada no `README.md` raiz.
