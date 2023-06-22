import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vertical-tabular',
  templateUrl: './vertical-tabular.component.html',
  styleUrls: ['./vertical-tabular.component.css']
})
export class VerticalTabularComponent implements OnInit, AfterViewInit {
  activeState: any;
  activeList: any;
  @Input() tabularData: any;
  @Output() renderComponents = new EventEmitter<any>();
  constructor() { }

  ngAfterViewInit(): void {
    let item  = localStorage.getItem('activeState');
    let defaultLi = document.getElementById(item);
    defaultLi.className = 'design my-1 active';
  }
  
  ngOnInit(): void {}
  
  render(list: any) {
    localStorage.setItem('activeState',list.label);
    this.tabularData.tabular.forEach((element: any) => {
      if (list.label == element.label) {
        let li = document.getElementById(list.label);
        li.className = 'design my-1 active';
      } else {
        let li = document.getElementById(element.label);
        li.className = 'design my-1';
      }
    });
    this.renderComponents.emit(list);
  }
}
