import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/core/shared/service/session.service';
import data from '../personalization/personalizationform.json'
import tableHeaders from '../personalization/personalization-tableconfig.json'

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
  ThemePersonalization: any=[];
  personalizationData: any;
  ForThemes: any;
  form = new FormGroup({
    dateformat: new FormControl(''),
    currency: new FormControl(''),
    themes: new FormControl('')

  });
  sidebarJSON = data
  tableConfig = tableHeaders;
  data :any =[]
  formData: Partial<{ dateformat: string; currency: string; }>;
  configurations: { isFilter: boolean; isTable: boolean; isSideBar: boolean; isConfirmation: boolean; };
  constructor(  private http: SessionService) { }

  ngOnInit(): void {
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
    onSubmit() {
      this.http.addPersonalization(this.form.value.dateformat, this.form.value.currency, this.form.value.themes)
        .subscribe(data => {
          this.personalizationData = data
        });
    }

   
    onAdd(e: any) {
   
    }
    getConfigForTable() {
      this.tableConfig = tableHeaders;
      ;
    }
    onEdit(e:any){
   
    }
    sidebarData(e: any) {
    }
    confirmAction(e: any) {
    }
    addRow(e: any) {
      
    }
  
}
