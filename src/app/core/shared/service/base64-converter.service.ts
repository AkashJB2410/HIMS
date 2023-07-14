import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Base64ConverterService {

  constructor(private http: HttpClient) { }


  covertToBase64(file: File) {
    return new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    // const observable = new Observable((subscriber: Subscriber<any>) => {
    //   this.readFile(file, subscriber);
    // });
    // observable.subscribe((d) => {
    //   this.form.get(control.fieldName).setValue(d);
    //   console.log(d)
    // })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete()
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
  }
}
