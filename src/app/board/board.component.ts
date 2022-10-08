// Fichier : round.component.ts
// Auteur : Davis Eath
// Date : 2020-11-01
// But : Composant visuel représentant les cartes publiques

import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

    @Input() flop: Card[];
    @Input() turn: Card;
    @Input() river: Card;
    @Input() highlights: Card[][];

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Détermine si la carte donnée est pertinente à la valeur ou est une carte haute
     * @param card la carte à vérifier
     * @returns 0 = carte non-pertinente, 1 = carte pertinente, 2 = carte haute
     */
    getHighlight(card: Card): number {
        if (this.highlights[0].includes(card)) {
            return 1;
        }

        if (this.highlights[1].includes(card)) {
            return 2;
        }

        return 0;
    }
}
