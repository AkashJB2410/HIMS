import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import personalization from "./personalization.json";
import { ThemeService } from '../shared/service/theme.service';
import { MasterService } from '../shared/service/master.service';
import coreMaster from './coreMaster.json'

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
  sidenavData: any[] = [];
  masterJSON=coreMaster;
  notification:any
  data:any;
  @Output() sidenavItem = new EventEmitter<any>(); 
  constructor(private themeService: ThemeService, private masterSerivice:MasterService) { }

  ngOnInit(): void {
    this.getALLSideNavData();
    this.getAllNotifications()
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
      if (e == "readAll") {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i]._Read == false) {
            this.masterSerivice.readMsg(this.data[i].notificationId).subscribe((res) => {
              this.getAllNotifications()
            })
          }
        }
      } else {
        this.masterSerivice.readMsg(e.id).subscribe((res) => {
          this.getAllNotifications()
        })
      }
    
  }
  sidenavItems(item:any){
    this.sidenavItem.emit(item)
  }

  getALLSideNavData() {
    this.masterJSON.masterData.sidenavItems = [];
    this.masterSerivice.getAllSideNavData().subscribe((res) => {
      res.sidenavItems.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence));
      this.sidenavData = [];
      res.sidenavItems.forEach((sidenav: any) => {
        this.sidenavData.push(sidenav)
      });
      this.sidenavData.forEach(module => {
        module.group.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence));
        module.group.forEach((group: { submodules: { sequence: number; }[]; }) => {
          group.submodules.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence));
        });
      });
      this.masterJSON.masterData.sidenavItems = this.sidenavData;
    });
  }

  getAllNotifications() {
    this.masterSerivice.getAllNotifications().subscribe((res) => {
      this.data = res;
      let i = 0;
      for (let a of res) {
        let obj = {
          "id": a.notificationId,
          "title": a.title,
          "msg": a.message,
          "readFlag": a._Read
        };
        this.masterJSON.masterData.header.notification.data[i++] = obj;
      }
    });
      this.masterSerivice.countNotification().subscribe((res) => {
        this.masterJSON.masterData.header.notification.count = res.Count;
      });
  }

}
