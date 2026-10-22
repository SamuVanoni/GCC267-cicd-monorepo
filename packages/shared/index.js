// Biblioteca compartilhada: o mural E a api dependem dela.
//
// E por isso que mexer nesta pasta acorda TODOS os jobs do pipeline rapido.
// Nao e bug do filtro: se a peca que os dois usam mudou, nao se sabe quem quebrou.

function normalizarNome(valor) {
  return String(valor).trim().replace(/\s+/g, " ");
}

function ehTemaValido(tema) {
  return /^T(0[1-9]|1[0-3])$/.test(String(tema).trim().toUpperCase());
}

module.exports = { normalizarNome, ehTemaValido };
