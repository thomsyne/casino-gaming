import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { GamesModel, JackPotModel } from 'src/app/core/models/data.model';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent implements OnInit, OnDestroy {

  blackjackGames: GamesModel[] = [];
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
          this.blackjackGames = response[0].filter((r) => r.categories.includes('blackjack'));
          this.jackpots = response[1];

          this.mapGameToJackPot()
          
          this.blackjackGames.some((t) => this.jackpots.some((j) => j.game == t.id )) ? this.callJackpots() : null

        })
    )

  }

  mapGameToJackPot(){
    this.blackjackGames.map((t) => {
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
