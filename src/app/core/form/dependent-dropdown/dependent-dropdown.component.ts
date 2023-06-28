import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dependent-dropdown',
  templateUrl: './dependent-dropdown.component.html',
  styleUrls: ['./dependent-dropdown.component.css']
})
export class DependentDropdownComponent implements OnInit {
  dropdown1: any = [];
  dropdown2: any = [];
  drop2: any;
  outputData: Array<any> = [];
  constructor() { }

  @Input() data: any;
  @Input() defaultData: any;
  @Output() dependentDrop = new EventEmitter<any>();

  ngOnInit(): void {
    for (let i = 0; i < this.data.length; i++) {
      this.outputData[i] = [];
    }
    this.data.forEach((element: any) => {
      this.outputData[element];
    });
    this.dropdown1 = this.data[0].values;
    this.dropdown2 = this.data[1].values;
  }

  renderSecondDrop(e: any) {
    this.outputData[0] = e.value;
    this.drop2 = this.dropdown2.filter((ele: any) => {
      if (ele.Mcode == e.value || ele.Mcode == "") {
        return ele;
      }
    });
    this.dependentDrop.emit(this.outputData);
  }

  secondDropValue(e: any) {
    this.outputData[1] = e.value;
    this.dependentDrop.emit(this.outputData);
  }
}
