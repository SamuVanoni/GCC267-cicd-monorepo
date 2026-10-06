const fs = require("fs");
const path = require("path");
const { validar } = require("./validar");

const RAIZ = path.join(__dirname, "..", "..");
const PASTA = path.join(RAIZ, "participantes");
const SAIDA = path.join(__dirname, "dist");

// Escapa o que veio de fora antes de virar HTML. A pagina e publica e o conteudo
// e de terceiros: sem isso, um nome com < > quebra o mural.
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const arquivos = fs
  .readdirSync(PASTA)
  .filter((f) => f.endsWith(".json"))
  .sort();

const participantes = [];
const erros = [];

for (const arquivo of arquivos) {
  const caminho = path.join(PASTA, arquivo);
  let dados;

  try {
    dados = JSON.parse(fs.readFileSync(caminho, "utf8"));
  } catch (e) {
    erros.push(`participantes/${arquivo}: JSON invalido -- ${e.message}`);
    continue;
  }

  try {
    participantes.push(validar(dados, `participantes/${arquivo}`));
  } catch (e) {
    erros.push(e.message);
  }
}

// O log e desenhado para o slide 8 ("como ler um log de CI"): o que passou em
// cinza, o que falhou no fim, e a linha Error: por ultimo.
console.log(`lendo participantes/ (${arquivos.length} arquivos)`);
for (const p of participantes) {
  console.log(`  ${p.nome} .......... ok`);
}

if (erros.length > 0) {
  console.log("");
  for (const e of erros) console.log(`  FALHOU  ${e}`);
  console.error(
    `\nError: ${erros.length} arquivo(s) invalido(s) em participantes/`,
  );
  process.exit(1);
}

const linhas = participantes
  .map(
    (p) => `      <li>
        <span class="nome">${escapar(p.nome)}</span>
        <span class="meta">${escapar(p.equipe)} &middot; ${escapar(p.tema)}</span>
      </li>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mural T05 - CI/CD em monorepo</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 32px 20px 64px;
    background: #111820; color: #F4F4F0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  main { max-width: 680px; margin: 0 auto; }
  .tag {
    font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
    color: #E8A33D; margin: 0 0 10px;
  }
  h1 { font-size: 34px; line-height: 1.1; margin: 0 0 12px; }
  .sub { color: #9AA7B4; font-size: 16px; line-height: 1.5; margin: 0 0 28px; }
  .contagem {
    font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    color: #8FD9AC; font-size: 14px; margin: 0 0 16px;
  }
  ul { list-style: none; margin: 0; padding: 0; }
  li {
    display: flex; flex-wrap: wrap; gap: 4px 12px;
    align-items: baseline; justify-content: space-between;
    padding: 16px 18px; border: 1px solid #2B3642; border-radius: 12px;
    background: #19222C; margin-bottom: 10px;
  }
  .nome { font-size: 19px; font-weight: 600; }
  .meta {
    font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    font-size: 13px; color: #9AA7B4;
  }
  footer {
    margin-top: 36px; padding-top: 20px; border-top: 1px solid #2B3642;
    color: #5A6672; font-size: 14px; line-height: 1.6;
  }
  .vazio { color: #9AA7B4; font-size: 17px; }
</style>
</head>
<body>
<main>
  <p class="tag">GCC267 &middot; Aprofundamento T05</p>
  <h1>Quem passou pelo porteiro</h1>
  <p class="sub">Cada nome aqui veio de um pull request que ficou verde, foi
  mergeado automaticamente e disparou este deploy. Ninguem subiu nada a mao.</p>
  <p class="contagem">${participantes.length} participante(s) no ar</p>
${participantes.length ? `  <ul>\n${linhas}\n  </ul>` : '  <p class="vazio">Ninguem ainda. Abra um pull request.</p>'}
  <footer>
    Gerado pelo deploy em ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC.<br>
    Gilmar Silva &middot; Julia Ribeiro &middot; Ruan Pablo &middot; Samuel Vanoni
  </footer>
</main>
</body>
</html>
`;

fs.mkdirSync(SAIDA, { recursive: true });
fs.writeFileSync(path.join(SAIDA, "index.html"), html, "utf8");
console.log(
  `\nmural gerado: ${participantes.length} participante(s) -> apps/mural/dist/index.html`,
);
