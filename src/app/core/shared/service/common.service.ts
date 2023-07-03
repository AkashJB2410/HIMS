import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }
  public editdata = new Subject<any>();

  sendEditData(data: any){
    this.editdata.next(data);
  }

  getEditData(){
    return this.editdata.asObservable();
  }

}
