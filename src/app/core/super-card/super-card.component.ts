import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-super-card',
  templateUrl: './super-card.component.html',
  styleUrls: ['./super-card.component.css']
})
export class SuperCardComponent implements OnInit {
  config: any;
  @Input() data: any;
  @Input() sidebarJSON: any;
  @Input() configurations: any;
  @Input() tableConfig: any;
  @Input() tableData: any;
  @Input() filterJSON: any;
  @Output() sideBarEvent = new EventEmitter;
  sideBarJson: any;

  visibleSidebar: boolean = false;
  constructor() { }

  ngOnInit(): void {
  
  }

  sidebarData(e: any) {
    this.visibleSidebar = e;
    this.sideBarEvent.emit(e);
  }

}
