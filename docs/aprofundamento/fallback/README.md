# Prints de reserva (se a internet cair)

Capturados em **06/10/2026**, do repositório de verdade, com os PRs de verdade. Se a rede
da faculdade cair no meio da apresentação, abra o print em vez de improvisar — **e diga em
voz alta que é print**. A frase está nas colinhas: _"a rede caiu, mas o print é do ensaio,
com os mesmos passos."_ Honestidade custa menos que uma tela de erro.

**Abra esta pasta no celular antes de começar.** Com a rede caída não dá para baixar nada.

| Arquivo                               | Serve ao    | O que mostra                                                                        |
| ------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `slide07-lista-de-prs.png`            | Slide 7     | A lista de PRs com os checks ao lado — três `✓ 10/10` verdes e um `✗ 4/10` vermelho |
| `slide07-pr6-vermelho.png`            | Slide 7     | O PR #6 por dentro: `testar mural` e `fim` vermelhos, `shared` e `api` pulados      |
| `slide08-passos-do-job.png`           | Slide 8     | Os passos do job, com o X exatamente em `Run npm run build -w mural`                |
| `slide08-log-do-erro.png`             | **Slide 8** | **O log, com a linha que importa destacada.** É o print mais importante da pasta    |
| `slide08-log-do-erro.txt`             | Slide 8     | O mesmo log em texto, caso precise copiar ou projetar maior                         |
| `slide14-pr3-dois-pulados.png`        | Slide 14    | Path filter, caso 1: `testar mural` rodou (14s), `shared` e `api` pulados (0s)      |
| `slide14-pr4-shared-acorda-todos.png` | Slide 14    | Path filter, caso 2: mexeu em `packages/shared/` e os três rodaram                  |
| `slide18-pagina-no-ar.png`            | Slide 18    | A página publicada. **Reserva fraca** — ver o aviso abaixo                          |
| `slide19-pr5-diff.png`                | Slide 19    | O diff de uma linha do PR #5, que é o que a sala lê para votar                      |
| `slide19-pr5-tudo-verde.png`          | Slide 19    | Os checks do PR #5, todos verdes — o verde que está errado                          |

## Dois avisos que mudam o que você fala

**1. O print do log é uma renderização, não uma foto da tela do GitHub.** O texto é o log
real, copiado do Actions (`gh run view --log`), linha por linha. Mas a página de log do
GitHub **só aparece para quem está logado** — sem login ela mostra "Sign in to view logs", e
um print dela sairia em branco no projetor. Então o log foi redesenhado com o mesmo texto,
em fonte grande, para ser legível de longe. Se alguém perguntar, a resposta é essa mesma.

**2. O print da página (slide 18) é a reserva mais fraca que existe aqui**, e você precisa
saber disso antes de usar. Ele mostra a página com **os nomes do ensaio**, não os da turma —
e o slide 18 inteiro existe para a pessoa achar o **próprio** nome. Com a rede caída, não
tente fingir: mostre o print, explique o que aconteceria, e passe adiante. É o único momento
da apresentação que o fallback não salva, e tentar disfarçar é pior do que admitir.
