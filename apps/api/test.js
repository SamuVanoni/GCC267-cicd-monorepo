const assert = require("assert");
const { descreverTema, CATALOGO } = require("./index");

assert.strictEqual(descreverTema("T05"), "CI/CD em monorepo");
assert.strictEqual(descreverTema("t01"), "DDD tatico: agregados e invariantes");
assert.strictEqual(Object.keys(CATALOGO).length, 13);
assert.throws(() => descreverTema("T99"), /tema desconhecido/);

console.log("api: 4 testes ok");
