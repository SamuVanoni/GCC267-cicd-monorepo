# De onde vêm os números dos slides

> Todo número que aparece nos slides 13, 15 e 16 foi **medido**, não estimado.
> Esta página existe para que qualquer um do grupo possa responder "de onde você
> tirou isso?" sem travar. As medições são de 05/10/2026, em runners
> `ubuntu-latest` do GitHub.

---

## O que foi medido

O mesmo repositório, o mesmo commit, os dois pipelines rodando lado a lado — mudando
**só o tamanho do `node_modules`**. Nada de `sleep`, nada de inflar de propósito: as
três linhas são três `package.json` diferentes, instalados de verdade.

| `node_modules`                             | `ci-ingenuo` | `ci-rapido` | `npm install` por job |
| ------------------------------------------ | -----------: | ----------: | --------------------: |
| **vazio** — é o nosso repo de demonstração |      **47s** |     **30s** |                    1s |
| 83 MB · 151 pacotes (eslint, tsc, vitest)  |      **58s** |     **27s** |                  3–4s |
| 379 MB · 603 pacotes (next, react, jest)   |   **2m 37s** |     **40s** |                24–29s |

A última linha é o tamanho de um app web de verdade.

### A leitura

**O ingênuo cresce com a árvore de dependências; o rápido quase não se move.**
De vazio para 379 MB o ingênuo foi de 47s para 2m37s — mais de **3×**. O rápido saiu
de 30s para 40s.

O motivo é a conta, não a sorte:

```
ingênuo  =  (nº de pacotes) × (nº de versões de Node) × (install + testes)
rápido   =  (pacotes afetados) × (install com cache + testes)
```

No ingênuo o `install` está **dentro** da multiplicação: 4 versões de Node em série
pagam 4 vezes os mesmos 25 segundos de download — ~100s só baixando a mesma coisa.
No rápido o cache tira a maior parte disso, e o filtro tira os pacotes que ninguém
mexeu.

---

## Os dois números do cache, medidos no mesmo job

| `npm install` em `apps/mural` | tempo   |
| ----------------------------- | ------- |
| cache frio (primeira rodada)  | 24–29s  |
| cache quente                  | **11s** |

O `cache: npm` corta o install **mais ou menos pela metade**. Não é mágica e não é o
que mais economiza — quem economiza mais é o filtro, que simplesmente não abre o job.

---

## A honestidade que custou a medição

A primeira versão do slide dizia "38s contra 4s". **Era chute, e estava errado.**
Quando medimos o repo de verdade, deu 47s contra 30s — perto demais para ensinar
nada. Duas coisas apareceram aí:

1. **No nosso repo o install não é o gargalo.** Sem dependência nenhuma, `npm install`
   leva 1 segundo. O que domina é o custo fixo de abrir cada job (~8s), pago 4 vezes
   porque o `max-parallel: 1` põe as versões em série.
2. **`npm install` nos runners do GitHub é muito mais rápido que na nossa máquina.**
   83 MB levaram 1 minuto num notebook com Windows e 3 segundos no runner. Medir na
   máquina local dá o número errado.

O gargalo só vira o install quando a árvore é grande — e é por isso que a tabela tem
três linhas em vez de uma. **O argumento que vale em qualquer tamanho não é o relógio,
é o trabalho:** num PR que mexe só num `.json`, o ingênuo roda 12 suítes de teste
(3 pacotes × 4 versões de Node) e o rápido roda 1.

12 contra 1 é verdade no nosso repo de brinquedo e no repo de vocês. O relógio é só a
consequência, e ele depende do tamanho do projeto.

---

## Como refazer a medição

O branch usado foi descartável e já foi apagado (`medicao-descartavel`, PR #2, fechado
sem merge). Para repetir:

1. Troque as `devDependencies` da raiz pelo toolchain que quiser medir.
2. `npm install` local, só para gerar o `package-lock.json`.
3. Commite `package.json` + `package-lock.json` num branch novo e abra um PR —
   o `ci-ingenuo` só dispara em `pull_request`.
4. Os tempos saem em **Actions → a run → cada job**, ou por linha de comando:

   ```bash
   gh api repos/<dono>/<repo>/actions/runs/<id>/jobs \
     --jq '.jobs[] | .name, (.steps[] | "  "+.name+" = "+(((.completed_at|fromdate)-(.started_at|fromdate))|tostring)+"s")'
   ```

5. Para o número **com cache quente**, rode o `ci-rapido` duas vezes: a primeira
   grava o cache, a segunda o usa.
6. Feche o PR e apague o branch. O repo da demonstração não deve carregar
   dependência que ele não usa.
