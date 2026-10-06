const assert = require("assert");
const { normalizarNome, ehTemaValido } = require("./index");

assert.strictEqual(normalizarNome("  Ana   Silva "), "Ana Silva");
assert.strictEqual(normalizarNome("Ruan"), "Ruan");
assert.strictEqual(ehTemaValido("T05"), true);
assert.strictEqual(ehTemaValido("t13"), true);
assert.strictEqual(ehTemaValido("T14"), false);
assert.strictEqual(ehTemaValido("abc"), false);

// espaco em volta nao invalida o tema: o json vem digitado no celular
assert.strictEqual(ehTemaValido(" T05 "), true);

console.log("shared: 7 testes ok");
