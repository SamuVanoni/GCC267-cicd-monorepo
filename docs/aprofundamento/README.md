# Aprofundamento T05 — CI/CD em monorepo

> GCC267 · 2026/2 · Turma 14A · **vale 15% da nota** (empata com o Sprint 2 Review e
> com a entrega final — é o segundo maior peso da disciplina).

Equipe: **Gilmar Silva · Julia Ribeiro · Ruan Pablo · Samuel Vanoni**

---

## A ideia em uma frase

A sala abre um pull request de verdade, pelo celular, no minuto 3. O pipeline que julga
esses PRs é **ruim de propósito** — então a sala espera. No minuto 20 mostramos o mesmo
repositório consertado: o pipeline ingênuo rodou **12 suítes de teste**, o consertado rodou
**1**.

**A espera é a aula.** A sala não acredita que ficou mais rápido: ela esperou.

Isso encaixa em dois dos formatos que o professor listou como "que funcionam":
**comparação de duas soluções reais** e **código com bug plantado para a turma caçar**.

---

## Papéis — ninguém fica calado

| Pessoa     | Fala          | Opera o telão | Outra função                       |
| ---------- | ------------- | ------------- | ---------------------------------- |
| **Samuel** | 00–05 e 28–30 | —             | **suporte de sala** do min 5 ao 28 |
| **Julia**  | 05–12         | —             | **cronômetro** do min 12 ao 30     |
| **Ruan**   | 12–20         | 05–12 e 20–28 | —                                  |
| **Gilmar** | 20–28         | 00–05 e 12–20 | guarda o PR plantado               |

**Quem fala não mexe no telão.** Nunca.

O **suporte de sala** é o papel que faz a interação não morrer: desce do palco, circula
entre as mesas e resolve no celular de quem travou. Sem ele, metade da sala desiste no
minuto 4 e o reveal do minuto 20 não tem material.

O **cronômetro** avisa os cortes com a mão (3 minutos, 1 minuto, corta). O professor
interrompe aos 30.

---

## A linha do tempo

| Min   | Quem   | O que acontece                             | Slide |
| ----- | ------ | ------------------------------------------ | ----- |
| 00–02 | Samuel | Grupo e tema                               | 1     |
| 02–05 | Samuel | A instrução + QR. A sala abre os PRs       | 2–3   |
| 05–07 | Julia  | O pipeline é quem diz não · CI e CD        | 4–5   |
| 07–09 | Julia  | O pipeline que está rodando agora          | 6     |
| 09–10 | Julia  | **AO VIVO:** a parede de verde e vermelho  | 7     |
| 10–12 | Julia  | Como ler um log de CI                      | 8     |
| 12–13 | Ruan   | Mudei um arquivo, rodou tudo               | 9     |
| 13–15 | Ruan   | O que é monorepo, e o preço dele           | 10    |
| 15–16 | Ruan   | O desperdício, em 3 jobs                   | 11    |
| 16–18 | Ruan   | **Path filter** — o slide técnico central  | 12    |
| 18    | Ruan   | Cache                                      | 13    |
| 18–20 | Ruan   | **AO VIVO:** dois commits, dois resultados | 14    |
| 20–22 | Gilmar | "Vocês esperaram" · 12 suítes contra 1     | 15–16 |
| 22–23 | Gilmar | Auto-merge e branch protection             | 17    |
| 23–25 | Gilmar | **AO VIVO:** vocês estão no ar             | 18    |
| 25–26 | Gilmar | **AO VIVO:** o PR verde e errado + voto    | 19    |
| 26–28 | Gilmar | Verde não significa "está certo"           | 20    |
| 28–30 | Samuel | Três conclusões · material                 | 21–22 |

---

## Os quatro PRs plantados — o que é cada um

Eles **já estão abertos** no repositório, com os checks já rodados. Ninguém cria nada ao
vivo: é só abrir a aba certa. Cada um serve a um slide, e quem apresenta aquele slide é
quem abre.

