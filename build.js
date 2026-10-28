// Assemble src/template.html + listes/*.txt -> generateur-mdp.html (fichier autonome).
// Usage : node build.js
const fs = require("fs");
const path = require("path");

const root = __dirname;
const readList = (file) =>
  fs.readFileSync(path.join(root, "listes", file), "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim().split(/\s+/).pop())
    .filter(Boolean);

// La liste française d'origine (CC-BY-3.0, C.-M. Duquesne) contient des jetons parasites
// ("=", "--", "aa", "ab"...) : on ne garde que les mots de lettres seules, d'au moins 3 lettres.
const frOnlyWords = (words) => words.filter((w) => /^\p{L}{3,}$/u.test(w));

const lists = {
  en: readList("eff_large_wordlist.txt"),
  fr: frOnlyWords(readList("diceware-fr-5-jets.txt")),
};
for (const [k, v] of Object.entries(lists)) {
  if (v.length < 6000 || new Set(v).size !== v.length) throw new Error(`Liste ${k} invalide (${v.length} mots)`);
  console.log(`${k} : ${v.length} mots (${Math.log2(v.length).toFixed(2)} bits/mot)`);
}

const tpl = fs.readFileSync(path.join(root, "src", "template.html"), "utf8");
const marker = /\/\*WORDLISTS\*\/[\s\S]*?\/\*END\*\//;
if (!marker.test(tpl)) throw new Error("Marqueur WORDLISTS introuvable");
const out = tpl.replace(marker, () => JSON.stringify(lists));
fs.writeFileSync(path.join(root, "generateur-mdp.html"), out);
console.log(`generateur-mdp.html : ${(out.length / 1024).toFixed(0)} Ko`);
