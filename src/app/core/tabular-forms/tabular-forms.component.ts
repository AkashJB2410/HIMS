import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabular-forms',
  templateUrl: './tabular-forms.component.html',
  styleUrls: ['./tabular-forms.component.css']
})
export class TabularFormsComponent implements OnInit {
  list1: any[];
  list2: any[];
  tabularData: any;
  @Input() tabularJSON: any;
  @Output() tabularEmitData = new EventEmitter<any>();
  items: { label: string;  routerLink: string}[];

  constructor() { }

  ngOnInit(): void {
    this.tabularData = this.tabularJSON;
  }

  handleChange(e: any) {
    this.tabularEmitData.emit(e.activeItem);
  }
}