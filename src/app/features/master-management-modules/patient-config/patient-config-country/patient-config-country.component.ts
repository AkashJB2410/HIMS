import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from '../../../shared/featurescommon.service';
import breadcrumb from './countryBreadcrumb.json';
import form1 from './patientConfigCountryForm.json';
import table from './patientConfigCountryTable.json';

@Component({
  selector: 'app-patient-config-country',
  templateUrl: './patient-config-country.component.html',
  styleUrls: ['./patient-config-country.component.css'],
})
export class PatientConfigCountryComponent implements OnInit {
  data: any;
  breadcrumb = breadcrumb;
  apiGet = 'mstCountry/list';
  apiAdd = 'mstCountry/create';
  apiUpdate = 'mstCountry/update';
  apidelete = 'mstCountry/inActivate';
  apiactive = 'mstCountry/activate';
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
    this.getAllCountryData();
    this.form=form1;
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == 'edit') {
        this.updateCountryData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitCountryData(e);
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

  sideBarEvent(e:any){
    this.editData=undefined;
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
      this.deleteCountryData(e);
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

  getAllCountryData() {
    this.http.getData(this.apiGet).subscribe((res) => {
      this.data = res.content;
      for(let i=0; i<this.data.length;i++){
        this.data[i].id=i+1;
        this.data[i].is_Active=this.data[i].isActive;
      }
      this.data;
    });
  }

  updateCountryData(countryData: any) {
    this.http.updateData(countryData, this.apiUpdate).subscribe((data) => {
      this.data = undefined;
      this.getAllCountryData();
      console.log('data' + data);
    });
  }

  deleteCountryData(countryData: any) {
    this.http.deleteData(this.apidelete, countryData.countryId).subscribe((data) => {
      this.data = undefined;
      this.getAllCountryData();
      console.log('data' + data);
    });
  }
  

  submitCountryData(countryData: any) {
    this.http.addData(countryData, this.apiAdd).subscribe((data) => {
      this.data = undefined;
      this.getAllCountryData();
      console.log('data' + data);
    });
  }

  isActive(data: any) {
    if (!data.isActive) {
      this.http
        .reactiveData(this.apiactive, data, data.countryId)
        .subscribe((b_Data) => {
          this.data = undefined;
          this.getAllCountryData();
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
      bulk_Data.forEach((countryData: any) => {
        if (countryData.isActive == true) {
          this.deleteCountryData(countryData);
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
        this.getAllCountryData();
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
