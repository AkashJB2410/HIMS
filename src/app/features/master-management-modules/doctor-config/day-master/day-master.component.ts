import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import dayMasterForm from './dayForm.json';
import dayTableConfig from './dayMstTableConfig.json'
import { FeaturescommonService } from '../../../shared/featurescommon.service';
@Component({
  selector: 'app-day-master',
  templateUrl: './day-master.component.html',
  styleUrls: ['./day-master.component.css']
})
export class DayMasterComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  DayMasterForm: any = dayMasterForm;
  // LOV_breadcrumb = LOV_breadcrumb
  configurations: any;
  data: any=[];
  formdata: any;
  isdataReady = false;
  dayData: any = [];
  flag: any;
  editData: any
  startday: any
  endday:any
  apiGet = "mstDay/list";
  apiAdd = "mstDay/create";
  apiUpdate = "mstDay/update";
  apidelete = "mstDay/inActivate";
  apiactive = "mstDay/activate";
  constructor(private messageService: MessageService, private common: CommonService, private http: FeaturescommonService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = dayTableConfig;
    // this.getConfigForTable();
    this.getAllDayMaster();

  }

  getConfigForTable() {
    this.tableConfig = dayTableConfig;
  }
  onAdd(e: any) {
    this.editData = []
    this.flag = e.add;
  }
  onEdit(e: any) {
    this.flag = e.edit
    let obj = {
      "day_id": e.editRow.dayId,
      "dayName": e.editRow.dayName,
      "startDayInWeek": e.editRow.startDayInWeek,
      "endDayInWeek": e.editRow.endDayInWeek,
      "is_Active":e.editRow.is_Active
    }
    this.editData = obj;
  }
  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }
  editRow(e: any) {
    this.visibleSidebar = true;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  BulkDeleteRows(e: any) {
    if (e != '') {
      e.forEach((data: any) => {

        if (data.isActive != false) {
          let obj = {
            "dayId": data.dayId,
          }
          this.deleteDayMaster(obj.dayId);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'selected Rows',
            detail: ' Deleted.',
          });
        }
      });
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Delete All Data successfull.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'select Rows',
        detail: 'Rows are not selected.',
      });
    }
  }

  closeSidebarData(e: any) {
    this.editData = undefined;
  }
  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == "edit") {
        this.updateDayMaster(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitDayMaster(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data save successfull.',
        });
      }
    }
  }

  confirmAction(e: any) {
    if (e != false) {
      this.deleteDayMaster(e.dayId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
  }

  getAllDayMaster() {
    this.http.getData(this.apiGet).subscribe(res => {
      this.isdataReady = true;
      res.content.forEach((e: any)=> {
        if (e.startDayInWeek == true) {
          this.startday = "Yes"
        } else {
          this.startday = "NO"
        }
        if (e.endDayInWeek == true) {
          this.endday = "Yes"
        } else {
          this.endday = "NO"
        }
        let obj = {
          "dayId": e.dayId,
          "dayName": e.dayName,
          "startDayInWeek": this.startday,
          "endDayInWeek": this.endday,
          "is_Active":e.isActive
        }
        this.data.push(obj);
      })
      console.log("data ==>>",this.data)
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].id = i + 1;
      }
    })
  }

  updateDayMaster(e: any) {
    const obj={
      "dayId": e.dayId,
        "dayName": e.dayName,
        "startDayInWeek": this.startday,
        "endDayInWeek": this.endday,
        "is_Active":e.isActive
    }
    this.http.updateData(obj, this.apiUpdate).subscribe((data) => {
     
      this.getAllDayMaster();
    });
  }

  deleteDayMaster(dayId: any) {
    this.http.deleteData( this.apidelete ,dayId).subscribe((data) => {
    });
    this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Day Master Enable Successfully' });  
    this.getAllDayMaster();
  }

  submitDayMaster(dayId: any) {
    this.http.addData(dayId, this.apiAdd).subscribe((data) => {
      this.data = [];
      this.getAllDayMaster();
    });
  }

  isActive(e: any) {
    if(e.is_Active==false){
      const obj={
        "dayId": e.dayId,
          "dayName": e.dayName,
          "startDayInWeek": this.startday,
          "endDayInWeek": this.endday,
          "is_Active":e.isActive
      }
      this.http.reactiveData(this.apiactive, obj, e.dayId)
        .subscribe(b_Data => {
          
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Day Master Enable Successfully' });  
        this.getAllDayMaster();
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Day is already Active' });
    }
  }


}
