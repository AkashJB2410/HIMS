import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/core/shared/service/session.service';
import data from '../personalization/personalizationform.json'
import tableHeaders from '../personalization/personalization-tableconfig.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { PersonalizationService } from 'src/app/core/shared/service/settings-page/personalization.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.css']
})
export class PersonalizationComponent implements OnInit {
  dateFormats: any = []
  Currency: any = []
  formatDate: any;
  ForCurrency: any;
  ThemePersonalization: any = [];
  personalizationData: any;
  ForThemes: any;
  form = new FormGroup({
    dateformat: new FormControl(''),
    currency: new FormControl(''),
    themes: new FormControl('')

  });
  sidebarJSON = data
  tableConfig = tableHeaders;
  data: any;
  flag: any;
  formData: Partial<{ dateformat: string; currency: string; }>;
  configurations: { isFilter: boolean; isTable: boolean; isSideBar: boolean; isConfirmation: boolean; };
  GetPersonalization: any;
  editdata: any
  constructor(private http: PersonalizationService, private commonservice: CommonService , private messageService:MessageService) { }

  ngOnInit(): void {
    this.getPersonalization();
    this.dateFormats = [
      { name: 'Select date', value: 'select-date' },
      { name: 'Short Date', value: 'M/d/yy' },
      { name: 'Medium Date', value: 'MMM d, y' },
      { name: 'Long Date', value: 'MMMM d, y' },
      { name: 'Full Date', value: 'EEEE, MMMM d, y' },

    ]
    this.Currency = [
      { name: 'Select currency', value: 'select-currency' },
      { name: 'INR', value: 'INR' },
      { name: 'CAD', value: 'CAD' },
      { name: 'USD', value: 'USD' },
      { name: 'EUR', value: 'EUR' },

    ],
      this.ThemePersonalization = [
        { name: 'Select theme', value: 'select-theme' },
        { name: 'Light theme', value: 'light-theme' },
        { name: 'Dark theme', value: 'dark-theme' },
      ]
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    // data.forEach((ele: any) => {
    //   let transformedData = {
    //     "Theme": ele.Theme,
    //     "Currency": ele.Currency,
    //     "DateFormat": ele.DateFormat, 
    //   }
    //   this.data.push(transformedData);
    // })
  }
  // onSubmit() {
  //   this.http.addPersonalization(this.form.value.dateformat, this.form.value.currency, this.form.value.themes)
  //     .subscribe(data => {
  //       this.personalizationData = data
  //     });
  // }


  onAdd(e: any) {
    this.flag = e.add;
    this.editdata = []
  }
  getConfigForTable() {
    this.tableConfig = tableHeaders;
    ;
  }
  onEdit(e: any) {
    this.flag = e.edit;
    let obj = {
      "personalizationId": e.editRow.personalizationId,
      "keyName": e.editRow.keyName,
      "keyValue": e.editRow.keyValue,
      "is_Active": e.editRow.is_Active,
      "is_Deleted": e.editRow.is_Deleted,
    }
    this.editdata = obj

  }
  sidebarData(e: any) {
  }
  confirmAction(e: any) {
    if (e != false) {
      this.deletePersonalization(e.personalizationId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
  }

  editRow(e: any) {
  }
  savePersonalization(e: any) {
    delete e.formId;
    if (this.flag == "add") {
      this.http.addPersonalization(e)
        .subscribe(res => {
          this.data = undefined;
          this.getPersonalization();
        });
    } else {
      this.http.updatePersonalization(e)
        .subscribe(res => {
          this.data = undefined;
          this.getPersonalization();
        });
    }

  }
  btnEvent(e: any) {
    this.editdata = undefined
    this.commonservice.sendEditData(false)
  }

  getPersonalization() {
    this.http.getallPersonalization().subscribe(res => {
      let records: any[] = []
      res.result.forEach((e: any, index: any) => {
        let obj = {
          "id": ++index,
          "personalizationId": e.personalizationId,
          "keyName": e.keyName,
          "keyValue": e.keyValue,
          "is_Active": e.is_Active,
          "is_Deleted": e.is_Deleted,
        }
        records.push(obj);
      })
      this.data = records;
    })
  }
  deletePersonalization(e: any) {
    this.http.DeletePersonalization(e).subscribe(res => {
      this.data = undefined
      this.getPersonalization()
    })

  }
  closeSidebar(e:any){
    this.editdata = undefined
  }
}
