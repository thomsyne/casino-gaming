import { JackPotModel } from './../models/data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesModel } from '../models/data.model';
import { Observable } from 'rxjs';
import { allGamesUrl, jackpotUrl } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private readonly http: HttpClient) {}

  fetchAllGames(): Observable<GamesModel[]> {
    return this.http.get<GamesModel[]>(allGamesUrl);
  }

  fetchJackpotGames(): Observable<JackPotModel[]> {
    return this.http.get<JackPotModel[]>(jackpotUrl);
  }
}
