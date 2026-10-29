/**
 * Tells IndexNow (Bing, Yandex, Seznam...) that the sitemap pages changed so
 * they crawl them sooner.
 *
 *   npm run indexnow                 -> checks the published key, then submits
 *   node scripts/indexnow.mjs --test -> prints what it would send, sends nothing
 *
 * Run BY HAND and AFTER a deploy, never in the build or the CI: IndexNow checks
 * https://www.cookyourwebai.es/<key>.txt, which only exists once the deployed
 * site includes the file. So before submitting, the script downloads the key
 * from the domain and stops if it does not match.
 *
 * The key is not secret: the protocol requires publishing it. It lives in
 * public/<key>.txt and there must be exactly one (src/test/indexnow.test.ts).
 * The host is read from DOMINIO_POR_DEFECTO, the single source of the domain.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dominio = readFileSync(join(root, "src/lib/rutas-publicas.ts"), "utf8").match(/DOMINIO_POR_DEFECTO = "([^"]+)"/)?.[1];
if (!dominio) throw new Error("DOMINIO_POR_DEFECTO not found in rutas-publicas.ts");

export const HOST = new URL(dominio).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** The request body: every URL of the sitemap, with the key and where it lives. */
export function cuerpoIndexNow(sitemap, clave) {
  return {
    host: HOST,
    key: clave,
    keyLocation: `https://${HOST}/${clave}.txt`,
    urlList: [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
  };
}

async function main() {
  const publica = join(root, "public");
  const ficheros = readdirSync(publica).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (ficheros.length !== 1) throw new Error(`Expected one key file in public/, found ${ficheros.length}`);
  const clave = ficheros[0].replace(".txt", "");
  const cuerpo = cuerpoIndexNow(readFileSync(join(publica, "sitemap.xml"), "utf8"), clave);

  if (process.argv.includes("--test")) {
    console.log(JSON.stringify(cuerpo, null, 2));
    return;
  }

  const publicada = await fetch(cuerpo.keyLocation).then((r) => (r.ok ? r.text() : ""));
  if (publicada.trim() !== clave) {
    throw new Error(`The key is not published at ${cuerpo.keyLocation}. Has the site been deployed yet?`);
  }

  const respuesta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(cuerpo),
  });
  // 200 and 202 are good (received). 403 = invalid key; 422 = URLs of another domain.
  console.log(`IndexNow answered ${respuesta.status} for ${cuerpo.urlList.length} URLs.`);
  if (!respuesta.ok) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
}
