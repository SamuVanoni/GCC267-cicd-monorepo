// Servico de mentira. Existe por um motivo so: ser a terceira coisa do monorepo,
// para a sala VER o pipeline ingenuo testando algo que nao tem nada a ver
// com o arquivo que ela mudou.
//
// Nenhum PR da apresentacao toca nesta pasta.

const { ehTemaValido } = require("shared");

const CATALOGO = {
  T01: "DDD tatico: agregados e invariantes",
  T02: "Contratos OpenAPI e testes de contrato",
  T03: "Testes com Testcontainers",
  T04: "Docker Compose multi-servico",
  T05: "CI/CD em monorepo",
  T06: "Divida tecnica e SonarCloud",
  T07: "Git em equipe e code review",
  T08: "Banco por servico e migrations",
  T09: "Cache e desempenho com Redis",
  T10: "Seguranca: OWASP API Top 10, JWT/OIDC",
  T11: "Frontend/BFF diante de falha parcial",
  T12: "Observabilidade com OpenTelemetry",
  T13: "Tema livre",
};

function descreverTema(tema) {
  const chave = String(tema).toUpperCase();
  if (!ehTemaValido(chave)) {
    throw new Error(`tema desconhecido: ${tema}`);
  }
  return CATALOGO[chave];
}

module.exports = { descreverTema, CATALOGO };
