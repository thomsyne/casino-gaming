import { Component, Input, OnInit } from '@angular/core';
import { GamesModel } from 'src/app/core/models/data.model';

@Component({
  selector: 'app-game-image',
  templateUrl: './game-image.component.html',
  styleUrls: ['./game-image.component.scss']
})
export class GameImageComponent implements OnInit {
  @Input() imageData: GamesModel;

  constructor() { }

  ngOnInit() {
  }

  get isImageTop(){
    return this.imageData?.categories?.includes('top')
  }

  get isImageNew(){
    return this.imageData?.categories?.includes('new')
  }

}
