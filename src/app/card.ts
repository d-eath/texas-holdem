// Fichier : card.ts
// Auteur : Davis Eath
// Date : 2020-10-29
// But : Représentation d'une carte à jouer

export class Card {

    /**
     * Classe constante et statique contenant tous les ID numériques pour les sortes
     */
    static SUIT = class {
        static readonly SPADE = 0;
        static readonly CLUB = 1;
        static readonly DIAMOND = 2;
        static readonly HEART = 3;
    };

    /**
     * Classe constante et statique contenant tous les ID numériques pour les valeurs
     */
    static RANK = class {
        static readonly ACE_ONE = -1;
        static readonly TWO = 0;
        static readonly THREE = 1;
        static readonly FOUR = 2;
        static readonly FIVE = 3;
        static readonly SIX = 4;
        static readonly SEVEN = 5;
        static readonly EIGHT = 6;
        static readonly NINE = 7;
        static readonly TEN = 8;
        static readonly JACK = 9;
        static readonly QUEEN = 10;
        static readonly KING = 11;
        static readonly ACE = 12;
    };

    private _suit: number;
    private _rank: number;

    /**
     * Constructeur pour la classe carte
     * @param suit la sorte en ID numérique
     * @param rank la valeur en ID numérique
     */
    constructor(suit: number, rank: number) {
        this._suit = suit;
        this._rank = rank;
    }

    /**
     * Retourne la sorte de la carte
     */
    get suit(): number {
        return this._suit;
    }

    /**
     * Retourne la valeur de la carte
     */
    get rank(): number {
        return this._rank;
    }

    /**
     * Carte en chaîne de caractères pour le nom du fichier de l'image
     * @returns La valeur et le symbole en chaîne de caractères
     */
    public toString(): string {
        let rank: string;
        let suit: string;

        if (this.rank < Card.RANK.TEN) {
            rank = (this.rank + 2).toString();
        } else {
            switch (this.rank) {
                case Card.RANK.TEN:
                    rank = 'T';
                    break;

                case Card.RANK.JACK:
                    rank = 'J';
                    break;

                case Card.RANK.QUEEN:
                    rank = 'Q';
                    break;

                case Card.RANK.KING:
                    rank = 'K';
                    break;

                case Card.RANK.ACE:
                case Card.RANK.ACE_ONE:
                    rank = 'A';
                    break;
            }
        }

        switch (this.suit) {
            case Card.SUIT.SPADE:
                suit = 'S';
                break;

            case Card.SUIT.CLUB:
                suit = 'C';
                break;

            case Card.SUIT.DIAMOND:
                suit = 'D';
                break;

            case Card.SUIT.HEART:
                suit = 'H';
                break;
        }

        return suit + rank;
    }
}
