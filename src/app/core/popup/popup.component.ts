import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  msgs: any[] = [];
  FData: any;
  edit: any;
  displayModal: boolean;

  @Input() isPopup: boolean;
  @Input() formdata: any;
  @Input() editData: any;

  @Output() closeBtn = new EventEmitter<any>;
  @Output() outputData = new EventEmitter<any>;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {}
}