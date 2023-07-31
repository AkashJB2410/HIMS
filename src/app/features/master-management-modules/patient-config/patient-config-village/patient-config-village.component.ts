import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from '../../../shared/featurescommon.service';
import breadcrumb from './villageBreadcrumb.json';
import form1 from './patientConfigVillageForm.json';
import table from './patientConfigVillageTable.json';
@Component({
  selector: 'app-patient-config-village',
  templateUrl: './patient-config-village.component.html',
  styleUrls: ['./patient-config-village.component.css']
})
export class PatientConfigVillageComponent implements OnInit {

  data: any;
  breadcrumb = breadcrumb;
  apiGet = 'mstVillage/list';
  apiAdd = 'mstVillage/create';
  apiUpdate = 'mstVillage/update';
  apidelete = 'mstVillage/inActivate';
  apiactive = 'mstVillage/activate';
  configurations: {
    isFilter: boolean;
    isTable: boolean;
    isSideBar: boolean;
    isConfirmation: boolean;
  };
  flag: string;
  form: any;
  editData: any;
  visibleSidebar: boolean;
  saveMethod: boolean = false;
  table:any=table;
  constructor(
    private messageService: MessageService,
    private http: FeaturescommonService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getAllVillageData();
    this.form=form1;
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == 'edit') {
        this.updateVillageData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitVillageData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data saved successfull.',
        });
      }
    }
  }

  save(e: any) {
    this.saveMethod = true;
    this.editData = [];
    this.common.sendEditData(false);
  }

  edit(e: any) {
    this.editData = e.editRow;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }

  sideBarEvent(e:any){
    this.editData=undefined;
  }

  confirmAction(e: any) {
    if (e.is_Active == true) {
      this.data = undefined;
      this.deleteVillageData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'Disabled',
        detail: 'The selected rows is disabled successfully',
      });
    } else if (e.isActive == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The selected rows is already Disabled',
      });
    } else {
    }
  }

  getAllVillageData() {
    this.http.getData(this.apiGet).subscribe((res) => {
      this.data = res.content;
      for(let i=0; i<this.data.length;i++){
        this.data[i].id=i+1;
        this.data[i].stateName=this.data[i].villageCityId.cityStateId.stateName
        this.data[i].districtName=this.data[i].villageCityId.cityDistrictId.districtName
        this.data[i].cityName=this.data[i].villageCityId.cityName
        this.data[i].is_Active=this.data[i].isActive

      }
      this.data;
    });
  }

  updateVillageData(villageData: any) {
    this.http.updateData(villageData, this.apiUpdate).subscribe((data) => {
      this.data = undefined;
      this.getAllVillageData();
      console.log('data' + data);
    });
  }

  deleteVillageData(villageData: any) {
    this.http.deleteData(this.apidelete, villageData.villageId).subscribe((data) => {
      this.data = undefined;
      this.getAllVillageData();
      console.log('data' + data);
    });
  }
  

  submitVillageData(villageData: any) {
    this.http.addData(villageData, this.apiAdd).subscribe((data) => {
      this.data = undefined;
      this.getAllVillageData();
      console.log('data' + data);
    });
  }

  isActive(data: any) {
    if (!data.isActive) {
      this.http
        .reactiveData(this.apiactive, data, data.villageId)
        .subscribe((b_Data) => {
          this.data = undefined;
          this.getAllVillageData();
        });
      this.messageService.add({
        severity: 'success',
        summary: 'Enable',
        detail: 'The selected rows is enable successfully',
      });
    } else if (data.isActive) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The selected rows is already active',
      });
    }
  }

  bulkDeleteRows(bulk_Data: any) {
    let count = 0;
    if (bulk_Data != '') {
      bulk_Data.forEach((villageData: any) => {
        if (villageData.isActive == true) {
          this.deleteVillageData(villageData);
          count++;
        }
      });
      if (count == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The selected rows are already disabled',
        });
        this.data = undefined;
        this.getAllVillageData();
      } else if (count != 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Bulk Deleted',
          detail: 'The selected rows disabled successfully',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No Row Selected',
      });
    }
  }

}
