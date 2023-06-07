import { Component, OnInit } from '@angular/core';
import tabularData from './all-masters.json'

@Component({
  selector: 'app-all-masters',
  templateUrl: './all-masters.component.html',
  styleUrls: ['./all-masters.component.css']
})
export class AllMastersComponent implements OnInit {

  tabularSideData=tabularData;
  constructor() { }

  ngOnInit(): void {
  }

}
