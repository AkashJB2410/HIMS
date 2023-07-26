import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllMastersService {
  constructor() { }
  selector:any;

  addMasterSelector(e:any){
    this.selector=e;
  }

  getMasterSelector(){
    return this.selector
  }
}
