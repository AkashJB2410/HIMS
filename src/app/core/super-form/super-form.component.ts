import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-super-form',
  templateUrl: './super-form.component.html',
  styleUrls: ['./super-form.component.css']
})
export class SuperFormComponent implements OnInit {

  superFormArray: any = [];
  @Input() superFormData: any;
  @Output() superFormOutput = new EventEmitter<any>;
  tabIndex: any;

  config: any;
  index: any = 0
  activeIndex: any = 0;
  StoredData: any = [];


  constructor() { }

  btn(e: any) {}

  ngOnInit(): void {
    for (let index = 0; index < this.superFormData.Forms.length; index++) {
      this.superFormArray[index] = []
    }
  }

  stepperData(event: any, index: any) {
    this.superFormArray[index] = event;
  }

  tabularData(event: any, index: any) {
    this.tabIndex = index;
    this.superFormArray[index] = event;
  }

  formData(event: any, index: any) {
    this.superFormArray[index] = event;
  }

  saveAndProceed(){
    this.superFormOutput.emit(this.superFormArray);
  }
}