| PR                                                              | Branch             | Slide | Quem abre | O que a sala vê                                                                                     |
| --------------------------------------------------------------- | ------------------ | ----- | --------- | --------------------------------------------------------------------------------------------------- |
| [#3](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/3) | `toca-so-o-mural`  | 14    | Ruan      | Mexeu em 1 arquivo do mural: **um job roda, dois ficam _skipped_**. É o path filter funcionando.    |
| [#4](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/4) | `toca-o-shared`    | 14    | Ruan      | Mexeu em `packages/shared/`: **os três jobs acordam**. É o filtro sendo honesto, não falhando.      |
| [#5](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/5) | `ajusta-validacao` | 19    | Gilmar    | Um diff de **uma linha**, **todos os checks verdes** — e o código está errado. A sala vota.         |
| [#6](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/6) | `exemplo-quebrado` | 7 e 8 | Julia     | O **vermelho de reserva**: `"tema": "T5"` em vez de `"T05"`. É nele que a aula de ler log acontece. |

**O #5 é o único cuja descrição não entrega o truque, e isso é de propósito:** a sala lê o
PR durante o voto. Se alguém da equipe abrir a aba Conversation dele antes da hora e ler em
voz alta, o slide 19 morre.

**O #6 é o seguro da apresentação.** Se ninguém da turma levar vermelho — acontece — é ele
que vira a tela dos slides 7 e 8. **Nunca fique sem um vermelho no telão.**

> ⚠️ **NENHUM DOS QUATRO PODE SER MERGEADO.** O `ajusta-validacao` levaria um bug para a
> `main` de propósito; o `exemplo-quebrado` é vermelho e nem conseguiria entrar. Depois da
> aula, fecha os quatro **sem merge** — o GitHub guarda tudo, dá para reabrir se precisar.

---

## Se a internet cair

A rede da faculdade vai cair, e o plano não é torcer para não cair. Os prints estão em
[`fallback/`](fallback/), **um por slide**, com o número do slide no nome do arquivo:
`slide07-...`, `slide08-...`, `slide14-...`, `slide18-...`, `slide19-...`. O
[`fallback/README.md`](fallback/README.md) diz o que cada print mostra.

**Abram a pasta no celular ANTES de começar.** Com a rede caída não dá para baixar nada, e
um print que precisa de internet para abrir não é print de reserva.

**E diga em voz alta que é print.** A frase está nas colinhas: _"a rede caiu, mas o print é
do ensaio, com os mesmos passos."_ Fingir que é ao vivo é o jeito de transformar um problema
de rede em um problema de credibilidade — e o professor está na sala.

**O slide 18 é o único que o fallback não salva.** Ele existe para cada pessoa achar o
**próprio** nome, e o print tem os nomes do ensaio. Mostra, explica o que aconteceria, e
segue — não tenta disfarçar.

---

## O que tem que estar pronto ANTES da aula

- [x] Repositório da demo criado, **separado** do repo da equipe (ver abaixo)
- [x] Os dois workflows: o ingênuo e o consertado
- [x] Branch protection: `fim` é o status check obrigatório, **sem** review
- [x] Deploy do mural no GitHub Pages funcionando — <https://samuvanoni.github.io/GCC267-cicd-monorepo/>
- [x] **PR [#3 `toca-so-o-mural`]** — path filter, caso 1: 1 job roda, 2 ficam _skipped_
- [x] **PR [#4 `toca-o-shared`]** — path filter, caso 2: os 3 acordam
- [x] **PR [#5 `ajusta-validacao`]** — o verde e errado, 3 checks verdes
- [x] **PR [#6 `exemplo-quebrado`]** — o vermelho de reserva
- [x] QR code gerado e colado nos slides 2 e 22 (os dois apontam para **este** repo)
- [x] Os números reais medidos, trocados nos slides 8, 13, 15 e 16 — ver [`medicao.md`](medicao.md)
- [x] **Auto-merge ligado** — `.github/workflows/auto-merge.yml`, testado no PR #7
- [ ] **No slide 18, clicar em `Run workflow` no deploy** — ele **não** roda sozinho; ver abaixo
- [x] Prints de fallback em [`fallback/`](fallback/) — 9 prints + o log em texto, com
      [`fallback/README.md`](fallback/README.md) dizendo qual serve a qual slide
- [ ] **Abrir a pasta `fallback/` no celular antes de começar** — com a rede caída não
      dá para baixar nada
- [ ] Material publicado em `docs/aprofundamento/` **3 dias antes** — é regra da disciplina

> ⚠️ **Nenhum dos quatro PRs plantados pode ser mergeado** — ver a seção acima.

### O auto-merge — ligado em 06/10/2026, e a pegadinha que ele revelou

A regra do `README.md` da raiz promete à turma: _"se o check ficar verde, o PR entra
sozinho e seu nome aparece na página"_. Hoje **metade** disso é verdade.

**O que já funciona.** O workflow `.github/workflows/auto-merge.yml` liga o auto-merge em
todo PR que mexe **só** em `participantes/*.json` (de 1 a 3 arquivos). Qualquer coisa fora
disso ele recusa e deixa para revisão humana — é repositório público, e auto-merge sem
revisão em PR que toca código ou workflow é porta aberta. Medido no PR #7: o PR entrou
**sozinho**, sem ninguém clicar, segundos depois de o `fim` ficar verde.

**⚠️ O que NÃO funciona: a página não atualiza.** O motivo é uma regra do GitHub que vale
saber: **push feito pelo `GITHUB_TOKEN` não dispara workflow.** Ela existe para evitar
workflow que se chama em loop. Como foi o Actions que ligou o auto-merge, o merge na `main`
conta como push do robô — e o `deploy.yml`, que roda em `push: main`, **não roda**. Medido:
o arquivo de teste entrou na `main` (commit `fa57a43`) e a página continuou sem ele.

Então o furo não fechou, ele **andou um passo**: antes os PRs não entravam; agora entram e
a página não sai.

**A saída para o dia — e ela é melhor para a apresentação.** O `deploy.yml` tem
`workflow_dispatch`. No slide 18, com a aba já aberta em _Actions → deploy → Run workflow_,
alguém clica **ao vivo**. Um clique, ~40 segundos, e os 30 nomes aparecem de uma vez, com
causa e efeito na tela. É melhor do que a página ter atualizado sozinha minutos antes, sem
ninguém ver.

**A saída definitiva, se um dia quiser 100% automático:** ligar o auto-merge com um PAT
(token pessoal) guardado em secret, em vez do `GITHUB_TOKEN`. Aí o merge conta como push de
pessoa e o deploy roda sozinho. Custa criar o token e guardar o secret, e **não é necessário
para a aula**.

## No dia, antes de começar

**Nada é digitado ao vivo.** Criar commit ao vivo com projetor e wifi de faculdade é onde a
demo morre. Tudo já está pronto — o trabalho do dia é só deixar as telas no estado certo.

- [ ] **Abrir a pasta [`fallback/`](fallback/) no celular.** Com a rede caída não dá para
      baixar nada.
- [ ] Abrir as abas, nesta ordem, e **deixar todas abertas**:
      a lista de PRs · os PRs [#3](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/3), [#4](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/4), [#5](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/5) e [#6](https://github.com/SamuVanoni/GCC267-cicd-monorepo/pull/6) ·
      **Actions → deploy → Run workflow** · a [página do mural](https://samuvanoni.github.io/GCC267-cicd-monorepo/)
- [ ] Conferir quem **opera o telão** em cada bloco — e lembrar: **quem fala não mexe no
      telão**.
- [ ] Combinar o sinal do cronômetro (3 minutos, 1 minuto, corta).

> ⚠️ **Não abra a aba Conversation do PR #5.** A descrição dele não entrega o truque de
> propósito — a sala lê aquilo durante o voto. Ler em voz alta antes da hora mata o
> slide 19.

**Durante, os dois que mais escapam:**

- **Slide 18: clicar em `Run workflow` ANTES de pedir o F5.** O deploy não sai sozinho — o
  porquê está na seção do auto-merge, acima.
- **Slide 7: se ninguém da turma levou vermelho, abre o PR #6.** Nunca fique sem um vermelho
  no telão.

**Depois da aula:** fechar os quatro PRs plantados **sem merge** — ver a seção deles.

---

## Por que o repo da demo é separado

1. **"main sempre verde" é regra da matéria.** 30 PRs de desconhecidos no repo avaliado é
   risco puro.
2. A demo precisa de um **workflow propositalmente ruim**. Isso sujaria o histórico que
   vale nota.
3. **Auto-merge sem review contraria "PR com revisão obrigatória"**, que é ferramenta
   obrigatória da disciplina.

**Tudo mora aqui, neste repositório** — código, workflows, slides e esta colinha. O
`hortalicas-feiralivre` é só para os desafios da disciplina e não é tocado.

O slide do Encontro 1 pede "material prévio publicado **no repositório** com pelo menos 3
dias de antecedência" — sem dizer qual. Este repositório é público e cumpre isso.

---

## O ensaio

Ensaiem **três vezes**, com cronômetro, as três demos ao vivo. Não ensaiem a fala inteira
palavra por palavra — ensaiem as transições (quem passa pra quem) e os cliques.

E todos precisam saber explicar **tudo**: na vitrine o professor sorteia quem apresenta, e
na arguição ele pergunta o porquê, não o como.
