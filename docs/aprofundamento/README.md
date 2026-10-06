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
- [ ] **Ligar o auto-merge** — ver abaixo, é o furo que sobrou
- [ ] Prints de fallback em `docs/aprofundamento/fallback/` (a rede da faculdade vai cair)
- [ ] Material publicado em `docs/aprofundamento/` **3 dias antes** — é regra da disciplina

> ⚠️ **Nenhum dos quatro PRs plantados pode ser mergeado.** O `ajusta-validacao` leva um
> bug para a `main` de propósito; o `exemplo-quebrado` é vermelho. Depois da aula, fecha
> os quatro sem merge.

### O furo do auto-merge

A regra do `README.md` da raiz promete à turma: _"se o check ficar verde, o PR entra
sozinho e seu nome aparece na página"_. **Isso não acontece hoje.** O repositório
_permite_ auto-merge (Settings → Allow auto-merge), mas permitir não é ligar: alguém
precisa ligar o auto-merge **em cada PR**, na mão ou por workflow. Como está, os 30 PRs
da turma ficam verdes e parados, ninguém entra na `main`, o `deploy.yml` não roda e o
slide 18 ("vocês estão no ar") não tem o que mostrar.

Duas saídas, as duas servem:

1. **No dia:** depois do slide 8, enquanto a Julia fala, alguém abre a lista de PRs e
   clica em "Merge" nos verdes. Com 30 PRs é chato mas dá: são dois cliques cada.
2. **Antes:** um workflow que liga o auto-merge sozinho **só** quando o PR mexe
   exclusivamente em `participantes/`. Essa restrição não é zelo — é repositório público,
   e auto-merge sem revisão em PR que toca código ou workflow é entrada aberta.

**Nada é digitado ao vivo.** Todo PR da demo está aberto antes da aula, em abas separadas,
com a tela já no estado certo. Criar commit ao vivo com projetor e wifi de faculdade é
onde a demo morre.

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
