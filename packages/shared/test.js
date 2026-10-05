const assert = require('assert');
const { normalizarNome, ehTemaValido } = require('./index');

assert.strictEqual(normalizarNome('  Ana   Silva '), 'Ana Silva');
assert.strictEqual(normalizarNome('Ruan'), 'Ruan');
assert.strictEqual(ehTemaValido('T05'), true);
assert.strictEqual(ehTemaValido('t13'), true);
assert.strictEqual(ehTemaValido('T14'), false);
assert.strictEqual(ehTemaValido('abc'), false);

console.log('shared: 6 testes ok');
