import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.css']
})
export class StepperFormComponent implements OnInit {

  items: MenuItem[];
  formData: any;
  StoredData: any = [];
  activeIndex: any = 0;
  form: boolean = false;
  array: any = [];
  isFromVisible = false;
  map = new Map<string, string>();
  data: any;

  @Input() stepperJSON: any;
  @Output() stepperEmitData = new EventEmitter<any>();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.items = this.stepperJSON.stepCount;
    this.formData = this.stepperJSON.Form[this.activeIndex];
    for (let i = 0; i < this.stepperJSON.Form.length; i++) {
      this.StoredData[i] = [];
    }
  }
  step(e: any) {
    this.activeIndex = e;
    this.form = true;
    this.formData = this.stepperJSON.Form[this.activeIndex];
  }
  stapperValue(event: any) {
    this.data = event;
  }
  buttonClick(e: any) {
    if (e == 'next') {
      this.StoredData[this.activeIndex] = this.data;
      this.activeIndex += 1
    } else if (e == 'cancel') {
      this.StoredData[this.activeIndex] = this.data;
      console.log(this.StoredData)
      this.activeIndex -= 1
    } else if (e == 'submit') {
      this.show();
      this.stepperEmitData.emit(this.StoredData)
    }
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

}
