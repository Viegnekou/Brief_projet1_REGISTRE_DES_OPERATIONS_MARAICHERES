// Ajouter et lister les opérations.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des opérations culturales acceptées, fournie par le coach agronomie.
export const OPERATIONS = ['semis', 'arrosage', 'désherbage', 'repiquage', 'récolte'];

// Renvoie une ligne de texte qui décrit l'opération.
// Exemple : 'O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA'
export function formaterOperation(operation) {
    return `${operation.id} | ${operation.date} | ${operation.parcelle} | ${operation.culture} | ${operation.operation} | ${operation.coutFCFA} FCFA`;
}

// Renvoie un texte avec une opération par ligne (lignes séparées par '\n'),
// ou 'Aucune opération enregistrée.' si la liste est vide.
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

// Renvoie l'opération qui a cet identifiant, ou undefined si elle n'existe pas.
export function trouverParId(operations, id) {
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].id === id) {
            return operations[i];
        }
    }
    return undefined;
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'O11', date: '2026-10-27', parcelle: 'P1', culture: 'tomate', operation: 'récolte', coutFCFA: '2500' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
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
    if (saisie.coutFCFA === undefined || saisie.coutFCFA === null || String(saisie.coutFCFA).trim() === '') {
        erreurs.push("Le coût doit être un nombre positif ou nul (en FCFA).");
    } else {
        const cout = versNombre(saisie.coutFCFA);
        if (Number.isNaN(cout) || cout < 0) {
            erreurs.push("Le coût doit être un nombre positif ou nul (en FCFA).");
        }
    }
    return erreurs;
}

// Fabrique l'opération à enregistrer à partir d'une saisie VALIDE : coutFCFA devient un nombre.
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

// Ajoute la saisie au registre si elle est valide (verifierOperation, puis creerOperation).
// Renvoie les erreurs : [] si l'opération a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterOperation(operations, saisie) {
    const erreurs = verifierOperation(saisie, operations);
    if (erreurs.length > 0) {
        return erreurs;
    }
    const nouvelleOperation = creerOperation(saisie);
    operations.push(nouvelleOperation);
    return [];
}