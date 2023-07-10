import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import selfRegForm from './selfRegForm.json';
import selfRegbreadcrumb from './selfReg_breadcrumb.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { SelfRegistrationService } from './self-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.css']
})
export class SelfRegistrationComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  selfRegFormData: any = selfRegForm;
  selfRegbreadcrumb = selfRegbreadcrumb
  configurations: any;
  data: any;
  isdataReady = false;
  SelfRegData: any = [];
  flag: any;
  errorFlag: boolean = false;
  editData: any
  constructor(private messageService: MessageService, private http: SelfRegistrationService, private router:Router) { }

  ngOnInit(): void {

  }

  buttonEvent(e: any) {
    this.editData = undefined;
    if(e=="reset"){
this.router.navigateByUrl('')
    }
  }
  sidebarData(e: any) {
    if (e != 'reset') {
      const param = {     
        "patientTitleId": e.patientTitleId,
        "patientTitleName": e.selectTitle,
        "patientFirstname": e.firstName,
        "patientMiddlename": e.middleName,
        "patientLastname": e.lastName,
        "patientAge": e.age,
        "patientMobileNumber":e.mobileNo,
        "patientAddressLine1": e.address,
        "patientCityId": e.state[2],
        "patientCityName": e.patientCityName,
        "patientStateId": e.state[0],
        "patientRegistrationSource":"Self"
      };
      this.http.saveSelfRegData(param).subscribe((resData) => {
        this.data = undefined;
        if (resData.id != "") {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Data save successfull.',
          });
        }
      }, (error) => {                              //Error callback
        console.log('error caught in component : ', error.error.error)
        this.errorFlag = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "This key name is alredy exit" });
      });
    }
  }
}