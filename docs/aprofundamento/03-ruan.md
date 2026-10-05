# Ruan — monorepo, path filter e cache (12–20)

> Seu bloco é o **conteúdo técnico do T05**. É aqui que o tema registrado se cumpre: não é
> "CI/CD", é "CI/CD **em monorepo**", e o que diferencia os dois é o path filter.

Antes do minuto 12 você **opera o telão** para a Julia. Do 20 ao 28, opera para o Gilmar.

---

## Slide 9 · minutos 12 a 13 · "Mudei um arquivo. Rodou tudo."

A sala acabou de **esperar** o pipeline lento. Seu trabalho aqui é dar nome ao que eles
sentiram.

> "Vocês acabaram de esperar. Alguém contou quanto?" (pausa) "Uns três, quatro minutos.
> Agora pensa no que vocês mudaram: um arquivo de texto com o nome de vocês. E o robô
> rodou os testes da API. E os do mural. E os da biblioteca compartilhada."

A frase de fechamento, devagar:

> "Três vezes o trabalho. Zero vezes o motivo."

E aqui você conecta com o projeto deles, que é o que faz esse tema valer os 15%:

> "E isso vai acontecer com **todas as nove equipes**. Porque no fim do semestre todo mundo
> aqui vai ter dois serviços, dois bancos e um broker no mesmo repositório. E quando a
> suíte inteira levar 20 minutos, vocês vão parar de abrir PR pequeno. Aí a main para de
> ficar verde."

**60 segundos.** Slide de impacto, não de conteúdo.

---

## Slide 10 · minutos 13 a 15 · o que é monorepo

> "Monorepo é simples de explicar: em vez de um repositório por serviço, tudo mora junto.
> Essa árvore da esquerda é a do nosso projeto, e vai ser parecida com a de todos vocês:
> dois apps, uma biblioteca que os dois usam, e uma pasta de workflows."

Aponta o cartão verde:

> "A vantagem é real. Quando vocês mudarem um contrato entre a API e o front, um PR só muda
> os dois lados. Não tem aquela dança de 'mergeei aqui, agora merge lá'."

Aponta o cartão vermelho — **e aqui está a aula**:

> "O preço é que o pipeline perde a noção. Num repo por serviço, mudar a API só podia
> disparar o teste da API. Aqui, se você não ensinar, ele trata tudo como uma coisa só. E
> foi isso que vocês esperaram."

A última linha do slide conecta com a rubrica:

> "O professor pediu dois serviços implantáveis **sozinhos**. Se o pipeline não sabe separar
> os dois, eles não são independentes de verdade — são dois módulos com cara de serviço."

**Pergunta que vem:** "não seria melhor dois repositórios?"

> "Para equipes grandes, às vezes. Para quatro pessoas em um semestre, não: você dobra o
> setup, dobra o CI e ainda tem que sincronizar versão. Mas essa é a **resposta defendida**,
> não a resposta certa — é exatamente o tipo de coisa que vai no ADR de vocês."

