import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentFiveDayService } from 'src/app/services/current-five-day.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ThemeService } from 'src/app/services/theme.service';
import { CurrentConditions } from '../../modules/currentConditions';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  constructor(
    public favoritesService: FavoritesService,
    public route: Router,
    public fiveDaysService: CurrentFiveDayService,
    public styleService: ThemeService
  ) {}

  /*
   * This function is act When the user click on One of his favorite places
   */
  seeFiveDaysForecast = (city: CurrentConditions) => {
    this.route.navigate(['/home']);
    this.fiveDaysService.currentCityName = city.CityDetails.name;
    this.fiveDaysService.LocationKey = city.CityDetails.locationKey;
    this.fiveDaysService.getFiveDayForecastsFromServer();
  };
}
