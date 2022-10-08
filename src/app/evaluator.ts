// Fichier : evaluator.ts
// Auteur : Davis Eath
// Date : 2020-10-29
// But : Classe évaluateur de mains

import { Card } from './card';
import { Translator } from './translator';

export class Evaluator {

    /**
     * Constructeur pour la classe évaluateur
     * @param cards Les sept cartes à évaluer
     */
    constructor(cards: Card[]) {
        this.cards = cards;

        this.sortHand();
    }

    /**
     * Classe constante et statique contenant tous les ID numériques pour les types de valeurs d'une main
     */
    static TYPE = class {
        static readonly STRAIGHT_FLUSH = 8;
        static readonly FOUR_OF_A_KIND = 7;
        static readonly FULL_HOUSE = 6;
        static readonly FLUSH = 5;
        static readonly STRAIGHT = 4;
        static readonly THREE_OF_A_KIND = 3;
        static readonly TWO_PAIR = 2;
        static readonly PAIR = 1;
        static readonly HIGH_CARD = 0;
    };

    private cards: Card[];

    /**
     * Convertit une valeur de la main en une description en français
     * @param value la valeur numérique (hexadécimale)
     * @returns le texte en français
     */
    static convertValueToText(value: number): string {
        const type = this.hexValueAt(value, 6);
        let text = '';

        switch (type) {
            case this.TYPE.STRAIGHT_FLUSH: {
                const suit = this.hexValueAt(value, 0);
                const end = this.hexValueAt(value, 5);
                const start = end - 4;

                text += `quinte couleur : couleur de ${Translator.suitIdToText(suit)}, quinte ${Translator.rankIdToText(start, 'de', false, true)} `;
                text += `${Translator.rankIdToText(end, 'à')}`;

                break;
            }

            case this.TYPE.FOUR_OF_A_KIND: {
                const four = this.hexValueAt(value, 5);
                const high = this.hexValueAt(value, 4);

                text += `carré : carré ${Translator.rankIdToText(four, 'de', true)}, ${Translator.rankIdToText(high, 'au')}`;

                break;
            }

            case this.TYPE.FULL_HOUSE: {
                const three = this.hexValueAt(value, 5);
                const pair = this.hexValueAt(value, 4);

                text += `main pleine : brelan ${Translator.rankIdToText(three, 'de', true)}, paire ${Translator.rankIdToText(pair, 'de', true)}`;

                break;
            }

            case this.TYPE.FLUSH: {
                const suit = this.hexValueAt(value, 0);
                const high1 = this.hexValueAt(value, 5);
                const high2 = this.hexValueAt(value, 4);
                const high3 = this.hexValueAt(value, 3);
                const high4 = this.hexValueAt(value, 2);
                const high5 = this.hexValueAt(value, 1);

                text += `couleur : couleur de ${Translator.suitIdToText(suit)}, ${Translator.rankIdToText(high1)}, ${Translator.rankIdToText(high2)}, `;
                text += `${Translator.rankIdToText(high3)}, ${Translator.rankIdToText(high4)}, ${Translator.rankIdToText(high5)}`;

                break;
            }

            case this.TYPE.STRAIGHT: {
                const end = this.hexValueAt(value, 5);
                const start = end - 4;

                text += `quinte : quinte ${Translator.rankIdToText(start, 'de', false, true)} ${Translator.rankIdToText(end, 'à')}`;

                break;
            }

            case this.TYPE.THREE_OF_A_KIND: {
                const three = this.hexValueAt(value, 5);
                const high1 = this.hexValueAt(value, 4);
                const high2 = this.hexValueAt(value, 3);

                text += `brelan : brelan ${Translator.rankIdToText(three, 'de', true)}, ${Translator.rankIdToText(high1, 'au')}, `;
                text += `${Translator.rankIdToText(high2, 'au')}`;

                break;
            }

            case this.TYPE.TWO_PAIR: {
                const pair1 = this.hexValueAt(value, 5);
                const pair2 = this.hexValueAt(value, 4);
                const high = this.hexValueAt(value, 3);

                text += `deux paires : paire ${Translator.rankIdToText(pair1, 'de', true)} et ${Translator.rankIdToText(pair2, 'de', true)}, `;
                text += `${Translator.rankIdToText(high, 'au')}`;

                break;
            }

            case this.TYPE.PAIR: {
                const pair = this.hexValueAt(value, 5);
                const high1 = this.hexValueAt(value, 4);
                const high2 = this.hexValueAt(value, 3);
                const high3 = this.hexValueAt(value, 2);

                text += `paire : paire ${Translator.rankIdToText(pair, 'de', true)}, ${Translator.rankIdToText(high1, 'au')}, `;
                text += `${Translator.rankIdToText(high2, 'au')}, ${Translator.rankIdToText(high3, 'au')}`;

                break;
            }

            case this.TYPE.HIGH_CARD: {
                const high1 = this.hexValueAt(value, 5);
                const high2 = this.hexValueAt(value, 4);
                const high3 = this.hexValueAt(value, 3);
                const high4 = this.hexValueAt(value, 2);
                const high5 = this.hexValueAt(value, 1);

                text += `carte haute : ${Translator.rankIdToText(high1)}, ${Translator.rankIdToText(high2)}, ${Translator.rankIdToText(high3)}, `;
                text += `${Translator.rankIdToText(high4)}, ${Translator.rankIdToText(high5)}`;

                break;
            }
        }

        return text;
    }

