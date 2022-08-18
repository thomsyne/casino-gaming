import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { GamesModel, JackPotModel } from 'src/app/core/models/data.model';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-jackpots',
  templateUrl: './jackpots.component.html',
  styleUrls: ['./jackpots.component.scss']
})
export class JackpotsComponent implements OnInit, OnDestroy {

  

  allGames: GamesModel[] = [];
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
          this.allGames = response[0];
          this.jackpots = response[1];

          this.mapGameToJackPot()

          this.callJackpots()

        })
    )

  }

  mapGameToJackPot(){
    this.allGames = this.allGames.filter((t) => {
      if (this.jackpots.some((j) => j.game == t.id)){
        t.isJackPot = true;
        t.amount = this.jackpots.find((j) => j.game == t.id).amount

        return t
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
