import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { GamesModel, JackPotModel } from 'src/app/core/models/data.model';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit, OnDestroy {

  otherGames: GamesModel[] = [];
  jackpots: JackPotModel[] = [];
  subscriptions: Subscription[] = [];
  filters: string[] = ['ball', 'virtual', 'fun'];

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
          this.otherGames = response[0].filter((r) => this.findCommonElements(this.filters, r.categories)  );
          this.jackpots = response[1];

          this.mapGameToJackPot()

          this.otherGames.some((t) => this.jackpots.some((j) => j.game == t.id )) ? this.callJackpots() : null
        })
    )

  }

  findCommonElements(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
  }

  mapGameToJackPot(){
    this.otherGames.map((t) => {
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
