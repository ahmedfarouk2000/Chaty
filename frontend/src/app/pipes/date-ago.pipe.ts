import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const now = moment(); // Current moment in user's time zone
      const dateValue = moment(value); // Convert value to a moment object

      // Calculate the time difference in seconds
      const seconds = now.diff(dateValue, 'seconds');

      // Define the time intervals
      const intervals: any = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };

      // Calculate the time interval and return the formatted date using moment.js
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }
}