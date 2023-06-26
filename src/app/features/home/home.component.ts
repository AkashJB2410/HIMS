import { Component, OnInit } from '@angular/core';
import homePageData from './Home_page.json'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageData=homePageData
  constructor() { }

  ngOnInit(): void {
  }

}
