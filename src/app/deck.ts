// Fichier : deck.ts
// Auteur : Davis Eath
// Date : 2020-10-29
// But : Représentation d'un paquet de 52 cartes à jouer

import { Card } from './card';

export class Deck {

    private cards: Card[] = [];
    private cursor = 0;

    /**
     * Constructeur pour la classe paquet
     * Peuple le paquet avec les 52 cartes
     */
    constructor() {
        for (let i = 0; i <= Card.SUIT.HEART; i++) {
            for (let j = 0; j <= Card.RANK.ACE; j++) {
                this.cards.push(new Card(i, j));
            }
        }
    }

    /**
     * Mélange les 52 cartes et réinitialise le curseur à 0
     */
    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }

        this.cursor = 0;
    }

    /**
     * Retourne la carte au causeur, et incrémente la position du curseur
     * @returns la carte, ou null s'il ne reste plus de cartes
     */
    draw(): Card {
        if (this.cursor >= this.cards.length) {
            return null;
        }

        return this.cards[this.cursor++];
    }
}
