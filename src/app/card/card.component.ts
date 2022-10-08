// Fichier : round.component.ts
// Auteur : Davis Eath
// Date : 2020-11-01
// But : Composant visuel d'une carte à jouer

import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Input() card: Card;
    @Input() highlight: number;

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Retourne le mot en français pour la sorte de la carte
     * @returns le mot pour la sorte
     */
    getSuitText(): string {
        switch (this.card.suit) {
            case Card.SUIT.SPADE:
                return 'pique';

            case Card.SUIT.CLUB:
                return 'trèfle';

            case Card.SUIT.DIAMOND:
                return 'carreau';

            case Card.SUIT.HEART:
                return 'cœur';

            default:
                return null;
        }
    }

    /**
     * Retourne le mot en français pour la valeur de la carte
     * @returns le mot pour la valeur
     */
    getRankText(): string {
        switch (this.card.rank) {
            case Card.RANK.TWO:
                return 'deux';

            case Card.RANK.THREE:
                return 'trois';

            case Card.RANK.FOUR:
                return 'quatre';

            case Card.RANK.FIVE:
                return 'cinq';

            case Card.RANK.SIX:
                return 'six';

            case Card.RANK.SEVEN:
                return 'sept';

            case Card.RANK.EIGHT:
                return 'huit';

            case Card.RANK.NINE:
                return 'neuf';

            case Card.RANK.TEN:
                return 'dix';

            case Card.RANK.JACK:
                return 'valet';

            case Card.RANK.QUEEN:
                return 'reine';

            case Card.RANK.KING:
                return 'roi';

            case Card.RANK.ACE:
            case Card.RANK.ACE_ONE:
                return 'as';

            default:
                return null;
        }
    }
}
