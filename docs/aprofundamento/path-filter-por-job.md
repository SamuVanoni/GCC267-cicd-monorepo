# Path filter job por job — o que não cabia em 30 minutos

> Isto é o material de apoio prometido no slide 12. Se alguém da turma perguntou "e no meu
> caso, com Docker?", a resposta está aqui.

---

## O problema com o jeito simples

O jeito mais fácil de filtrar é o nativo:

```yaml
on:
  pull_request:
    paths:
      - 'apps/mural/**'
```

Funciona, mas ele filtra o **workflow inteiro**. Se você tem três jobs no mesmo arquivo e
só um deles interessa, o `paths` do `on` não serve: ou roda tudo, ou não roda nada.

Para um monorepo com dois serviços — que é o caso de todas as nove equipes até o Encontro 6
— você precisa filtrar **job por job**.

---

## O jeito que usamos: um job que lê o diff

Está em [`.github/workflows/ci-rapido.yml`](../../.github/workflows/ci-rapido.yml). A ideia
tem três partes:

**1. Um job `detectar` que compara o PR com a base e publica o resultado em `outputs`.**

```yaml
jobs:
  detectar:
    runs-on: ubuntu-latest
    outputs:
      mural: ${{ steps.filtro.outputs.mural }}
      api: ${{ steps.filtro.outputs.api }}
      shared: ${{ steps.filtro.outputs.shared }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0        # sem isso não há histórico para comparar
      - id: filtro
        run: |
          BASE=$(git merge-base origin/${{ github.base_ref }} HEAD)
          MUDOU=$(git diff --name-only "$BASE" HEAD)
          ...
          echo "mural=true" >> "$GITHUB_OUTPUT"
```

**2. Os jobs de verdade dependem dele com `needs` e se protegem com `if`.**

```yaml
  mural:
    needs: detectar
    if: needs.detectar.outputs.mural == 'true'
```

**3. A regra do pacote compartilhado vem antes de tudo.** Se `packages/shared/` mudou, os
três saem `true` e o filtro nem olha o resto.

### Três detalhes que custam tempo se você descobrir sozinho

| Detalhe | Por quê |
|---|---|
| `fetch-depth: 0` | o checkout padrão traz 1 commit; sem histórico não existe `merge-base` |
| `merge-base`, não `HEAD~1` | o PR pode ter 7 commits, ou a base pode ter andado |
| `outputs` são **string** | `== 'true'` com aspas. Em YAML, `== true` compara com booleano e não casa |

---

## A alternativa pronta: `dorny/paths-filter`

A mesma coisa, com menos shell:

```yaml
  detectar:
    runs-on: ubuntu-latest
    outputs:
      mural: ${{ steps.f.outputs.mural }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: f
        with:
          filters: |
            mural:
              - 'apps/mural/**'
              - 'participantes/**'
              - 'packages/shared/**'
            api:
              - 'apps/api/**'
              - 'packages/shared/**'
```

**Por que não usamos na apresentação:** com `git diff` dá pra ver o que está acontecendo, e
num aprofundamento isso vale mais que a economia de linhas. Em projeto de verdade, use a
action — ela trata os casos de borda (push vs PR, merge queue) que o script não trata.

Repare que a lista do `mural` inclui `packages/shared/**`. É assim que se declara "eu
dependo da biblioteca": a dependência mora no filtro, não no código.

---

## A pegadinha que trava PR pra sempre

Se você exigir um check obrigatório na branch protection e o path filter fizer esse job
**pular**, o PR fica eternamente "waiting for status to be reported". O job não falhou — ele
nunca existiu, e o GitHub espera por ele.

Duas saídas:

1. **Exija só o job que sempre roda** (aqui, `detectar`). É o que fizemos.
2. **Job `fim` que agrega**, e é ele o obrigatório:

```yaml
  fim:
    needs: [mural, api, shared]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - run: |
          if echo '${{ join(needs.*.result, ",") }}' | grep -q failure; then
            exit 1
          fi
```

O `if: always()` é o que faz ele rodar mesmo quando um dos três pulou; sem isso ele também
pula, e você volta ao problema original.

---

## Para o caso de vocês: Docker e Compose

A ideia não muda — o filtro é por **pasta**, não por linguagem. O que muda é o que vale
cachear:

- **Cache de layer** em vez de cache de dependência. Com
  [`docker/build-push-action`](https://github.com/docker/build-push-action), use
  `cache-from: type=gha` e `cache-to: type=gha,mode=max`.
- **A ordem do Dockerfile é o cache.** Copie o manifesto de dependências e instale **antes**
  de copiar o código:

  ```dockerfile
  COPY package*.json ./
  RUN npm ci
  COPY . .
  ```

  Invertido, qualquer mudança de uma linha de código invalida o install inteiro. É o mesmo
  erro do `ci-ingenuo`, dentro do Dockerfile.
- **Um job de build por serviço**, cada um com o seu filtro. É aí que "dois serviços
  implantáveis sozinhos" deixa de ser slide e passa a ser verdade no pipeline.

---

## Quanto custa

Repositório **público**: Actions de graça, sem limite de minutos. Repositório **privado**:
cota mensal por conta (2.000 minutos no plano Free). É uma das razões de o professor ter
pedido repositório público.

---

## Para ler depois

- [Workflow syntax — `jobs.<id>.if` e `needs`](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax)
- [Caching dependencies](https://docs.github.com/actions/how-tos/write-workflows/choose-what-workflows-do/cache-dependencies)
- [`dorny/paths-filter`](https://github.com/dorny/paths-filter)