    /**
     * Retourne les cinq cartes pertinentes d'une main de sept cartes
     * @param value la valeur de la main
     * @param cards les 7 cartes
     * @returns tableau 2D; 1er tableau contient les cartes pertinentes pour la valeur, 2e tableau contient les cartes hautes
     */
    static getRelevantCards(value: number, cards: Card[]): Card[][] {
        const type = this.hexValueAt(value, 6);
        const relevant: Card[] = [];
        const highs: Card[] = [];

        switch (type) {
            case this.TYPE.STRAIGHT_FLUSH: {
                const suit = this.hexValueAt(value, 0);
                const end = this.hexValueAt(value, 5);
                const start = end - 4 >= 0 ? end - 4 : 12;

                relevant.push(cards.find(c => c.suit === suit && c.rank === end));
                relevant.push(cards.find(c => c.suit === suit && c.rank === end - 1));
                relevant.push(cards.find(c => c.suit === suit && c.rank === end - 2));
                relevant.push(cards.find(c => c.suit === suit && c.rank === end - 3));
                relevant.push(cards.find(c => c.suit === suit && c.rank === start));

                break;
            }

            case this.TYPE.FOUR_OF_A_KIND: {
                const four = this.hexValueAt(value, 5);
                const high = this.hexValueAt(value, 4);

                relevant.push(...cards.filter(c => c.rank === four));
                highs.push(cards.find(c => c.rank === high));

                break;
            }

            case this.TYPE.FULL_HOUSE: {
                const three = this.hexValueAt(value, 5);
                const pair = this.hexValueAt(value, 4);

                relevant.push(...cards.filter(c => c.rank === three || c.rank === pair));

                break;
            }

            case this.TYPE.FLUSH: {
                const suit = this.hexValueAt(value, 0);
                const high1 = this.hexValueAt(value, 5);
                const high2 = this.hexValueAt(value, 4);
                const high3 = this.hexValueAt(value, 3);
                const high4 = this.hexValueAt(value, 2);
                const high5 = this.hexValueAt(value, 1);

                relevant.push(cards.find(c => c.suit === suit && c.rank === high1));
                relevant.push(cards.find(c => c.suit === suit && c.rank === high2));
                relevant.push(cards.find(c => c.suit === suit && c.rank === high3));
                relevant.push(cards.find(c => c.suit === suit && c.rank === high4));
                relevant.push(cards.find(c => c.suit === suit && c.rank === high5));

                break;
            }

            case this.TYPE.STRAIGHT: {
                const end = this.hexValueAt(value, 5);
                const start = end - 4 >= 0 ? end - 4 : 12;

                relevant.push(cards.find(c => c.rank === end));
                relevant.push(cards.find(c => c.rank === end - 1));
                relevant.push(cards.find(c => c.rank === end - 2));
                relevant.push(cards.find(c => c.rank === end - 3));
                relevant.push(cards.find(c => c.rank === start));

                break;
            }

            case this.TYPE.THREE_OF_A_KIND: {
                const three = this.hexValueAt(value, 5);
                const high1 = this.hexValueAt(value, 4);
                const high2 = this.hexValueAt(value, 3);

                relevant.push(...cards.filter(c => c.rank === three));
                highs.push(cards.find(c => c.rank === high1));
                highs.push(cards.find(c => c.rank === high2));

                break;
            }

            case this.TYPE.TWO_PAIR: {
                const pair1 = this.hexValueAt(value, 5);
                const pair2 = this.hexValueAt(value, 4);
                const high = this.hexValueAt(value, 3);

                relevant.push(...cards.filter(c => c.rank === pair1));
                relevant.push(...cards.filter(c => c.rank === pair2));
                highs.push(cards.find(c => c.rank === high));

                break;
            }

            case this.TYPE.PAIR: {
                const pair = this.hexValueAt(value, 5);
                const high1 = this.hexValueAt(value, 4);
                const high2 = this.hexValueAt(value, 3);
                const high3 = this.hexValueAt(value, 2);

                relevant.push(...cards.filter(c => c.rank === pair));
                highs.push(cards.find(c => c.rank === high1));
                highs.push(cards.find(c => c.rank === high2));
                highs.push(cards.find(c => c.rank === high3));

                break;
            }

            case this.TYPE.HIGH_CARD: {
                const high1 = this.hexValueAt(value, 5);
                const high2 = this.hexValueAt(value, 4);
                const high3 = this.hexValueAt(value, 3);
                const high4 = this.hexValueAt(value, 2);
                const high5 = this.hexValueAt(value, 1);

                highs.push(cards.find(c => c.rank === high1));
                highs.push(cards.find(c => c.rank === high2));
                highs.push(cards.find(c => c.rank === high3));
                highs.push(cards.find(c => c.rank === high4));
                highs.push(cards.find(c => c.rank === high5));

                break;
            }
        }

        return [relevant, highs];
    }

