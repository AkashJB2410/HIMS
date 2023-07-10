import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import personalization from "./personalization.json";
import { ThemeService } from '../shared/service/theme.service';

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
  personalization: any;
  @Input() masterJSON: any;
  @Output() notification = new EventEmitter<any>();
  @Output() sidenavItem = new EventEmitter<any>(); 
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    localStorage.setItem('personalization', JSON.stringify(personalization));
    this.personalization = personalization; 
    this.changeTheme();
    this.list = this.masterJSON.masterData;
  }

  clickEvent(e: any) {
    this.toggle = e;
  }

  toggleNavbar(event: boolean) {
    this.navbarOpen = event;
  }

  changeTheme() {
    this.themeService.switchTheme(this.personalization.theme);
  }

  notificationEvent(e: any) {
    this.notification.emit(e)
  }
  sidenavItems(item:any){
    this.sidenavItem.emit(item)
  }
}
