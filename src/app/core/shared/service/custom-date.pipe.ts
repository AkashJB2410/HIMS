import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: any) {
    date = new Date(date);
    return new DatePipe('en-US').transform(date,"yyyy/MM/dd");
  }
  }


