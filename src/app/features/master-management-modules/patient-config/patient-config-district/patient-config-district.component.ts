import { Component, OnInit } from '@angular/core';
import breadcrumb from './districtBreadcrumb.json';
import form1 from './patientConfigDistrictForm.json';
import table from './patientConfigDistrictTable.json';
import { MessageService } from 'primeng/api';
import { FeaturescommonService } from '../../../shared/featurescommon.service';
import { CommonService } from 'src/app/core/shared/service/common.service';
@Component({
  selector: 'app-patient-config-district',
  templateUrl: './patient-config-district.component.html',
  styleUrls: ['./patient-config-district.component.css']
})
export class PatientConfigDistrictComponent implements OnInit {

  data: any;
  breadcrumb = breadcrumb;
  apiGet = 'mstDistrict/list';
  apiGetCountry='mstCountry/list';
  apiGetState='mstState/list';
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
  Country: any;
  State: any;
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
    this.getAllCountryData();
    this.getAllStateData();
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
    let obj={
      "districtId":e.editRow.districtId,
      "countryId":e.editRow.districtStateId.stateCountryId.countryId,
      "stateId":e.editRow.districtStateId.stateId,
      "districtName":e.editRow.districtName,
      "districtLgdCod":e.editRow.districtLgdCode
    }
    this.editData = obj;
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
        this.data[i].district_State_Id=this.data[i].districtStateId.stateName;
        this.data[i].countryName=this.data[i].districtStateId.stateCountryId.countryName;
        this.data[i].is_Active=this.data[i].isActive;
      }
      this.data;
    });
  }

  getAllCountryData() {
    this.http.getData(this.apiGetCountry).subscribe((res) => {
      this.Country = res.content;      
      for(let j=0;j<this.Country.length;j++){
        let obj={
          "name": this.Country[j].countryName,
          "code": this.Country[j].countryId
        }
        this.form.form.formControls[1].values[0].values.push(obj);
      }
      this.Country;
      this.form.form.formControls[1].values[0].values;
    });
  }

  getAllStateData() {
    this.http.getData(this.apiGetState).subscribe((res) => {
      this.State = res.content;      
      for(let j=0;j<this.State.length;j++){
        let obj={
          "name": this.State[j].stateName,
          "code": this.State[j].stateId,
          "Mcode": this.State[j].stateCountryId.countryId
        }
        this.form.form.formControls[1].values[1].values.push(obj);
      }
      this.State;
      this.form.form.formControls[1].values[1].values;
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
    this.http.deleteData(this.apidelete, districtData.districtId).subscribe((data) => {
      this.data = undefined;
      this.getAllDistrictData();
      console.log('data' + data);
    });
  }
  

  submitDistrictData(districtData: any) {    

      let obj={
        "districtStateId":{
          "stateId":districtData.state[1].code,
          "stateCountryId":{
            "countryId":districtData.state[0].code,
          }
        },        
        "districtName":districtData.district_name,
        "districtLgdCode":districtData.districtLgdCode
      }
      this.http.addData(obj, this.apiAdd).subscribe((data) => {
        this.data = undefined;

      this.getAllDistrictData();
      console.log('data' + data);
    });
  }

  isActive(data: any) {
    if (!data.isActive) {
      this.http
        .reactiveData(this.apiactive, data, data.districtId)
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
