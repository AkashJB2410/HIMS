import { Component, OnInit } from '@angular/core';
import breadcrumb from './districtBreadcrumb.json';
import form1 from './patientConfigDistrictForm.json';
import table from './patientConfigDistrictTable.json';
import { MessageService } from 'primeng/api';
import { FeaturescommonService } from '../shared/featurescommon.service';
import { CommonService } from 'src/app/core/shared/service/common.service';
@Component({
  selector: 'app-patient-config-district',
  templateUrl: './patient-config-district.component.html',
  styleUrls: ['./patient-config-district.component.css']
})
export class PatientConfigDistrictComponent implements OnInit {

  data: any=[];
  breadcrumb = breadcrumb;
  apiGet = 'mstDistrict/list';
  apiAdd = 'mstDistrict/create';
  apiUpdate = 'mstDistrict/update';
  apidelete = 'mstDistrict/inActivate';
  apiactive = 'mstDistrict/activate';
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
    this.getAllDistrictData();
    this.form=form1;
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == 'edit') {
        this.updateDistrictData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitDistrictData(e);
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

  confirmAction(e: any) {
    if (e.isActive == true) {
      this.data = undefined;
      this.deleteDistrictData(e);
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

  getAllDistrictData() {
    this.http.getData(this.apiGet).subscribe((res) => {
      this.data = res.content;
      for(let i=0; i<this.data.length;i++){
        this.data[i].id=i+1;
      }
      this.data;
    });
  }

  updateDistrictData(districtData: any) {
    this.http.updateData(districtData, this.apiUpdate).subscribe((data) => {
      this.data = undefined;
      this.getAllDistrictData();
      console.log('data' + data);
    });
  }

  deleteDistrictData(districtData: any) {
    this.http.deleteData(this.apidelete, districtData.district_id).subscribe((data) => {
      this.data = undefined;
      this.getAllDistrictData();
      console.log('data' + data);
    });
  }
  

  submitDistrictData(districtData: any) {
    this.http.addData(districtData, this.apiAdd).subscribe((data) => {
      this.data = undefined;
      this.getAllDistrictData();
      console.log('data' + data);
    });
  }

  isActive(data: any) {
    if (!data.isActive) {
      this.http
        .reactiveData(this.apiactive, data, data.district_id)
        .subscribe((b_Data) => {
          this.data = undefined;
          this.getAllDistrictData();
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
      bulk_Data.forEach((districtData: any) => {
        if (districtData.isActive == true) {
          this.deleteDistrictData(districtData);
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
        this.getAllDistrictData();
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
