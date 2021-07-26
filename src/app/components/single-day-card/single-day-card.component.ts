import { Component } from '@angular/core';
import { CurrentFiveDayService } from 'src/app/services/current-five-day.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-single-day-card',
  templateUrl: './single-day-card.component.html',
  styleUrls: ['./single-day-card.component.css'],
})
export class SingleDayCardComponent {
  constructor(
    public fiveDaysService: CurrentFiveDayService,
    public styleService: ThemeService
  ) {}
}
