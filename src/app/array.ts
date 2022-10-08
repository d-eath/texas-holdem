// Fichier : array.ts
// Auteur : Davis Eath
// Date : 2020-11-01
// But : Ajouter une fonction prototype pour les tableaux (findLastIndex)

interface Array<T> {
    findLastIndex(callback: (element: T, index: number, array: Array<T>) => boolean, thisArg?: any): number;
}

/**
 * Fait la même chose que Array.prototype.findIndex(), mais renvoie l'indice du DERNIER élément du tableau satisfaisant la condition
 * Array.prototype.findIndex(): https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/findIndex
 */
Array.prototype.findLastIndex = function(callback: (element: any, index: number, array: Array<any>) => boolean, thisArg?: any): number {
    const array = this as Array<any>;

    for (let i = array.length - 1; i >= 0; i--) {
        if (callback.call(thisArg, array[i], i, array)) {
            return i;
        }
    }

    return -1;
};
