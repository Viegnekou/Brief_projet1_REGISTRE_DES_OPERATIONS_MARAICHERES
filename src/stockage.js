// Lire et écrire les données dans un fichier JSON.
// Fiche : fiches/2-donnees-json.md · Vérifier : npm run test:stockage
import { readFile, writeFile } from 'node:fs/promises';

// Lit le fichier JSON et renvoie le tableau qu'il contient.
// Si le fichier n'existe pas ou n'est pas du JSON valide, laisse l'erreur remonter.
export async function chargerJson(chemin) {
  const texte = await readFile(chemin, 'utf8');
  return JSON.parse(texte);
}

// Écrit le tableau dans le fichier, au format JSON indenté de 2 espaces.
// Le contenu précédent du fichier est remplacé.
export async function enregistrerJson(chemin, enregistrements) {
  const texte = JSON.stringify(enregistrements, null, 2);
  await writeFile(chemin, texte, 'utf8');
}