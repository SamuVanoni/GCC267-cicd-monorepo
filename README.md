# CI/CD em monorepo — demo do aprofundamento T05

> **GCC267 · Projeto Integrador I · 2026/2 · Turma 14A**
> Gilmar Silva · Julia Ribeiro · Ruan Pablo · Samuel Vanoni

Este repositório existe para uma coisa: **ser tocado pela turma ao vivo, durante a
apresentação de 30 minutos.** O código aqui é de mentira de propósito. O que é de verdade
são os dois pipelines.

---

## Participe (é isso que a turma faz na aula)

Você não precisa clonar nada. Dá pra fazer tudo do celular:

1. **Add file** → **Create new file**
2. Nome do arquivo: `participantes/seunome.json`
3. Conteúdo:

```json
{ "nome": "Seu Nome", "equipe": "sua equipe", "tema": "T0X" }
```

4. **Commit changes** → **Propose changes** → **Create pull request**

Se o check ficar verde, o PR entra sozinho e seu nome aparece na página. Se ficar vermelho,
clique no X → **Details** → role até o fim do log: a linha `Error:` diz o que arrumar.

---

## O que tem aqui

```
apps/
  api/            serviço de mentira — existe só para ser a terceira coisa do monorepo
  mural/          lê participantes/ e gera a página pública
packages/
  shared/         biblioteca que os DOIS usam — mexer aqui acorda todos os jobs
participantes/    um .json por pessoa
.github/workflows/
  ci-ingenuo.yml  o pipeline ruim de propósito
  ci-rapido.yml   o mesmo repo com path filter + cache
  deploy.yml      entrou na main → vai pro ar
docs/aprofundamento/
  README.md       papéis, linha do tempo e checklist da apresentação
  01..04-*.md     a colinha de cada apresentador
  path-filter-por-job.md   o que não cabia em 30 minutos
```

---

## Os dois pipelines, que são a aula

| | `ci-ingenuo` | `ci-rapido` |
|---|---|---|
| olha o diff? | não | sim — job `detectar` |
| cache | nenhum | `cache: npm` |
| jobs | 1 job × 3 versões de Node, em série | 1 a 3 jobs, só os afetados |
| mudar um `.json` | roda os 3 pacotes, 3 vezes | roda só o mural |
| mudar `packages/shared/` | roda tudo | roda tudo — **e está certo** |

Os dois rodam no mesmo PR, de propósito: no minuto 20 da apresentação os dois resultados
estão lado a lado, no mesmo commit. Nenhuma demo ao vivo depende de re-rodar nada.

**Não "conserte" o `ci-ingenuo`.** Ele é metade da aula.

---

## Rodar na sua máquina

```bash
npm install
npm test              # os 3 pacotes
npm run build         # gera apps/mural/dist/index.html
```

Node 18, 20 ou 22. Sem dependências externas — só a biblioteca padrão.

---

## Configuração do repositório (uma vez, na mão)

- **Settings → Pages → Source: GitHub Actions**
- **Settings → General → Allow auto-merge**
- **Settings → Rules/Branches → main:** exigir os status checks, **sem** revisão obrigatória

> ⚠️ Exigir um check que o path filter faz **pular** trava o PR para sempre, esperando um
> job que nunca vai rodar. Exija só `detectar`.

---

## Por que isto não está no repo do projeto

O repositório da equipe (`hortalicas-feiralivre`) tem "main sempre verde" e revisão
obrigatória, e é o que vale nota. Trinta PRs de desconhecidos, auto-merge sem review e um
workflow ruim de propósito não cabem lá. Aqui cabem.

## Licença

MIT — ver [LICENSE](LICENSE).
