import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoundComponent } from './round/round.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';

import './array';

@NgModule({
    declarations: [
        AppComponent,
        RoundComponent,
        CardComponent,
        BoardComponent,
        PlayerComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
