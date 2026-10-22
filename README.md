# CI/CD em monorepo — demo do aprofundamento T05

> **GCC267 · Projeto Integrador I · 2026/2 · Turma 14A**
> Gilmar Silva · Julia Ribeiro · Ruan Pablo · Samuel Vanoni

Este repositório existe para uma coisa: **ser tocado pela turma ao vivo, durante a
apresentação de 30 minutos.** O código aqui é de mentira de propósito. O que é de verdade
são os dois pipelines.

---

## Participe (é isso que a turma faz na aula)

Você não precisa clonar nada. Dá pra fazer tudo do celular, logado no GitHub:

1. Abra **[este link](https://github.com/SamuVanoni/GCC267-cicd-monorepo/new/main?filename=participantes/seunome.json&value=%7B%0A%20%20%22nome%22%3A%20%22Seu%20Nome%22%2C%0A%20%20%22equipe%22%3A%20%22sua%20equipe%22%2C%0A%20%20%22tema%22%3A%20%22T0X%22%0A%7D%0A)**
   — é o mesmo do QR do slide 2. Ele abre o editor com o arquivo já preenchido
2. Toque em **Fork this repository**
3. Troque `seunome` no nome do arquivo e os seus dados no conteúdo
4. **Commit changes** → **Propose changes** → **Create pull request**

O nome do arquivo vai **sem espaço e sem acento** (`participantes/joaosilva.json`), e o
tema vai de `T01` a `T13`. O conteúdo fica assim:

```json
{
  "nome": "Seu Nome",
  "equipe": "sua equipe",
  "tema": "T0X"
}
```

Abriu o app do GitHub em vez do navegador? **⋯** → **Open in browser**. Chegou sem o link?
Na página do repo, **Add file** → **Create new file** e siga do passo 2.

Se o check ficar verde, o PR entra sozinho e seu nome aparece na página no próximo deploy.
Se ficar vermelho, clique no X → **Details** → role até o fim do log: a linha `Error:` diz o
que arrumar.

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
  auto-merge.yml  PR que mexe só em participantes/*.json entra sozinho quando fica verde
  deploy.yml      entrou na main → vai pro ar
docs/aprofundamento/
  README.md       papéis, linha do tempo e checklist da apresentação
  01..04-*.md     a colinha de cada apresentador
  path-filter-por-job.md   o que não cabia em 30 minutos
```

---

## Os dois pipelines, que são a aula

|                          | `ci-ingenuo`                        | `ci-rapido`                                                           |
| ------------------------ | ----------------------------------- | --------------------------------------------------------------------- |
| olha o diff?             | não                                 | sim — job `detectar`                                                  |
| cache                    | nenhum                              | `cache: npm`                                                          |
| jobs                     | 1 job × 4 versões de Node, em série | 0 a 3 jobs de pacote, só os afetados, mais `detectar`, `lint` e `fim` |
| mudar um `.json`         | roda os 3 pacotes, 4 vezes          | roda só o mural                                                       |
| mudar `packages/shared/` | roda tudo                           | roda tudo — **e está certo**                                          |

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

Node 18, 20, 22 ou 24. Sem dependências externas — só a biblioteca padrão.

---

## Configuração do repositório (uma vez, na mão)

- **Settings → Pages → Source: GitHub Actions**
- **Settings → General → Allow auto-merge**
- **Settings → Rules/Branches → main:** exigir o status check `fim`, **sem** revisão
  obrigatória
- **Settings → Actions → General → Approval for running fork pull request workflows from
  contributors:** _Require approval for first-time contributors who are new to GitHub_

> ⚠️ Exigir um check que o path filter faz **pular** trava o PR para sempre, esperando um
> job que nunca vai rodar. Exija só o `fim`, o job agregador que sempre roda.

> ⚠️ Todo PR da turma vem de fork. Com a aprovação no padrão do GitHub, os checks de quem
> nunca contribuiu aqui ficam parados em "Workflow awaiting approval" até alguém clicar em
> **Approve and run** — o `fim` não fica verde e o auto-merge não acontece.

---

## Por que isto não está no repo do projeto

O repositório da equipe (`hortalicas-feiralivre`) tem "main sempre verde" e revisão
obrigatória, e é o que vale nota. Trinta PRs de desconhecidos, auto-merge sem review e um
workflow ruim de propósito não cabem lá. Aqui cabem.

## Licença

MIT — ver [LICENSE](LICENSE).
