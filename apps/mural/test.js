const assert = require('assert');
const { validar } = require('./validar');

// 1. participante valido passa, e sai normalizado
const ok = validar({ nome: '  Ana   Silva ', equipe: 'Equipe 3', tema: 't05' }, 'ana.json');
assert.strictEqual(ok.nome, 'Ana Silva');
assert.strictEqual(ok.equipe, 'Equipe 3');
assert.strictEqual(ok.tema, 'T05');

// 2. o que nao e objeto JSON e recusado
assert.throws(() => validar([], 'x.json'), /objeto JSON/);
assert.throws(() => validar(null, 'x.json'), /objeto JSON/);

// 3. equipe faltando e recusada
assert.throws(() => validar({ nome: 'Ana', tema: 'T05' }, 'x.json'), /equipe/);

// 4. tema fora da faixa e recusado
assert.throws(() => validar({ nome: 'Ana', equipe: 'E1', tema: 'T99' }, 'x.json'), /T01 a T13/);

// ====================================================================
// NAO existe teste para NOME VAZIO aqui, e isso e DE PROPOSITO.
//
// E o buraco que o PR plantado da apresentacao atravessa: trocar o throw
// de validar.js por um valor padrao deixa esta suite inteira verde.
//
// DEPOIS da apresentacao, o conserto e acrescentar:
//
//   assert.throws(() => validar({ nome: '  ', equipe: 'E1', tema: 'T05' }, 'x.json'), /nome/);
//
// Isso e a terceira conclusao do slide 21, demonstrada no proprio repo.
// ====================================================================

console.log('mural: 6 testes ok');
