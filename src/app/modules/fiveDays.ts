class Headline {
  EffectiveDate: string = '';
  EffectiveEpochDate: number = 0;
  Severity: number = 0;
  Text: string = '';
  Category: string = '';
  EndDate: string = '';
  EndEpochDate: number = 0;
  MobileLink: string = '';
  Link: string = '';
}

class MinAndMax {
  Value: number = 0;
  Unit: string = '';
  UnitType: number = 0;
}

class minAndMaxTemperature {
  Minimum = new MinAndMax();
  Maximum = new MinAndMax();
}

class DayInfo {
  Icon: number = 0;
  IconPhrase: string = '';
  HasPrecipitation: boolean = false;
  PrecipitationType: string = '';
  PrecipitationIntensity: string = '';
}

class NightInfo {
  Icon: number = 0;
  IconPhrase: string = '';
  HasPrecipitation: boolean = false;
}
class Sources {
  Sources: Array<string> = new Array();
}

class SingleDay {
  Date: string = '';
  EpochDate: number = 0;
  Temperature = new minAndMaxTemperature();
  Day = new DayInfo();
  Night = new NightInfo();
  Sources = new Sources();
  MobileLink: string = '';
  Link: string = '';
}

export class FiveDays {
  Headline = new Headline();
  DailyForecasts: Array<SingleDay> = new Array();
}