    /**
     * Obtient une valeur à une position donnée dans une valeur hexadécimale
     * @param value la valeur hexadécimale
     * @param position la position de la valeur à obtenir, de droite à gauche
     * @returns la valeur à la position
     */
    private static hexValueAt(value: number, position: number): number {
        const hex = value.toString(16).padStart(7, '0');
        const index = hex.length - position - 1;

        return parseInt(hex[index], 16);
    }

    /**
     * Trouve une quinte à partir d'une liste de cartes
     * @param cards les cartes à tester pour une quinte
     * @returns les cinq cartes formant une quinte, ou un tableau vide s'il n'y a pas de quinte
     */
    private static findStraight(cards: Card[]): Card[] {
        let straight: Card[] = [];
        const copiedCards = cards.slice();

        if (copiedCards.find(c => c.rank === Card.RANK.ACE)) {
            copiedCards.push(new Card(-1, Card.RANK.ACE_ONE));
        }

        for (const card of copiedCards) {
            if (straight.length === 0) {
                straight.push(card);
            }

            if (straight.length === 5) {
                break;
            }

            const prevCard = straight[straight.length - 1];
            const difference = prevCard.rank - card.rank;

            if (difference === 1) {
                straight.push(card);
            } else {
                straight = [card];
            }
        }

        return straight.length === 5 ? straight : [];
    }

    /**
     * Trie les cartes par leur valeur, puis par leur sorte
     */
    sortHand(): void {
        this.cards = this.cards.sort((a, b) => {
            if (a.rank === b.rank) {
                return b.suit - a.suit;
            }

            return b.rank - a.rank;
        });
    }

