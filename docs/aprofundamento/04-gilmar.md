# Gilmar — o reveal e a pegadinha (20–28)

> Você tem o melhor momento da apresentação **e** a parte que vale nota. O reveal é o
> espetáculo; o PR verde-e-errado é o que separa "demo legal" de aprofundamento de 15%.

Antes do minuto 20 você **opera o telão** nos blocos do Samuel e do Ruan.

---

## Slide 15 · minuto 20 · "Vocês esperaram. Agora assistam."

**O número não está no slide, de propósito** — a lacuna é pra você **falar** o tempo real.
O operador abre o Actions, acha a run do `ci-ingenuo` dos PRs da turma e te passa o número
antes de você virar o slide. Combinem o gesto.

**Nunca invente** — tem 30 pessoas que acabaram de viver aquela espera. Se o slide dissesse
"4 minutos" e tivesse dado 50 segundos, você perderia a sala num segundo.

**⚠️ A espera real provavelmente NÃO vai ser o tempo de uma run.** Com uns 30 PRs ao mesmo
tempo, cada um abrindo 4 jobs em série, são ~120 jobs — isso estoura o limite de jobs
simultâneos da conta e os PRs entram em **fila**. O que a sala sentiu foi a fila, não o
pipeline. Se for o caso, **diga isso**, e fica até melhor:

> "O pipeline de cada PR levou cinquenta segundos. Mas eram trinta PRs e cento e vinte
> jobs, então vocês esperaram seis minutos **na fila**. Isso também é custo de CI, e
> ninguém conta."

Curto de propósito:

> "Lembram do começo? Vocês mandaram o PR e ficaram esperando. Deu [NÚMERO]. Esse
> pipeline era **de propósito**. A gente escreveu ele ruim pra vocês sentirem. Agora o mesmo
> repositório, com as quatro linhas do path filter e a linha do cache que o Ruan mostrou."

**Pausa.** Vai pro próximo slide.

O que faz esse momento funcionar é a sala ter esperado de verdade. Por isso a Julia e o
Ruan não contam a armadilha antes — **você** revela, aqui.

---

## Slide 16 · minutos 20 a 22 · os números + AO VIVO

**Ordem:** primeiro o slide com os números, **depois** troca pro navegador e roda ao vivo.
Assim a sala sabe o que esperar e o suspense fica no cronômetro.

**Este slide mudou de argumento, e vale entender por quê.** A versão antiga dizia "4m12s
contra 21s" — era chute. Medido, o nosso repo deu **47s contra 30s**: perto demais pra
ensinar nada. Então o slide passou a liderar pelo número que é verdade em **qualquer**
tamanho de projeto:

> "Mesmo repositório. Mesmos testes. Mesmo PR — um arquivo só. O pipeline ingênuo rodou
> **doze** suítes de teste: três pacotes, vezes quatro versões de Node. O rápido rodou
> **uma**."

Aponta a tabela:

> "No relógio isso depende do tamanho do projeto. Aqui, que é um repo de brinquedo sem
> dependência nenhuma, deu quarenta e sete contra trinta. Num projeto de verdade, com 379
> MB de `node_modules`, o mesmo pipeline ingênuo dá dois minutos e meio e o rápido dá
> quarenta segundos."

**A vantagem prática:** se a fila do GitHub estiver lenta no dia, ou se a demo ao vivo der
um número estranho, o argumento continua de pé. Você não depende do cronômetro.

Aperta **Re-run** no PR que a sala conhece. E **fica calado enquanto roda** — 20 segundos de
silêncio aqui valem mais que qualquer frase.

Quando terminar:

> "E o que mudou no código foram cinco linhas de YAML. Nenhuma linha de teste foi apagada."

A frase que fecha o raciocínio, e é a que separa isso de "otimização":

> "Não ficou mais rápido porque a gente testou menos. Ficou mais rápido porque o robô parou
> de testar o que não tinha mudado."

**Se a demo falhar ao vivo:** não insista duas vezes. _"A fila do GitHub nos pegou"_ e segue.
Os números medidos já estão no slide — a aula não cai.

**Se perguntarem "de onde vêm esses números":** _"medimos, com um branch descartável, e está
documentado em `docs/aprofundamento/medicao.md`"_. Essa resposta vale mais que o número.

**Se perguntarem por que no nosso repo a diferença é pequena**, a resposta é honesta e boa:
_"porque este repo não tem dependência nenhuma, então o `npm install` dele leva 1 segundo. O
desperdício já é de 12 pra 1; o que é pequeno aqui é o custo de cada unidade."_

---

## Slide 17 · minutos 22 a 23 · auto-merge

Comece pela frase do título, **de frente pra sala**:

> "Uma coisa que talvez vocês não tenham notado: ninguém da nossa equipe aprovou o PR de
> vocês. **O robô aprovou.**"

Os três cartões, rápido:

> "São três peças. **Branch protection:** a main recusa PR com check vermelho — e nem eu,
> que criei o repo, consigo passar por cima. **Auto-merge:** ficou verde, entra sozinho.
> E **deploy no merge:** entrou na main, vai pro ar."

A ligação com a disciplina — vale dizer porque mostra que vocês leram a ementa:

> "No nosso repositório da matéria isso **não** está assim: lá o professor exige revisão
> humana, e está certo. Aqui a gente desligou de propósito pra caber em 30 minutos. A regra
> geral é: o robô barra, a pessoa aprova."

Pegadinha técnica, em uma frase:

> "Se vocês exigirem um check que o path filter faz pular, o PR trava pra sempre esperando
> um job que nunca vai rodar."

**60 segundos.** O próximo slide é o prêmio.

---

