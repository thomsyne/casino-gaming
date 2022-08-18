import { GameImageComponent } from './game-image/game-image.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, GameImageComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, GameImageComponent],
})
export class SharedModule {}