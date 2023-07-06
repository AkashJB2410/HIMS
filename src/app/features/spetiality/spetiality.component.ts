import { Component, OnInit } from '@angular/core';
import sidebar from './SpatialitySidebarConfig.json'
import table from './SpatialityTableConfig.json'
import { MessageService } from 'primeng/api';
import Application_breadcrumb from './breadcrumb.json'
import { SpetialityService } from './spetiality.service';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-spetiality',
  templateUrl: './spetiality.component.html',
  styleUrls: ['./spetiality.component.css']
})
export class SpetialityComponent implements OnInit {

  Application_breadcrumb=Application_breadcrumb
  toast: any = {};
  showToast: any;
  Message: any;
  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = sidebar;
  st: any;
  editData:any
  status:boolean;

  constructor(
    private messageService: MessageService,
    private http: SpetialityService,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.configurations = {
      isFilter: true,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
  }

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (this.status == true) {
      console.log(e);
      this.submitSpatiality(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateSpatiality(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  getAllSpatiality() {
    this.http.getAllSpetiality().subscribe(res => {
      this.data = res;
      console.log("get all data",res)
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].id = i + 1;
      }
      this.data;
    });
  }

  submitSpatiality(roleData: any) {
    this.http.addSpetiality(roleData).subscribe((data) => {
      this.data = undefined;
      this.getAllSpatiality();
      console.log('data' + data);
    });
  }

  updateSpatiality(idInput: any) {
    this.http.updateSpetiality(idInput).subscribe((data) => {
      this.data = undefined;
      this.getAllSpatiality();
      console.log('data' + data);
    });
  }

}
