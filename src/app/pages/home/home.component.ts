import { Component } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { CurrentFiveDayService } from 'src/app/services/current-five-day.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Location } from '../../modules/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchLocationsInput: string = '';
  locationsFromServer: Array<Location> = new Array();
  isFavoriteLocation: boolean = false;
  onlyEnglish: string = '* Search is possible only in English';

  constructor(
    public Api: ApiService,
    public fiveDaysService: CurrentFiveDayService,
    public favoritesService: FavoritesService,
    public styleService: ThemeService,
    public sweetAlertService: SweetalertService
  ) {
    this.checkIsFavorite();
    this.fiveDaysService.getCurrentConditionsFromServer();
  }

  /**
   *Here we get the user input and send to server every typing 
   And get back location list
   */
  getAutoCompleteLocationsOnSearch = async (searchInput: string) => {
    this.locationsFromServer = (await this.Api.getApiRequest(
      `locations/v1/cities/autocomplete?apikey=${this.Api.apikey}&q=${searchInput}`
    )) as Array<Location>;
  };

  /**
   *This function came from on click location  from autocomplete
   */
  selectLocation = (location: Location) => {
    this.fiveDaysService.LocationKey = location.Key;
    this.fiveDaysService.currentCityName = location.LocalizedName;
    this.fiveDaysService.getFiveDayForecastsFromServer();
    this.fiveDaysService.getCurrentConditionsFromServer();
    this.checkIsFavorite();
  };

  checkIsFavorite = () => {
    let res = this.fiveDaysService.checkIfCurrentLocationIsFavorite();
    res == undefined
      ? (this.isFavoriteLocation = false)
      : (this.isFavoriteLocation = true);
  };

  saveToFavorites = () => {
    this.favoritesService.addLocationToLocalStorageFavorites(
      this.fiveDaysService.LocationKey,
      this.fiveDaysService.currentCityName
    );
    this.isFavoriteLocation = true;
  };

  removeFromeFavorites = () => {
    this.favoritesService.removeLocationFromLocalStorageFavorites(
      this.fiveDaysService.LocationKey
    );
    this.isFavoriteLocation = false;
  };
}
