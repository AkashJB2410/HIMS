import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from '../../../shared/featurescommon.service';
import breadcrumb from './cityBreadcrumb.json';
import form1 from './patientConfigStateForm.json';
import table from './patientConfigCityTable.json';
@Component({
  selector: 'app-patient-config-city',
  templateUrl: './patient-config-city.component.html',
  styleUrls: ['./patient-config-city.component.css']
})
export class PatientConfigCityComponent implements OnInit {

  data: any=[];
  breadcrumb = breadcrumb;
  apiGet = 'mstCity/list';
  apiAdd = 'mstCity/create';
  apiUpdate = 'mstCity/update';
  apidelete = 'mstCity/inActivate';
  apiactive = 'mstCity/activate';
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
    this.getAllCityData();
    this.form=form1;
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == 'edit') {
        this.updateCityData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitCityData(e);
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
      this.deleteCityData(e);
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

  getAllCityData() {
    this.http.getData(this.apiGet).subscribe((res) => {
      this.data = res.content;
      for(let i=0; i<this.data.length;i++){
        this.data[i].id=i+1;
      }
      this.data;
    });
  }

  updateCityData(cityData: any) {
    this.http.updateData(cityData, this.apiUpdate).subscribe((data) => {
      this.data = undefined;
      this.getAllCityData();
      console.log('data' + data);
    });
  }

  deleteCityData(cityData: any) {
    this.http.deleteData(this.apidelete, cityData.city_id).subscribe((data) => {
      this.data = undefined;
      this.getAllCityData();
      console.log('data' + data);
    });
  }
  

  submitCityData(cityData: any) {
    this.http.addData(cityData, this.apiAdd).subscribe((data) => {
      this.data = undefined;
      this.getAllCityData();
      console.log('data' + data);
    });
  }

  isActive(data: any) {
    if (!data.isActive) {
      this.http
        .reactiveData(this.apiactive, data, data.city_id)
        .subscribe((b_Data) => {
          this.data = undefined;
          this.getAllCityData();
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
      bulk_Data.forEach((cityData: any) => {
        if (cityData.isActive == true) {
          this.deleteCityData(cityData);
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
        this.getAllCityData();
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
