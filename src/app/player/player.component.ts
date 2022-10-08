// Fichier : round.component.ts
// Auteur : Davis Eath
// Date : 2020-11-01
// But : Composant visuel représentant un joueur

import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import { Player } from '../player';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    @Input() playerNumber: number;
    @Input() player: Player;
    @Input() winner: boolean;
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
