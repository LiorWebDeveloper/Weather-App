import { Injectable } from '@angular/core';
import { CurrentConditions } from '../modules/currentConditions';
import { CityForLocalStorage } from '../modules/cityObjForLocalStorag';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesLocalStorageCities: Array<CityForLocalStorage> = new Array();
  favoritesLocations: Array<CurrentConditions> = new Array();
  constructor(public Api: ApiService) {
    this.updateFavoritesLocationsFromLocalStorage();
  }

  /**
   * Here we get all the favorites location from local storage and update the favoritesLocations
   */
  updateFavoritesLocationsFromLocalStorage = () => {
    let favoritesFromLocalStorage: any =
      localStorage.getItem('favoritesLocation');
    if (favoritesFromLocalStorage != null) {
      this.favoritesLocalStorageCities = JSON.parse(favoritesFromLocalStorage);
      this.buildFavoritesData();
    }
  };

  /**
   * Here we build the favorites location data
   * The data came from server and local storage
   */
  buildFavoritesData = async () => {
    this.favoritesLocations = new Array();
    this.favoritesLocalStorageCities.map(async (city) => {
      let res = (await this.Api.getApiRequest(
        `currentconditions/v1/${city.locationKey}?apikey=${this.Api.apikey}`
      )) as Array<CurrentConditions>;
      let location: CurrentConditions = res[0];
      location.CityDetails = city;
      this.favoritesLocations.push(location);
    });
  };

  addLocationToLocalStorageFavorites = (
    locationKey: string,
    cityName: string
  ) => {
    let cityObject: CityForLocalStorage = {
      name: cityName,
      locationKey: locationKey,
    };
    this.favoritesLocalStorageCities.push(cityObject);
    localStorage.setItem(
      'favoritesLocation',
      JSON.stringify(this.favoritesLocalStorageCities)
    );
  };

  removeLocationFromLocalStorageFavorites = (locationKey: string) => {
    this.favoritesLocalStorageCities = this.favoritesLocalStorageCities.filter(
      (city) => city.locationKey !== locationKey
    );
    localStorage.setItem(
      'favoritesLocation',
      JSON.stringify(this.favoritesLocalStorageCities)
    );
  };
}
