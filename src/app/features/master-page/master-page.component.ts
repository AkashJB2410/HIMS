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
  clickedData:any;
  count: any;
  id: any;

  constructor(
    private messageService: MessageService,
    private http: MasterPageService
  ) {}

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.GetAllNotifications();
    this.getCount();
  }

  GetAllNotifications() {
    this.http.GetAllNotifications().subscribe((res) => {
      this.data = res;
      let i=0;
      for (let a of this.data) {

        let obj={
          "id":a.notificationId,
          "title": a.title,
          "msg":a.message
        };
        this.masterJSON.masterData.header.notification.data[i]=obj;
        
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
    });
  }

  notification(e: any) {
    this.http.readMsg(e.id).subscribe((res)=>{
      this.clickedData=res;
    })
  }
}
