import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: any) {
    date = new Date(date);
    var format = JSON.parse(localStorage.getItem('personalization'));
    return new DatePipe('en-US').transform(date, format.dateFormat);
  }
}


