import { CityForLocalStorage } from '../modules/cityObjForLocalStorag';

class Metric {
  Value: number = 0;
  Unit: string = '';
  UnitType: number = 0;
}
class Imperial {
  Value: number = 0;
  Unit: string = '';
  UnitType: number = 0;
}
class Temperature {
  Metric = new Metric();
  Imperial = new Imperial();
}

export class CurrentConditions {
  LocalObservationDateTime: string = '';
  EpochTime: number = 0;
  WeatherText: string = '';
  WeatherIcon: number = 0;
  HasPrecipitation: boolean = false;
  PrecipitationType: any = null;
  IsDayTime: boolean = false;
  Temperature = new Temperature();
  MobileLink: string = '';
  Link: string = '';
  CityDetails = new CityForLocalStorage();
}
