import { forkJoin, Subscription } from 'rxjs';
import { GamesService } from './../../core/services/games.service';
import { GamesModel, JackPotModel } from './../../core/models/data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-top-games',
  templateUrl: './top-games.component.html',
  styleUrls: ['./top-games.component.scss']
})
export class TopGamesComponent implements OnInit, OnDestroy {

  topGames: GamesModel[] = [];
  jackpots: JackPotModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private readonly gamesService: GamesService
  ) { }

  ngOnInit() {
    this.getGamesAndJackpots()
  }

  getGamesAndJackpots(){

    const games = this.gamesService.fetchAllGames();
    const jackpots = this.gamesService.fetchJackpotGames();

    this.subscriptions.push(
        forkJoin([games, jackpots]).subscribe((response: [GamesModel[], JackPotModel[]]) => {
          this.topGames = response[0].filter((r) => r.categories.includes('top'));
          this.jackpots = response[1];

          this.mapGameToJackPot()

          this.topGames.some((t) => this.jackpots.some((j) => j.game == t.id )) ? this.callJackpots() : null

        })
    )

  }

mapGameToJackPot(){
  this.topGames.map((t) => {
    if (this.jackpots.some((j) => j.game == t.id)){
      t.isJackPot = true;
      t.amount = this.jackpots.find((j) => j.game == t.id).amount
    }
  })
}

callJackpots(){
  this.subscriptions.push(this.gamesService.fetchJackpotGames().subscribe((response: JackPotModel[]) =>{
    this.jackpots = response;
    this.mapGameToJackPot()
  
  }))
  setTimeout(() => {
    this.callJackpots()
  }, 3000);
}

ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    })
}

}
