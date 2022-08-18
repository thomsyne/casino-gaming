import { SharedModule } from './../shared/shared.module';
import { SlotsComponent } from './slots/slots.component';
import { RouletteComponent } from './roulette/roulette.component';
import { PokerComponent } from './poker/poker.component';
import { OtherComponent } from './other/other.component';
import { NewGamesComponent } from './new-games/new-games.component';
import { LiveComponent } from './live/live.component';
import { JackpotsComponent } from './jackpots/jackpots.component';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { TableComponent } from './table/table.component';
import { ViewsComponent } from './views/views.component';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { TopGamesComponent } from './top-games/top-games.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BlackjackComponent,
    JackpotsComponent,
    LiveComponent,
    NewGamesComponent,
    OtherComponent,
    PokerComponent,
    RouletteComponent,
    SlotsComponent,
    TableComponent,
    TopGamesComponent,
    TableComponent,
    ViewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewsRoutingModule
  ],
})
export class ViewsModule { }
