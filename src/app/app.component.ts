// Fichier : app.component.ts
// Auteur : Davis Eath
// Date : 2020-11-01
// But : Noyau de l'application

import { Component, ViewChild } from '@angular/core';
import { RoundComponent } from './round/round.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'texas-holdem';

    ready = false;

    @ViewChild(RoundComponent, { static: false })
    private roundComponent: RoundComponent;

    /**
     * Affiche la table pour une ronde et démarre la ronde
     */
    startRound(): void {
        this.roundComponent.start();
        this.ready = true;
    }
}
