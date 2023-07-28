import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { data } from '../shared/objects/data';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent implements OnInit {
  constructor() { }
  @Input() cardData: any;


  // visibleSidebar: boolean = false;
  // @Output() onAdd = new EventEmitter<string>();
  // @Output() sideBarEvent = new EventEmitter;
  // data: any;
  ngOnInit(): void {
    this.cardData=data;
    
  }
// 
  // AddNewCard(e: any) {
  //   this.visibleSidebar = e;
  //   this.sideBarEvent.emit(e);
  // }

}
