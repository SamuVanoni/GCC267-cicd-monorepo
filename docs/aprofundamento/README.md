# Aprofundamento T05 — CI/CD em monorepo

> GCC267 · 2026/2 · Turma 14A · **vale 15% da nota** (empata com o Sprint 2 Review e
> com a entrega final — é o segundo maior peso da disciplina).

Equipe: **Gilmar Silva · Julia Ribeiro · Ruan Pablo · Samuel Vanoni**

---

## A ideia em uma frase

A sala abre um pull request de verdade, pelo celular, no minuto 3. O pipeline que julga
esses PRs é **ruim de propósito** — então a sala espera. No minuto 20 mostramos o mesmo
repositório consertado, e o que levava 4 minutos leva 20 segundos.

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
| 20–22 | Gilmar | "Vocês esperaram 4 minutos" · os números   | 15–16 |
| 22–23 | Gilmar | Auto-merge e branch protection             | 17    |
| 23–25 | Gilmar | **AO VIVO:** vocês estão no ar             | 18    |
| 25–26 | Gilmar | **AO VIVO:** o PR verde e errado + voto    | 19    |
| 26–28 | Gilmar | Verde não significa "está certo"           | 20    |
| 28–30 | Samuel | Três conclusões · material                 | 21–22 |

---

## O que tem que estar pronto ANTES da aula

- [ ] Repositório da demo criado, **separado** do repo da equipe (ver abaixo)
- [ ] Os dois workflows: o ingênuo e o consertado
- [ ] Branch protection (só status check, **sem** review obrigatório) + auto-merge
- [ ] Deploy do mural no GitHub Pages funcionando
- [ ] **PR `toca-so-o-mural` já aberto** (demo do path filter, caso 1)
- [ ] **PR `toca-o-shared` já aberto** (demo do path filter, caso 2)
- [ ] **PR `ajusta-validacao` já aberto** — o verde e errado
- [ ] **PR `exemplo-quebrado` já aberto** — reserva, caso ninguém da sala leve vermelho
- [ ] QR code gerado e colado nos slides 2 e 22
- [ ] Prints de fallback em `docs/aprofundamento/fallback/` (a rede da faculdade vai cair)
- [ ] Os números reais medidos no ensaio, trocados nos slides 13 e 16
- [ ] Material publicado em `docs/aprofundamento/` **3 dias antes** — é regra da disciplina

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
