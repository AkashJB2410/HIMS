import { Component, OnInit } from '@angular/core';
import homePageData from './Home_page.json'
import homebraadcrumb from './home_breadcrumb.json'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageData=homePageData
  homebraadcrumb=homebraadcrumb;
  constructor() { }

  ngOnInit(): void {
  }

}
