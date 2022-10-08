// Fichier : player.ts
// Auteur : Davis Eath
// Date : 2020-10-29
// But : Représentation d'un joueur

import { Card } from './card';
import { Evaluator } from './evaluator';

export class Player {

    private _cards: Card[];
    private _value: number;
    private _textValue: string;

    /**
     * Constructeur pour la classe joueur
     * @param card1 première carte privée du joueur
     * @param card2 deuxième carte privée du joueur
     */
    constructor(card1: Card, card2: Card) {
        this._cards = [card1, card2];
    }

    /**
     * Retourne les cartes privées du joueur
     */
    get cards(): Card[] {
        return this._cards;
    }

    /**
     * Retourne la valeur en hexadécimal
     */
    get value(): number {
        return this._value;
    }

    /**
     * Écrit la valeur de la main (fonctionne qu'une seule fois par instance)
     */
    set value(value: number) {
        if (this._value) {
            return;
        }

        this._value = value;
        this._textValue = Evaluator.convertValueToText(value);
    }

    /**
     * Retourne la valeur en français
     */
    get textValue(): string {
        return this._textValue;
    }
}
