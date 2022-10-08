// Fichier : round.component.ts
// Auteur : Davis Eath
// Date : 2020-11-01
// But : Composant central pour une ronde de Poker

import { Component, OnInit } from '@angular/core';

import { Card } from '../card';
import { Deck } from '../deck';
import { Evaluator } from '../evaluator';
import { Player } from '../player';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

    private deck: Deck;
    players: Player[];
    winners: Player[];
    flop: Card[];
    turn: Card;
    river: Card;
    highlights: Card[][];

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Démarre une ronde de Poker
     */
    start(): void {
        this.deck = new Deck();
        this.deck.shuffle();

        this.dealCards();
        this.evaluateHands();
        this.determineWinner();
    }

    /**
     * Distribue les cartes du paquet au joueurs, puis les cartes publiques
     */
    private dealCards(): void {
        this.players = [];

        for (let i = 0; i < 4; i++) {
            this.players.push(new Player(this.deck.draw(), this.deck.draw()));
        }

        this.flop = [];

        for (let i = 0; i < 3; i++) {
            this.flop.push(this.deck.draw());
        }

        this.turn = this.deck.draw();
        this.river = this.deck.draw();
    }

    /**
     * Évalue la main de chaque joueur et assigne une valeur numérique
     */
    private evaluateHands(): void {
        for (const player of this.players) {
            player.value = new Evaluator([
                player.cards[0],
                player.cards[1],
                this.flop[0],
                this.flop[1],
                this.flop[2],
                this.turn,
                this.river
            ]).getValue();
        }
    }

    /**
     * Détermine le ou les gagnants de la ronde à partir de leur valeur numérique, et retrouve les cartes pertinentes à la valeur de la main
     */
    private determineWinner(): void {
        // on divise par 16 pour ne pas compter la sorte de la valeur de la main
        const standings = this.players.slice().sort((a, b) => Math.floor(b.value / 16) - Math.floor(a.value / 16));

        this.winners = standings.filter(p => Math.floor(p.value / 16) >= Math.floor(standings[0].value / 16));
        this.highlights = [[], []]; // 1er tableau = cartes pertinentes à la valeur, 2e tableau = cartes hautes

        // enphase visuelle des cartes pertinents à la valeur de la main
        for (const winner of this.winners) {
            const relevant = Evaluator.getRelevantCards(winner.value, [...this.flop, this.turn, this.river, ...winner.cards]);

            // cartes pertinentes à la valeurs
            for (const card of relevant[0]) {
                if (!this.highlights[0].includes(card)) {
                    this.highlights[0].push(card);
                }
            }

            // cartes hautes
            for (const card of relevant[1]) {
                if (!this.highlights[1].includes(card)) {
                    this.highlights[1].push(card);
                }
            }
        }
    }
}
