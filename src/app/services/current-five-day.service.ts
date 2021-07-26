import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FiveDays } from '../modules/fiveDays';
import { CurrentConditions } from '../modules/currentConditions';
import { FavoritesService } from './favorites.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentFiveDayService {
  /* The value of lat and lon is for Tel Aviv Coordinates by Default */
  currentCityName: string = '';
  LocationKey: string = '';
  lat: string = '32.111767';
  lon: string = '34.801361';
  fiveDaysDailyForecasts = new FiveDays();
  currentConditions: Array<CurrentConditions> = new Array();

  constructor(
    public Api: ApiService,
    public favoritesService: FavoritesService,
    public styleService: ThemeService
  ) {
    this.checkIfCurrentLocationIsFavorite();
    this.getLocationByLatLon();
  }

  getLocationByLatLon = async () => {
    let res = (await this.Api.getApiRequest(
      `locations/v1/cities/geoposition/search?apikey=${this.Api.apikey}&q=${this.lat},${this.lon}`
    )) as any;
    this.currentCityName = res.AdministrativeArea.EnglishName;
    this.LocationKey = res.Key;
    this.getFiveDayForecastsFromServer();
    this.getCurrentConditionsFromServer();
  };

  checkIfCurrentLocationIsFavorite = () => {
    let isFavorite = this.favoritesService.favoritesLocalStorageCities.find(
      (city) => city.locationKey === this.LocationKey
    );
    return isFavorite;
  };

  getCurrentConditionsFromServer = async () => {
    if (this.LocationKey != '')
      this.currentConditions = (await this.Api.getApiRequest(
        `currentconditions/v1/${this.LocationKey}?apikey=${this.Api.apikey}`
      )) as Array<CurrentConditions>;
  };

  getFiveDayForecastsFromServer = async () => {
    this.fiveDaysDailyForecasts = (await this.Api.getApiRequest(
      `forecasts/v1/daily/5day/${this.LocationKey}?apikey=${this.Api.apikey}&metric=${this.styleService.isMetric}`
    )) as FiveDays;
  };
}
