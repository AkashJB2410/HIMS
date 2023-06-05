import { Component, OnInit } from '@angular/core';
import masterData from './master.json'

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  masterJSON: any = masterData;
  constructor() { }

  ngOnInit(): void {
  }

}