## Slide 18 · minutos 23 a 25 · AO VIVO: vocês estão no ar

O prêmio da interação — o equivalente ao feature flag que a outra equipe fez.

Fala a frase, **depois** troca pro navegador com a página do mural aberta. Dá F5 na tela
grande enquanto a sala dá F5 no celular.

> "Abram o link de novo no celular. Dá um F5." (espera 5 segundos, deixa a sala achar o
> próprio nome) "Esse nome aí apareceu porque o check de vocês ficou verde, o merge
> aconteceu sozinho e o deploy rodou. Nenhum de nós quatro subiu nada. Nem sabíamos que
> vocês existiam quando a gente escreveu esse pipeline."

E a frase que amarra CI e CD, que é o tema:

> "O que vocês acabaram de ver não foram duas coisas. Foi uma esteira: pull request,
> porteiro, merge, deploy. Isso é o CI/CD inteiro, do começo ao fim, em um minuto."

Quem ficou vermelho e não consertou não aparece — e isso é bom, é a prova de que o porteiro
funciona. Diz com leveza:

> "Quem não aparece, o porteiro barrou. Dá pra consertar depois da aula que ele entra
> sozinho."

**⚠️ Máximo 2 minutos.** É tentador ficar aqui porque a sala fica animada. Mas ainda falta a
pegadinha, que é a parte que vale nota.

---

## Slide 19 · minutos 25 a 26 · O PR VERDE E ERRADO

**Este é o momento que vale nota.** O professor listou _"código com bug plantado para a turma
caçar"_ como formato que funciona — e isto é exatamente isso.

### O PR plantado

Já está aberto no repo: **PR `ajusta-validacao`**, com título discreto. Ele muda duas
linhas de `apps/mural/validar.js`:

```js
// antes
if (!dados.nome || !String(dados.nome).trim()) {
  throw new Error(`${arquivo}: o campo "nome" e obrigatorio`);
}

// depois
if (!dados.nome || !String(dados.nome).trim()) {
  dados.nome = "sem nome";
}
```

A validação para de reclamar e passa a **aceitar** qualquer json sem nome — que vai pra
página pública como "sem nome". Todos os testes continuam passando, porque nenhum teste
cobria o caso do nome vazio. **Check verde, lint verde, código errado.**

**Por que `dados.nome = "sem nome"` e não `return;`:** `return` sem valor devolve
`undefined`, e aí o `build.js` quebraria ao ler `p.nome` — o check ficaria **vermelho** e
não haveria pegadinha nenhuma. O defeito tem que ser silencioso pra servir.

**O `validar.js` não tem mais comentário explicando o plantio** (saiu de propósito em
06/10/2026): com ele, as três linhas de contexto que o GitHub mostra em volta da mudança
entregavam a brincadeira na própria aba **Files changed**. A explicação é esta aqui. O
comentário que **continua** no `apps/mural/test.js` é outro — ele explica por que o teste
do nome vazio não existe, e não aparece no diff deste PR.

### Como conduzir

1. Mostra o PR: três checks verdes.
   > "Último PR do dia. Está todo verde. A gente merge?"
2. **Pede o voto de verdade**, com a mão levantada. Espera. A maioria vai votar sim.
3. Abre a aba **Files changed** e mostra as duas linhas. **Cinco segundos de silêncio.**
4. > "O check está verde porque nenhum teste nosso cobria json sem nome. O robô não sabe o
   > que a gente não ensinou ele a conferir."

**Não humilhe quem votou sim.** A graça é que a resposta certa era invisível:

> "E é pra votar sim, viu. Com a informação que vocês tinham, sim era a resposta racional.
> O problema não é o voto, é o que o verde deixou de contar."

**Se a sala desconfiar e ninguém votar sim:** melhor ainda. Elogia e pergunta _"por quê?"_.
Alguém vai falar "porque verde não quer dizer certo" — e essa é a frase do próximo slide,
dita pela sala. **Usa.**

---

## Slide 20 · minutos 26 a 28 · verde não é correto

A conclusão intelectual da apresentação.

> "Então a correção do que a Julia falou no começo. O pipeline é quem diz não — mas ele só
> sabe dizer não pro que a gente ensinou ele a conferir. **Verde não significa 'está
> certo'. Significa 'o que a gente conferiu, passou'.**"

Os três cartões, rápido:

> "**Primeiro:** o pipeline cobre o que tem teste, o resto ele nem olha. **Segundo:** é por
> isso que code review existe mesmo com CI verde — o robô lê a sintaxe, a pessoa lê a
> intenção. **Terceiro:** teste novo entra no mesmo PR do código, senão você está aumentando
> a área que ninguém confere."

A frase que amarra com a disciplina, e é boa porque usa as palavras do próprio professor:

> "O professor disse no Encontro 1 que ele lê o PR, não o relatório. Hoje dá pra entender
> por quê: o check verde não conta a história inteira, e ele sabe disso."

**Não pregue.** Isso sai em 60 segundos, com naturalidade. Se ficar professoral, perde.

Fecha: _"Samuel, fecha."_

---

## Erros a evitar

- **Inventar o número** do slide 15 ou 16. Trinta pessoas acabaram de cronometrar junto.
- **Ficar mais de 2 minutos no slide 18.** A animação da sala é armadilha de tempo.
- **Explicar o PR plantado antes do voto.** Sem voto, não tem aula.
- **Insistir numa demo que falhou.** Uma tentativa, depois o print.
- **Tom de palestra** no slide 20.

---

## A pergunta que pode te sobrar nas finais

**"Quanto custa rodar isso?"**

> "Repositório público tem Actions de graça, sem limite de minutos. Repo privado tem cota
> mensal. Por isso o professor pediu repo público."
