import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  GlobalUrl: string = 'http://dataservice.accuweather.com/';
  apikey: string = 'bGPfosAT5CYXB8tq9wBnQRQiiuPuJu21';
  constructor(private httpClient: HttpClient) {}

  /**
   * This function is for all get request in system
   * Receives only the continuation of the url
   */
  getApiRequest(url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.httpClient.get(this.GlobalUrl + url).subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log('oops', error, error.error);
          }
        );
      } catch (err) {
        console.log('ERRORRR : ', err);
      }
    });
  }
}
