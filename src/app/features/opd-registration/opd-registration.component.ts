import { Component, OnInit } from '@angular/core';
import opdRgistrationForm from './opdRegistrationForm.json';
import rgistrationForm from './registrationForm.json';
import configService from './service_table_config.json';
import configMobile from './mobileSerch_table_config.json';
import { OpdRegistrationService } from './opd-registration.service';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FormService } from 'src/app/core/shared/service/form.service';
import filterdata from './filter.json';
import rgistBUttonData from './RegistButton.json';
import * as table_config from './additionalServices_table_config.json';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-opd-registration',
  templateUrl: './opd-registration.component.html',
  styleUrls: ['./opd-registration.component.css']
})
export class OpdRegistrationComponent implements OnInit {
  formJSON: any = opdRgistrationForm;
  configurations: any;
  serviceConfig: any;
  mobileConfig: any;
  configServ: any;
  configMobi: any;
  opdData: any[];
  data: any[];
  addData: any[] = [];
  sidebarJSON: any = rgistrationForm;
  formData: any = rgistrationForm;
  mobileGridData: any;
  accordionData = {
    "id": 0,
    "label": "Additional Services"
  };
  filterData: any;
  config: any;
  varPage: any = 0;
  varSize: any = 10;
  varSort: any = "ASC";
  VarQString: any = "";
  editData: any;
  sidebarButtonJSON: any = rgistBUttonData;
  serviceObj: any;
  varPatientId: any;
  serviceArr: any[] = [];

  constructor(private http: OpdRegistrationService, private comService: CommonService, private form$: FormService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.serviceConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    };
    this.mobileConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    }
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    };
    this.filterData = filterdata;
    this.getConfigForTable();
    this.getOPDService();
    this.additionalServices(this.varPage, this.varSize, this.varSort, this.VarQString);
  }
  getConfigForTable() {
    this.configServ = configService;
    this.configMobi = configMobile;
    this.config = table_config;
  }
  changeEvent(e: any) {
    if (e[1].fieldName == "mobileNo" && e[0] != "") {
      this.mobileGridData = undefined;
      this.http.mobileSerchData(e[0]).subscribe((data: any) => {
        this.mobileGridData = data[1].result;
        this.form$.showModal(true,"");
      });
    }
  }
  buttonEvent(e: any) {
    if (e === "save") {
      this.comService.sendEditData(true);
    }
  }
  getOPDService() {
    this.http.getOPDService().subscribe((res) => {
      // this.opdData = [];
      this.opdData = res[1].result;
    });
  }

  mobileRowClickData(e: any) {
    this.varPatientId = e.patientId;
    this.form$.reRenderForm(this.formJSON.form.formControls[8], e.patientTitleId, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[9], e.patientFirstname, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[10], e.patientMiddlename, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[11], e.patientLastname, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[12], e.patientGenderId, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[13], e.patientDob, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[14], e.patientAge, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[15], e.patientMobileNumber, 'autofill');
    this.form$.showModal(false,"");
  }
  accordionEmitData(e: any) { }
  fiteredData(e: any) {
    this.data = undefined;
    this.VarQString = e.searchServicesInput;
    this.additionalServices(this.varPage, this.varSize, this.varSort, this.VarQString);
  }
  rowClickDataComService(e: any) {
    console.log("rowClickDataComService ==>", e)
    this.serviceObj = {
      "vsType": "1",
      "vsUnitId": "2",
      "serviceCancelReason": "clode",
      "serviceBaseRate": e.serviceBaseRate,
      "vsCancelRate": "50",
      "vsGrossRate": "150",
      "vsQtyRate": "75",
      "vsQuantity": "1",
      "vsStatus": "1",
      "vsDeliveredBy": "Nayan",
      "createdBy": "Nayan",
      "vsStaffId": "1",
      "grossAmount": "300",
      "vsServiceId": {
        "serviceId": e.serviceId
      },
      "vsPatientId": this.varPatientId
    }
    this.serviceArr.push(this.serviceObj)
  }
  rowClickData(e: any) {
    console.log("data row click data ==>", e)
    this.serviceObj = {
      "vsType": "1",
      "vsUnitId": "2",
      "serviceBaseRate": e.serviceBaseRate,
      "vsQuantity": "1",
      "vsStatus": "1",
      "vsDeliveredBy": "Nayan",
      "createdBy": "Sagar",
      "vsStaffId": "1",
      "grossAmount": e.serviceBaseRate,
      "vsServiceId": {
        "serviceId": e.serviceId
      },
      "vsPatientId": this.varPatientId
    }
    this.serviceArr.push(this.serviceObj)
    console.log("addition service =>", this.serviceArr)
  }
  additionalServices(page: any, size: any, sort: any, qString: any) {
    this.http.getAdditionalServices(page, size, sort, qString).subscribe((res) => {
      res[1].result.forEach((e: any, index: any) => {
        let obj = {
          "id": index,
          "serviceId": e.serviceId,
          "serviceName": e.serviceName,
          "createdBy": e.createdBy,
          "serviceBaseRate": e.serviceBaseRate,
          "serviceAbbreviations": e.serviceAbbreviations,
          "serviceCode": e.serviceCode,
        }
        this.addData.push(obj)
      })
      this.data = [...this.addData];
      console.log("data additionalServices==>", this.data)
    })
  }
  changeSelectItem(e: any) { }
  saveRegistartionForm(e: any) { }
  sidebarData(e: any) { }
  buttonEventSubmit(e: any) {
    this.http.saveTrnVisitServices(this.serviceArr).subscribe((res) => {
      this.form$.reRenderForm(this.formJSON.form.formControls[0], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[8], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[9], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[10], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[11], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[12], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[13], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[14], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[15], "", 'autofill');
      this.opdData=undefined;
      this.getOPDService();
      this.VarQString="";
      this.serviceArr=[];
      this.data=undefined;
      this.additionalServices(this.varPage, this.varSize, this.varSort, this.VarQString);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your registration has been successfully completed!' });
    })
    
  }

}
