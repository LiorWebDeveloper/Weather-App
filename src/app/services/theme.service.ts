import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  IsDarkTheme: boolean = false;
  classTheme: string = 'lightTheme';
  bodyTheme: string = '';
  btnDark: string = '';
  isMetric: boolean = false;
  temperatureSign: any = 8457;
  unitName: string = 'Imperial';
  constructor() {}

  /*
   * For a dark mode
   */
  changeTheme = () => {
    if (this.IsDarkTheme == false) {
      this.IsDarkTheme = true;
      this.classTheme = 'darkTheme';
      this.bodyTheme = 'wrapperDarkTheme';
      this.btnDark = 'btn-dark text-secondary';
    } else {
      this.IsDarkTheme = false;
      this.classTheme = 'lightTheme';
      this.bodyTheme = '';
      this.btnDark = '';
    }
  };
}
