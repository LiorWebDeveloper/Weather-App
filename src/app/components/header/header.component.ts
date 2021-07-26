import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentFiveDayService } from 'src/app/services/current-five-day.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  HomeActive: string = 'active';
  favoritesActive: string = '';
  unit: string = 'Imperial';

  constructor(
    public route: Router,
    public favoritesService: FavoritesService,
    public fiveDaysService: CurrentFiveDayService,
    public styleService: ThemeService
  ) {}

  routeToFavoritesPage = () => {
    this.route.navigate(['/favorites']);
    this.HomeActive = '';
    this.favoritesActive = 'active';
    this.favoritesService.buildFavoritesData();
  };

  routeToHomePage = () => {
    this.route.navigate(['/home']);
    this.HomeActive = 'active';
    this.favoritesActive = '';
  };

  /**
   * Here we change the Temperature units from Imperial to Metric and  Back to Imperial
   * This affects all the tampering on the site
   */
  changeUnits = () => {
    this.styleService.isMetric == false
      ? ((this.styleService.isMetric = true),
        (this.styleService.unitName = 'Imperial'))
      : ((this.styleService.isMetric = false),
        (this.styleService.unitName = 'Metric'));
    this.fiveDaysService.getFiveDayForecastsFromServer();
  };
}
