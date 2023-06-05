import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  sideNavStatus: boolean = false;
  header: any;
  navbarOpen: boolean = false;
  list: any;
  status: boolean = false;
  statusLink: boolean = false;
  toggle: any;

  @Input() masterJSON: any;

  constructor() { }

  ngOnInit(): void {
    this.list = this.masterJSON.masterData;
  }

  clickEvent(e: any) {
    this.toggle = e;
  }

  toggleNavbar(event: boolean) {
    this.navbarOpen = event;
  }
  
}