    /**
     * Retourne la valeur hexadécimale de la main
     * @returns valeur hexadécimale
     * @see structure-valeur-hex.pdf
     */
    getValue(): number {
        const suits: Card[][] = [
            this.cards.filter(c => c.suit === Card.SUIT.SPADE),
            this.cards.filter(c => c.suit === Card.SUIT.CLUB),
            this.cards.filter(c => c.suit === Card.SUIT.DIAMOND),
            this.cards.filter(c => c.suit === Card.SUIT.HEART)
        ];

        const ranks: Card[][] = [
            this.cards.filter(c => c.rank === Card.RANK.TWO),
            this.cards.filter(c => c.rank === Card.RANK.THREE),
            this.cards.filter(c => c.rank === Card.RANK.FOUR),
            this.cards.filter(c => c.rank === Card.RANK.FIVE),
            this.cards.filter(c => c.rank === Card.RANK.SIX),
            this.cards.filter(c => c.rank === Card.RANK.SEVEN),
            this.cards.filter(c => c.rank === Card.RANK.EIGHT),
            this.cards.filter(c => c.rank === Card.RANK.NINE),
            this.cards.filter(c => c.rank === Card.RANK.TEN),
            this.cards.filter(c => c.rank === Card.RANK.JACK),
            this.cards.filter(c => c.rank === Card.RANK.QUEEN),
            this.cards.filter(c => c.rank === Card.RANK.KING),
            this.cards.filter(c => c.rank === Card.RANK.ACE)
        ];

        // ----- QUINTE FLUSH -----
        const flush = suits.find(c => c.length >= 5);

        if (flush) {
            const flushStraight: Card[] = Evaluator.findStraight(flush);

            if (flushStraight.length === 5) {
                let value = Evaluator.TYPE.STRAIGHT_FLUSH * Math.pow(16, 6);

                value += flushStraight[0].rank * Math.pow(16, 5);
                value += flushStraight[0].suit;

                return value;
            }
        }

        // ----- CARRÉ -----
        const four = ranks.findLastIndex(c => c.length === 4);

        if (four > -1) {
            const high = this.cards.find(c => c.rank !== four);

            let value = Evaluator.TYPE.FOUR_OF_A_KIND * Math.pow(16, 6);

            value += four * Math.pow(16, 5);
            value += high.rank * Math.pow(16, 4);

            return value;
        }

        // ----- FULL -----
        const three = ranks.findLastIndex(c => c.length === 3);
        const pair = ranks.findLastIndex(c => c.length === 2);

        if (three > -1 && pair > -1) {
            let value = Evaluator.TYPE.FULL_HOUSE * Math.pow(16, 6);

            value += three * Math.pow(16, 5);
            value += pair * Math.pow(16, 4);

            return value;
        }

        // ----- COULEUR -----
        if (flush) {
            let value = Evaluator.TYPE.FLUSH * Math.pow(16, 6);

            value += flush[0].rank * Math.pow(16, 5);
            value += flush[1].rank * Math.pow(16, 4);
            value += flush[2].rank * Math.pow(16, 3);
            value += flush[3].rank * Math.pow(16, 2);
            value += flush[4].rank * Math.pow(16, 1);
            value += flush[0].suit;

            return value;
        }

        // ----- QUINTE -----
        const straight = Evaluator.findStraight(this.cards);

        if (straight.length === 5) {
            let value = Evaluator.TYPE.STRAIGHT * Math.pow(16, 6);

            value += straight[0].rank * Math.pow(16, 5);

            return value;
        }

        // ----- BRELAN -----
        if (three > -1) {
            const others = this.cards.filter(c => c.rank !== three);

            let value = Evaluator.TYPE.THREE_OF_A_KIND * Math.pow(16, 6);

            value += three * Math.pow(16, 5);
            value += others[0].rank * Math.pow(16, 4);
            value += others[1].rank * Math.pow(16, 3);

            return value;
        }

        // ----- DEUX PAIRES -----
        // on retire la première paire pour la recherche de la deuxième paire avec .map()
        const pair2 = ranks.map(c => c[0]?.rank === pair ? [] : c).findLastIndex(c => c.length === 2);

        if (pair > -1 && pair2 > -1) {
            const high = this.cards.find(c => c.rank !== pair && c.rank !== pair2);

            let value = Evaluator.TYPE.TWO_PAIR * Math.pow(16, 6);

            value += pair * Math.pow(16, 5);
            value += pair2 * Math.pow(16, 4);
            value += high.rank * Math.pow(16, 3);

            return value;
        }

        // ----- PAIRE -----
        if (pair > -1) {
            const others = this.cards.filter(c => c.rank !== pair);

            let value = Evaluator.TYPE.PAIR * Math.pow(16, 6);

            value += pair * Math.pow(16, 5);
            value += others[0].rank * Math.pow(16, 4);
            value += others[1].rank * Math.pow(16, 3);
            value += others[2].rank * Math.pow(16, 2);

            return value;
        }

        // ----- CARTE HAUTE -----
        let value = Evaluator.TYPE.HIGH_CARD * Math.pow(16, 6);

        value += this.cards[0].rank * Math.pow(16, 5);
        value += this.cards[1].rank * Math.pow(16, 4);
        value += this.cards[2].rank * Math.pow(16, 3);
        value += this.cards[3].rank * Math.pow(16, 2);
        value += this.cards[4].rank * Math.pow(16, 1);

        return value;
    }
}
