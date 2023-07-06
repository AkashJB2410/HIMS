import { Component, OnInit } from '@angular/core';
import masterData from './master.json';
import { MessageService } from 'primeng/api';
import { MasterPageService } from './master-page.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
})
export class MasterPageComponent implements OnInit {
  masterJSON: any = masterData;
  configurations: any;
  data: any;
  isdataReady: any;
  clickedData: any;
  count: any;
  id: any;
  sidenavData: any[] = [];
  constructor(
    private messageService: MessageService,
    private http: MasterPageService
  ) { }

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getALLSideNavData()
    this.GetAllNotifications();
    this.getCount();
  }

  getALLSideNavData() {
    this.masterJSON.masterData.sidenavItems = [];
    this.http.GetAllSideNavData().subscribe((res) => {
      console.log("sidenavdata => ", res.sidenavItems.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence)));
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
      console.log("sidenavdata => ", this.masterJSON.masterData.sidenavItems)
    });
  }

  GetAllNotifications() {
    this.http.GetAllNotifications().subscribe((res) => {
      this.data = res;
      let i = 0;
      for (let a of this.data) {

        let obj = {
          "id": a.notificationId,
          "title": a.title,
          "msg": a.message,
          "readFlag": a._Read
        };
        this.masterJSON.masterData.header.notification.data[i] = obj;

        i++;
      }
      console.log('get all data', res);
      this.isdataReady = true;
    });
  }

  getCount() {
    this.http.countNotification().subscribe((res) => {
      this.count = res.Count;
      console.log(this.count);
      this.masterJSON.masterData.header.notification.count = this.count;
    });
  }

  notificationRead(e: any) {
    console.log(e);
    if (e == "readAll") {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i]._Read == false) {
          this.http.readMsg(this.data[i].notificationId).subscribe((res) => {
            this.clickedData = res;
            this.getCount();
            this.GetAllNotifications()
          })
        }
      }
    } else {
      this.http.readMsg(e.id).subscribe((res) => {
        this.clickedData = res;
        this.getCount();
        this.GetAllNotifications()
      })
    }


  }
}
