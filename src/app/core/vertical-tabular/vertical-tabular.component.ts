import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vertical-tabular',
  templateUrl: './vertical-tabular.component.html',
  styleUrls: ['./vertical-tabular.component.css']
})
export class VerticalTabularComponent implements OnInit, AfterViewInit {
  activeState: any;
  activeList: any;
  constructor() { }
  ngAfterViewInit(): void {
    this.activeState = JSON.parse( localStorage.getItem('activeState'))
  }
  @Input() tabularData: any;
  @Output() renderComponents = new EventEmitter<any>();

  ngOnInit(): void {
  
  }
  render(list:any){
    this.renderComponents.emit(list);
  }
  setActive(items:any){
    this.activeState = items;
    localStorage.setItem('activeState',JSON.stringify(items));
  }
}
