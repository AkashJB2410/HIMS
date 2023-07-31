import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }
  renderNewForm = new EventEmitter<any>();
  openModal = new Subject<any>;

  reRenderForm(formData: any, value: any, funtonality: any) {
    this.renderNewForm.emit({ formData, value, funtonality });
  }

  showModal(value: any, titleName: any) {
    this.openModal.next({value,titleName });
  }
}
