import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }
  renderNewForm = new EventEmitter<any>();
  
  reRenderForm(formData: any, value: any, funtonality: any) {
    this.renderNewForm.emit({formData, value, funtonality});
  }

}
