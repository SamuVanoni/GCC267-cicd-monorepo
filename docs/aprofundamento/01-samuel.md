# Samuel — abertura (00–05) e fecho (28–30)

_Leia antes: o [índice](README.md) explica **os quatro PRs plantados** — qual serve a
qual slide, quem abre, e que **nenhum pode ser mergeado** — e **o que fazer se a internet
cair**. Os dois valem para todo mundo, não só para o seu bloco._

> Você abre e você fecha. No meio, você é o **suporte de sala** — o papel que faz a
> interação não morrer.

---

## Bloco 1 · minutos 00 a 05 · slides 1, 2 e 3

### O que você faz

Apresenta a equipe e o tema em 20 segundos, e **põe a sala a trabalhar antes de explicar
qualquer coisa**. Esse é o ponto: a interação não vem no fim, vem no minuto 3.

### Slide 1 — capa

> "Somos a equipe do projeto de hortaliças da feira livre. Gilmar, Julia, Ruan e eu. Nosso
> tema é CI/CD em monorepo — o T05. E a primeira coisa que a gente vai fazer não é falar:
> é vocês trabalharem."

Passa rápido. O tempo que importa começa no slide 2.

### Slide 2 — a instrução + QR

> "Antes de eu explicar qualquer coisa, peguem o celular. Aponta a câmera pro QR. Ele já
> abre o arquivo pronto, com o modelo dentro. Não precisa clonar nada, não precisa instalar
> nada. Troca pelos seus dados e abre um pull request. Leva uns 40 segundos."

O QR abre `github.com/.../new/main?filename=participantes/seunome.json&value=...`: o
editor já vem com o caminho e o JSON preenchidos. Ninguém da turma tem acesso de escrita,
então o GitHub pede um **fork** antes — é um clique, e o editor volta preenchido.

Depois **repita os três pontos que mais travam**:

1. Vai aparecer um botão **Fork this repository**. Clica nele, é normal.
2. Troca o `seunome` do nome do arquivo **sem espaço e sem acento** — `joaosilva.json`, não
   `joão silva.json`. Com espaço ou acento o CI passa, mas o auto-merge recusa e o PR fica
   parado.
3. No fim tem que clicar em **Create pull request**. Commit não é PR.

E avisa da fila, senão parece que quebrou:

> "Vão aparecer umas bolinhas amarelas. Isso é fila, não é erro. Já volto nisso."

### Slide 3 — o mapa dos 30 minutos

Esse slide existe pra dar tempo da sala terminar de mandar.

> "Enquanto vocês mandam, o mapa. Eu abri. A Julia vai mostrar o que o robô faz com o que
> vocês mandaram. O Ruan explica por que isso vira um problema quando o projeto tem dois
> serviços. E o Gilmar mostra o conserto, e uma pegadinha no fim que eu não vou estragar."

Embaixo da tabela fica a faixa **"Travou?"** com os três tropeços mais comuns (Fork que
não responde, commit sem PR, bolinha amarela). Ela fica na tela enquanto a sala manda —
aponta pra ela uma vez e segue.

A frase mais importante deste slide não está escrita nele — **fala ela olhando pra sala**:

> "O que vocês mandarem agora é o que vai estar na tela no minuto 20."

É isso que faz as pessoas mandarem de verdade em vez de só assistir.

**Se a sala estiver lenta:** fica mais um pouco aqui. Pergunta "quantos já conseguiram?" e
pede pra quem conseguiu ajudar o vizinho. **Não passe adiante com 3 PRs.**

Fecha: _"Julia, é sua."_

---

## Do minuto 5 ao 28 · você é o suporte de sala

**Desce do palco e circula entre as mesas.** Quem estiver travado, você resolve no celular
da pessoa.

Os travamentos que vão aparecer, em ordem de frequência:

