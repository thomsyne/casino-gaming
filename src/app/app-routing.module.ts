import { TopGamesComponent } from './views/top-games/top-games.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top-games',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: async () =>
      ( await import('./views/views.module')).ViewsModule
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
