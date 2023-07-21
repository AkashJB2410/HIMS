import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  @Input() accordionData: any;
  data: any;
  @Output() accordionrEmitData =  new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.data= this.accordionData.data;
  }

  handleChange(e: any) {
    this.accordionrEmitData.emit(e.index);
  }

}
