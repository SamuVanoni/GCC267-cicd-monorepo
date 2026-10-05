const { normalizarNome, ehTemaValido } = require('shared');

// Valida UM arquivo de participantes/.
// Devolve o participante normalizado, ou levanta erro dizendo o que esta errado.
//
// E este arquivo que o pipeline barra quando alguem manda um json torto -- entao
// e aqui que a sala sente o porteiro funcionando.

function validar(dados, arquivo) {
  if (dados === null || typeof dados !== 'object' || Array.isArray(dados)) {
    throw new Error(`${arquivo}: o conteudo precisa ser um objeto JSON`);
  }

  // ------------------------------------------------------------------
  // A LINHA DO PR PLANTADO (slide 19 da apresentacao).
  //
  // O PR "ajusta-validacao" troca o throw abaixo por:
  //
  //     dados.nome = 'sem nome';
  //
  // Todos os testes continuam VERDES, porque nenhum teste cobre o caso do
  // nome vazio. O resultado e um "sem nome" na pagina publica.
  //
  // O conserto nao e codigo, e TESTE -- ver docs/aprofundamento/04-gilmar.md
  // ------------------------------------------------------------------
  if (!dados.nome || !String(dados.nome).trim()) {
    throw new Error(`${arquivo}: o campo "nome" e obrigatorio`);
  }

  if (!dados.equipe || !String(dados.equipe).trim()) {
    throw new Error(`${arquivo}: o campo "equipe" e obrigatorio`);
  }

  if (!ehTemaValido(dados.tema)) {
    throw new Error(`${arquivo}: "tema" precisa ser de T01 a T13 (veio "${dados.tema}")`);
  }

  return {
    nome: normalizarNome(dados.nome),
    equipe: normalizarNome(dados.equipe),
    tema: String(dados.tema).toUpperCase()
  };
}

module.exports = { validar };
