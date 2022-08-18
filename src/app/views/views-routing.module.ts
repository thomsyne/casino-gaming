import { RouletteComponent } from './roulette/roulette.component';
import { SlotsComponent } from './slots/slots.component';
import { TopGamesComponent } from './top-games/top-games.component';
import { PokerComponent } from './poker/poker.component';
import { OtherComponent } from './other/other.component';
import { NewGamesComponent } from './new-games/new-games.component';
import { LiveComponent } from './live/live.component';
import { JackpotsComponent } from './jackpots/jackpots.component';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { TableComponent } from './table/table.component';
import { ViewsComponent } from './views/views.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: "blackjack",
        component: BlackjackComponent
      },
      {
        path: "jackpots",
        component: JackpotsComponent
      },
      {
        path: "live",
        component: LiveComponent
      },
      {
        path: "new-games",
        component: NewGamesComponent
      },
      {
        path: "other",
        component: OtherComponent
      },
      {
        path: "poker",
        component: PokerComponent
      },
      {
        path: "roulette",
        component: RouletteComponent
      },
      {
        path: "slots",
        component: SlotsComponent
      },
      {
        path: "table",
        component: TableComponent
      },
      {
        path: "top-games",
        component: TopGamesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'top-games',
    component: TopGamesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
