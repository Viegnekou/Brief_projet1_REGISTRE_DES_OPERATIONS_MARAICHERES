
import { estDateValide, versNombre } from './outils.js';

// Liste des opérations agricoles autorisées
export const OPERATIONS = [
    'semis',
    'arrosage',
    'désherbage',
    'repiquage',
    'récolte'
];

// 1. Formater une opération
export function formaterOperation(operation) {

    return `${operation.id} | ${operation.date} | ${operation.parcelle} | ${operation.culture} | ${operation.operation} | ${operation.coutFCFA} FCFA`;

}

// 2. Afficher toutes les opérations
export function listerOperations(operations) {

    if (operations.length === 0) {
        return 'Aucune opération enregistrée.';
    }

    const lignes = [];

    for (let i = 0; i < operations.length; i++) {
        lignes.push(formaterOperation(operations[i]));
    }

    return lignes.join('\n');
}

// 3. Rechercher une opération par son identifiant
export function trouverParId(operations, id) {

    for (let i = 0; i < operations.length; i++) {

        if (operations[i].id === id) {
            return operations[i];
        }

    }

    return undefined;
}

// 4. Vérifier les informations saisies
export function verifierOperation(saisie, operations) {

    const erreurs = [];

    if (!saisie.id || saisie.id.trim() === '') {
        erreurs.push("L'identifiant est obligatoire.");
    } else if (trouverParId(operations, saisie.id)) {
        erreurs.push("Cet identifiant existe déjà.");
    }

    if (!estDateValide(saisie.date)) {
        erreurs.push("La date est invalide.");
    }

    if (!saisie.parcelle || saisie.parcelle.trim() === '') {
        erreurs.push("La parcelle est obligatoire.");
    }

    if (!saisie.culture || saisie.culture.trim() === '') {
        erreurs.push("La culture est obligatoire.");
    }

    if (!OPERATIONS.includes(saisie.operation)) {
        erreurs.push("L'opération est invalide.");
    }

    const cout = versNombre(saisie.coutFCFA);

    if (Number.isNaN(cout) || cout < 0) {
        erreurs.push("Le coût doit être un nombre positif ou nul (en FCFA).");
    }

    return erreurs;
}

// 5. Créer une opération
export function creerOperation(saisie) {

    const nouvelleOperation = {
        id: saisie.id,
        date: saisie.date,
        parcelle: saisie.parcelle,
        culture: saisie.culture,
        operation: saisie.operation,
        coutFCFA: versNombre(saisie.coutFCFA)
    };

    return nouvelleOperation;
}

// 6. Ajouter une opération au registre
export function ajouterOperation(operations, saisie) {

    const erreurs = verifierOperation(saisie, operations);

    if (erreurs.length > 0) {
        return erreurs;
    }

    const nouvelleOperation = creerOperation(saisie);

    operations.push(nouvelleOperation);

    return [];
}
