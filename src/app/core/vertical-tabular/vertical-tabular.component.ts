import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vertical-tabular',
  templateUrl: './vertical-tabular.component.html',
  styleUrls: ['./vertical-tabular.component.css']
})
export class VerticalTabularComponent implements OnInit {

  constructor() { }
  @Input() tabularData: any;
  @Output() renderComponents = new EventEmitter<any>();

  ngOnInit(): void {
  }
  
  render(list:any){
    this.renderComponents.emit(list);
  }
}
