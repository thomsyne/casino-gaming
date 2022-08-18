import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentRoute: string = '';
  subscription: Subscription;

  navbarItems: any = [
    {name: 'Top Games', url: 'top-games'},
    {name: 'New Games', url: 'new-games'},
    {name: 'Slots', url: 'slots'},
    {name: 'Jackpots', url: 'jackpots'},
    {name: 'Live', url: 'live'},
    {name: 'Blackjack', url: 'blackjack'},
    {name: 'Roulette', url: 'roulette'},
    {name: 'Table', url: 'table'},
    {name: 'Poker', url: 'poker'},
    {name: 'Other', url: 'other'},
  ]

  constructor(
    public readonly router: Router
  ) { 
    this.subscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!  
        const url = event.urlAfterRedirects;
        this.currentRoute = url.replace('/', '')
      }
    })
  }

  ngOnInit() {
  }

  routeToPage(route: string): void {
    this.router.navigate([route])
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
