# Julia — o pipeline e o log (05–12)

> Seu bloco tem a definição **e** a parte mais útil da apresentação inteira: ensinar a sala
> a ler um log de CI. Noventa por cento deles vai ver um X vermelho na quinzena que vem e
> não vai saber onde clicar.

Antes do minuto 5 você **opera o telão** para o Samuel. No minuto 12 você vira
**cronômetro** até o fim.

---

## Slide 4 · minuto 05 · "O pipeline é quem diz não"

**Não comece com "CI significa integração contínua".** Todo mundo já ouviu e ninguém
lembra. Comece pelo que o pipeline _faz_.

> "Deixa eu dar a definição mais curta que existe. O pipeline é quem diz não. Não é um
> assistente, não é automação pra te ajudar. É um porteiro. Ele olha o que você escreveu e
> decide se entra ou não entra."

E conecta com a disciplina:

> "E a razão de ele existir é que 'testei na minha máquina e funcionou' não vale nada numa
> equipe de quatro. O professor falou isso no Encontro 1 de outra forma: main sempre verde.
> Quem garante isso não é a boa vontade de ninguém, é o porteiro."

**40 segundos.** Se alguém perguntar a diferença entre CI e CD aqui, segura: _"próximo
slide"_.

---

## Slide 5 · minutos 05 a 07 · as duas letras

> "CI é integração contínua. Toda vez que alguém abre um PR — tipo os que vocês acabaram de
> abrir — o robô baixa o código de vocês, instala, compila e roda os testes. E o resultado
> disso é uma coisa só: um check verde ou um X vermelho.
>
> CD é o que acontece **depois** do verde: o código vai pro ar sozinho. Ninguém sobe nada
> à mão."

Aponta a linha preta de baixo com a mão:

> "Install, build, test — isso é CI. Deploy — isso é CD. E só isso. O resto é detalhe de
> ferramenta."

**Pergunta que sempre vem:** "entrega contínua ou implantação contínua?"

> "Continuous delivery e continuous deployment são diferentes — delivery deixa pronto pra
> alguém apertar o botão, deployment aperta sozinho. Hoje a gente vai fazer deployment:
> vai sozinho."

Não gaste mais de 20 segundos nisso.

**Cuidado:** não fale "pipeline" sem antes dizer que pipeline é só o nome da sequência
dessas etapas. Metade da sala acha que é uma ferramenta.

---

## Slide 6 · minutos 07 a 09 · o pipeline que está rodando agora

> "Isso aqui é o pipeline que está julgando os PRs de vocês neste segundo. Dez linhas. Ele
> baixa o código, instala as dependências e roda os testes. Funciona. E é exatamente o que
> a gente escreve no primeiro dia de qualquer projeto."

Aponta as duas linhas vermelhas:

> "Sem cache, ele baixa as dependências do zero toda vez. E sem filtro: não importa o que
> você mudou, ele testa os três pacotes. **Guardem essa segunda parte.**"

A frase que planta a semente:

> "Repara que ele não faz ideia do que vocês mudaram. Vocês mudaram **um** arquivo de texto
> com o nome de vocês. E ele está rodando os testes da API."

Se alguém já reclamar "mas isso é burro" — perfeito:

> "É. Segura essa raiva por 10 minutos."

**NÃO CONTE que o pipeline é ruim de propósito.** Isso é do Gilmar, no minuto 20. Você
apresenta como "o pipeline normal".

**90 segundos.** Não explique YAML linha por linha.

---

## Slide 7 · minutos 09 a 10 · AO VIVO: a parede

Isso é uma **deixa**, não um slide. O Ruan troca para o navegador, na aba de Pull Requests.

**O que mostrar, nesta ordem:**

1. A lista de PRs com os checks ao lado. **Deixa 5 segundos em silêncio** — a sala procura
   o próprio nome.
2. Abre **um verde**. Mostra o check e o tempo que levou.
3. Abre **um vermelho**. Não explique ainda.

> "Isso aqui são vocês. Cada linha é um PR. O que está verde passou, o que está vermelho o
> porteiro barrou. Quem levou vermelho: não é vergonha, é a parte boa da aula — vocês vão
> consertar em um minuto."

**Se ninguém levou vermelho:** abre o PR **#6 `exemplo-quebrado`**, que está plantado no
repo. **Nunca fique sem um vermelho na tela** — é nele que está a aula. O erro dele é o mais
comum de verdade: `"tema": "T5"` em vez de `"T05"`.

**⚠️ Nesse PR três checks aparecem como _cancelled_, e não é bug.** A matriz do
`ci-ingenuo` roda as quatro versões de Node; quando a 18 falha, o GitHub cancela as outras
três (é o `fail-fast`, que vem ligado). Se alguém perguntar, a resposta cabe numa frase:
_"a primeira versão falhou, então ele parou de gastar máquina com as outras"_. Não entre
em matriz — é assunto do Ruan.

**⚠️ Nos PRs da turma vai aparecer uma linha a mais: `liberar o merge automatico`.** Essa é
nossa — é ela que liga o auto-merge em todo PR que mexe só em `participantes/`. Em uma
frase: _"essa é a parte que mergeia sozinho quando o check passar"_. **No `#6` essa linha
não aparece**, porque ele foi aberto antes do workflow existir; não é bug, e ninguém da
sala vai notar.

**Se a internet caiu:** abre o print em `docs/aprofundamento/fallback/` e diga a verdade —
_"a rede caiu, mas o print é do ensaio de ontem com os mesmos passos"_. Honestidade é
melhor que improviso.

**Máximo 90 segundos.** A aula é o próximo slide.

---

## Slide 8 · minutos 10 a 12 · como ler um log

**Este é o slide mais valioso da apresentação inteira. Não corra.**

> "Quem levou vermelho está com uma tela cheia de texto na frente. E a reação normal é
> fechar. Então olha o único truque que importa: **você não lê o log. Você lê o fim do
> log.**"

Vai nos 4 passos com a mão no slide, devagar:

1. Clica no X vermelho → **Details**
2. Acha o **step vermelho** — os de cima dele passaram
3. Vai pro **fim** do log
4. Procura a primeira linha **`Error:`** — a de cima dela diz o arquivo

Aponta o bloco preto da direita:

> "Repara: tem 400 linhas de coisa inútil em cinza. A informação está em três linhas: o que
> falhou, por que, e em qual arquivo. Sempre nessa ordem, sempre no fim."

Fecha devolvendo o controle pra sala:

> "Quem está vermelho, conserta agora. É só clicar no lápis no próprio arquivo, arrumar, e
> commitar. O robô roda de novo sozinho."

**Dá 60 segundos de silêncio** pra galera consertar — o Samuel está circulando e é aqui que
ele é mais necessário.

Fecha: _"Ruan, pode vir."_

---

## Erros a evitar

- **Falar "stack trace", "exit code" ou "runner" sem explicar.** A sala é de 7º período
  mas quase ninguém usou Actions ainda.
- **Correr o slide 8.** É o que a sala vai usar na quinzena que vem.
- **Contar a armadilha do pipeline lento.** É do Gilmar.
- **Explicar o YAML linha por linha** no slide 6. A sala não precisa ler, precisa entender
  que ele é cego pro diff.

---

## A pergunta difícil que pode te sobrar

**"Isso não é over-engineering pra um projeto de faculdade?"** — pode vir nas perguntas
finais, e é **sua** para responder. É a melhor pergunta que vocês podem receber:

> "Seria, se fosse só velocidade. Mas no Encontro 8 o professor vai pedir deploy e segredos
> fora do Git. Sem pipeline, isso vira alguém subindo arquivo à mão na véspera."
