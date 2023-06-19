import { Component, OnInit } from '@angular/core';
import  homePageList  from '../../features/registration-form/breadcrumb.json'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  homelist: any = homePageList;

  constructor() { }

  ngOnInit(): void {
  }

}
