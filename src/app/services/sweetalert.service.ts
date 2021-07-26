import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CurrentFiveDayService } from './current-five-day.service';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor(public fiveDaysService: CurrentFiveDayService) {}

  /*
   * This model is for Search location by Coordinates
   * it is show from on click butoon in home page
   */
  coordinatesModel = () => {
    Swal.fire({
      position: 'top',
      title: 'Enter the coordinates ( pair lat,lon)',
      input: 'text',
      inputLabel: 'Your coordinates',
      inputValue: '',
      inputPlaceholder: 'lat,lon',

      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed == false) return;
      let isLetter: boolean = RegExp(/^\p{L}/, 'u').test(result.value);
      if (isLetter == true) {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect coordinates',
          text: 'Please enter score numbers only: lat, lon!',
          footer: 'For example: 31.771959,35.217018 ',
        });
        return;
      }
      if (result.isConfirmed && result.value != '') {
        this.fiveDaysService.lat = result.value.split(',')[0];
        this.fiveDaysService.lon = result.value.split(',')[1];
        if (
          this.fiveDaysService.lat != undefined &&
          this.fiveDaysService.lon != undefined
        )
          this.fiveDaysService.getLocationByLatLon();
      }
    });
  };
}
