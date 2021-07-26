class AdministrativeArea {
  ID: string = '';
  LocalizedName: string = '';
}
class Country {
  ID: string = '';
  LocalizedName: string = '';
}

export class Location {
  AdministrativeArea = new AdministrativeArea();
  Country = new Country();
  Key: string = '';
  LocalizedName: string = '';
  Rank: number = 0;
  Type: string = '';
  Version: number = 0;
}
