const { normalizarNome, ehTemaValido } = require("shared");

// Valida UM arquivo de participantes/.
// Devolve o participante normalizado, ou levanta erro dizendo o que esta errado.
//
// E este arquivo que o pipeline barra quando alguem manda um json torto -- entao
// e aqui que a sala sente o porteiro funcionando.

function validar(dados, arquivo) {
  if (dados === null || typeof dados !== "object" || Array.isArray(dados)) {
    throw new Error(`${arquivo}: o conteudo precisa ser um objeto JSON`);
  }

  // O nome e obrigatorio: e ele que aparece na pagina publica.
  if (!dados.nome || !String(dados.nome).trim()) {
    throw new Error(`${arquivo}: o campo "nome" e obrigatorio`);
  }

  if (!dados.equipe || !String(dados.equipe).trim()) {
    throw new Error(`${arquivo}: o campo "equipe" e obrigatorio`);
  }

  if (!ehTemaValido(dados.tema)) {
    throw new Error(
      `${arquivo}: "tema" precisa ser de T01 a T13 (veio "${dados.tema}")`,
    );
  }

  return {
    nome: normalizarNome(dados.nome),
    equipe: normalizarNome(dados.equipe),
    tema: String(dados.tema).toUpperCase(),
  };
}

module.exports = { validar };