| Sintoma                      | O que é                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "abriu o app do GitHub"      | o app não cria arquivo. **⋯** → **Open in browser**                                                                 |
| "o botão Fork não faz nada"  | navegador embutido do leitor de QR: abre no navegador de verdade. No Brave, desliga o **Shields** para o github.com |
| "não abre o link"            | sem conta no GitHub — manda logar, 1 minuto                                                                         |
| "commitei mas não apareceu"  | não clicou em **Create pull request**                                                                               |
| "deu erro de JSON"           | vírgula sobrando na última linha, ou aspas curvas do teclado do iPhone                                              |
| "ficou verde mas não entrou" | nome do arquivo com espaço, acento ou fora de `participantes/`: o auto-merge recusou. Renomeia no próprio PR        |
| "Workflow awaiting approval" | conta criada há pouco: o GitHub segura os checks. **Approve and run** no PR — você é admin, é com você              |

**Anote mentalmente onde a sala mais travou.** Você vai usar isso no fecho, e é o detalhe
que mostra que a interação não foi enfeite.

Você volta ao palco no minuto 28.

---

## Bloco 2 · minutos 28 a 30 · slides 21 e 22

### Slide 21 — as três conclusões

> "Fecho com três. **Um:** põe `paths` no workflow de vocês hoje. São quatro linhas, e todo
> mundo aqui vai ter dois serviços no mesmo repositório até o Encontro 6. **Dois:** quando
> der vermelho, não lê o log — lê o fim do log. **Três:** verde é o que vocês ensinaram o
> robô a conferir, e nada mais."

Três frases curtas. **Não desenvolva nenhuma** — elas já foram desenvolvidas.

E aqui entra o que você viu circulando:

> "E um recado de quem ficou andando na sala: metade de vocês travou em esquecer de clicar
> em 'Create pull request'. Commit não é PR. Guardem isso."

(Troque pelo que de fato aconteceu.)

### Slide 22 — material

> "Tudo isso está no nosso repositório, em `docs/aprofundamento` — os dois workflows
> inteiros, o passo a passo de como filtrar job por job, que não cabia aqui, e o link do
> repo da demo pra quem quiser mexer. Está publicado desde [X dias atrás]."

**Diga em voz alta que está publicado há dias.** A regra da disciplina é material no
repositório com 3 dias de antecedência, e dizer isso na frente do professor não custa nada.

> "Obrigado. Perguntas?"

**Os quatro ficam de pé na frente durante as perguntas.** O professor escreveu que "um
integrante falando e três calados" não conta.

**As três perguntas que mais provavelmente vêm, e quem responde.** Combinem isso antes:
na arguição, hesitar custa mais caro que errar.

1. _"Quanto custa rodar isso?"_ → **Gilmar:** "repositório público tem Actions de graça,
   sem limite de minutos. Repo privado tem cota mensal. Por isso o professor pediu repo
   público."
2. _"Como faz isso com Docker/Compose, que é o nosso caso?"_ → **Ruan:** "mesma ideia — o
   filtro é por pasta, não por linguagem. O que muda é que build de imagem compensa cache
   de layer, e isso está no material."
3. _"Isso não é over-engineering pra um projeto de faculdade?"_ → **Julia**, e é a melhor
   pergunta pra receber: "seria, se fosse só velocidade. Mas no Encontro 8 o professor vai
   pedir deploy e segredos fora do Git. Sem pipeline, isso vira alguém subindo arquivo a
   mão na véspera."

Se ninguém perguntar nada, não force: _"se aparecer dúvida depois, chama qualquer um de
nós."_ Silêncio no fim é normal, e melhor que enrolação.

---

## Erros a evitar

- **Explicar CI/CD no seu bloco.** Não é seu. Seu bloco é "faça agora".
- **Andar com QR impresso de mesa em mesa.** Custa 2 minutos de silêncio. O QR fica no
  slide, grande, e pequeno no canto dos slides seguintes.
- **Ficar no palco depois do minuto 5.** Seu lugar é na sala.
- **Contar a armadilha.** Que o pipeline é ruim de propósito só o Gilmar revela, no 20.