(Essa última parte é de propósito: o professor escreveu *"não há resposta certa, há resposta
defendida"*. Usar a frase dele vale ponto.)

---

## Slide 11 · minutos 15 a 16 · o desperdício

> "Olha o que aconteceu de verdade. Um arquivo mudou — o json com o nome. E o robô rodou
> três jobs. Um deles precisava rodar: o do mural, porque é o mural que lê esses arquivos.
> Os outros dois foram desperdício puro."

A frase mais importante do slide, **devagar**:

> "E repara: os três ficaram **verdes**. Esse é o pior caso. Quando o desperdício falha,
> alguém reclama. Quando ele passa, ninguém percebe nunca — só a conta de tempo cresce."

Conecta com a vida deles:

> "Multiplica isso por quatro pessoas abrindo PR por quinzena durante oito quinzenas."

Se perguntarem *"e se o shared mudar?"* — ótima pergunta, segura: *"é justamente o caso
difícil, e é o próximo slide."*

**60 segundos.** Uma ideia só.

---

## Slide 12 · minutos 16 a 18 · PATH FILTER

**É o slide técnico central do T05.** Se a sala levar uma coisa só daqui, é esta.

> "O conserto cabe em quatro linhas de YAML. Isso aqui se chama **path filter**. Você dá
> pro job uma lista de pastas que interessam a ele. Se o PR não tocou em nenhuma delas, o
> job não roda."

Mostra os dois casos de baixo com a mão:

> "Mudou um json em `participantes`? O mural roda, os outros dois pulam. Mudou o `shared`?
> Os três rodam."

A parte que mostra que você entendeu de verdade — não é só copiar YAML:

> "Repara que o `shared` acordar todos **não é um bug**. É o preço do código compartilhado:
> se a biblioteca que os dois usam mudou, você não sabe quem quebrou. O filtro não serve
> pra rodar menos — serve pra rodar o **certo**."

**Detalhe técnico que vale dizer:**

> "O job que pula aparece como **skipped**, não como falha. Isso importa porque se você
> exigir aquele check pro merge, o PR trava pra sempre esperando um job que nunca vai
> rodar. É uma pegadinha clássica."

**Se perguntarem pelo caso de vários jobs no mesmo workflow:**

> "O `paths` do `on` filtra o workflow inteiro. Para filtrar job por job, a gente usa um job
> que detecta o diff e os outros com `needs` + `if`. Está escrito no material que a gente
> publicou no repo."

**Não abra esse assunto no palco.** Não cabe em 30 minutos, e está no material.

---

## Slide 13 · minuto 18 · cache

**45 segundos.**

> "Segundo conserto, e esse é quase de graça. A máquina que roda o CI nasce limpa e é
> destruída no fim. Então sem cache ela baixa as mesmas 400 dependências em cada PR, pra
> sempre."

Aponta a linha amarela:

> "Uma linha. `cache: npm`. E o install cai de 38 segundos pra 4."

A frase boa:

> "Não é otimização prematura. É parar de pagar a mesma conta duas mil vezes."

**⚠️ Troque os números pelos reais que vocês medirem no ensaio.** O Actions mostra o tempo
de cada step. Se o professor perguntar de onde saiu e a resposta for "a gente leu na
internet", perde credibilidade.

Se perguntarem como o cache sabe quando invalidar:

> "Ele usa o hash do `package-lock`. Mudou a lista de dependências, o cache é refeito. Não
> mudou, reaproveita."

Isso é suficiente. Não vá mais fundo.

---

## Slide 14 · minutos 18 a 20 · AO VIVO: dois commits

Deixa, não slide. O Gilmar troca para o navegador.

**Os dois PRs já têm que estar abertos antes da aula.** Você não digita nada ao vivo.

1. Abre o PR **`toca-so-o-mural`**. Aba Checks: **um** job verde, **dois** com ícone de
   skipped.
   > "Um job rodou. Os outros dois nem acordaram."
2. Abre o PR **`toca-o-shared`**. **Três** jobs rodando.
   > "Mexi na biblioteca que os dois usam. Agora o robô não sabe quem eu quebrei, então ele
   > testa todo mundo. E isso está certo."
3. Devolve: *"Gilmar."*

**Aponte a palavra "skipped" na tela com o cursor.** É a prova visual do slide anterior.

**Se caiu a internet:** os dois prints estão em `docs/aprofundamento/fallback/`.

---

## Erros a evitar

- **Digitar commit ao vivo.** Os PRs estão prontos. Só clique.
- **Entrar no `needs` + `if`.** Está no material. No palco, não cabe.
- **Usar números inventados** nos slides 13 e 16.
- **Esquecer de dizer que o `shared` acordar todos está certo.** Sem isso parece que o
  filtro está mal feito.

---

## A pergunta que pode te sobrar nas finais

**"Como faz isso com Docker/Compose, que é o nosso caso?"**

> "Mesma ideia — o filtro é por pasta, não por linguagem. O que muda é que build de imagem
> compensa cache de layer, e isso está no material."
