// Rechercher et trier les opérations.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les opérations de cette parcelle (éventuellement vide).
export function filtrerParParcelle(operations, parcelle) {
  const resultat = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].parcelle === parcelle) {
      resultat.push(operations[i]);
    }
  }
  return resultat;
}

// Renvoie un NOUVEAU tableau avec les opérations de cette culture (éventuellement vide).
export function filtrerParCulture(operations, culture) {
  const resultat = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].culture === culture) {
      resultat.push(operations[i]);
    }
  }
  return resultat;
}

// Renvoie une COPIE triée par coût croissant, avec un comparateur numérique.
// Deux opérations de même coût gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParCout(operations) {
  const copie = [];
  for (let i = 0; i < operations.length; i++) {
    copie.push(operations[i]);
  }
  copie.sort(function(a, b) {
    return a.coutFCFA - b.coutFCFA;
  });
  return copie;
}

// Renvoie une COPIE triée par date, de la plus ancienne à la plus récente.
// Deux opérations de même date gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParDate(operations) {
  const copie = [];
  for (let i = 0; i < operations.length; i++) {
    copie.push(operations[i]);
  }
  copie.sort(function(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
  return copie;
}