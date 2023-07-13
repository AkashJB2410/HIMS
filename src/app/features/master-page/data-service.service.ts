import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  private outputDataSubject = new Subject<string>();

  outputData$ = this.outputDataSubject.asObservable();

  emitOutputData(data: string) {
    this.outputDataSubject.next(data);
  }
}
