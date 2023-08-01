import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';
import cabinForm from './cabinForm.json'
import cabinTableConfig from './cabinTableConfig.json'
@Component({
  selector: 'app-doctor-cabin',
  templateUrl: './doctor-cabin.component.html',
  styleUrls: ['./doctor-cabin.component.css']
})
export class DoctorCabinComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  cabinForm: any = cabinForm;
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
  apiGet = "mstCabin/list";
  apiAdd = "mstCabin/create";
  apiUpdate = "mstCabin/update";
  apidelete = "mstCabin/inActivate";
  apiactive = "mstCabin/activate";
  constructor(private messageService: MessageService, private common: CommonService, private http: FeaturescommonService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = cabinTableConfig;
    // this.getConfigForTable();
    this.getAllCabinData();

  }

  getConfigForTable() {
    // this.tableConfig = dayTableConfig;
  }
  onAdd(e: any) {
    this.editData = []
    this.flag = e.add;
  }
  onEdit(e: any) {
    this.flag = e.edit
    let obj = {
      "cabinId": e.editRow.cabinId,
      "cabinNumber": e.editRow.cabinNumber,
      "mstCabinUnitId": e.editRow.mstCabinUnitId,
      "is_Active":e.editRow.isActive
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
            "cabinId": data.cabinId,
          }
          this.deleteCabinData(obj.cabinId);
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
        this.updateCabinData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitCabinData(e);
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
      this.deleteCabinData(e.cabinId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
  }

  getAllCabinData() {
    this.http.getData(this.apiGet).subscribe(res => {
      this.isdataReady = true;
      res.content.forEach((e: any)=> {
        let obj = {
          "cabinId": e.cabinId,
          "cabinNumber": e.cabinNumber,
          // "unitId": e.selectUnit.code,
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

  updateCabinData(cabinId: any) {
    this.data=undefined;
    this.data=[]
    this.http.updateData(cabinId, this.apiUpdate).subscribe((data) => {
     
      data.result.forEach((e: any)=> {
        let obj = {
          "cabinId": e.cabinId,
          "cabinNumber": e.cabinNumber,
          "mstCabinUnitId": e.mstCabinUnitId.unitId,
          "is_Active":e.isActive
        }
        this.data.push(obj);
      })
    
    });
  }

  deleteCabinData(cabinId: any) {
    this.data = undefined;
    this.http.deleteData( this.apidelete ,cabinId).subscribe((data) => {
      
      data.result.forEach((e: any)=> {
        let obj = {
          "cabinId": e.cabinId,
          "cabinNumber": e.cabinNumber,
          "mstCabinUnitId": e.mstCabinUnitId.unitId,
          "is_Active":e.isActive
        }
        this.data.push(obj);
      })
      // this.getAllCabinData();
    });
  }

  submitCabinData(cabinId: any) {
    this.http.addData(cabinId, this.apiAdd).subscribe((data) => {
      this.data = [];
      this.getAllCabinData();
    });
  }

  isActive(e: any) {
    if(e.is_Active==false){
      this.http.reactiveData(this.apiactive, e, e.cabinId)
        .subscribe(data => {
          data.result.forEach((e: any)=> {
            let obj = {
              "cabinId": e.cabinId,
              "cabinNumber": e.cabinNumber,
              "mstCabinUnitId": e.mstCabinUnitId.unitId,
              "is_Active":e.isActive
            }
            this.data.push(obj);
          })
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Day Master Enable Successfully' });  
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Day is already Active' });
    }
  }


}
