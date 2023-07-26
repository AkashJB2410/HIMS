import { Component, OnInit } from '@angular/core';
import opdRgistrationForm from './opdRegistrationForm.json';
import configService from './service_table_config.json';
import { OpdRegistrationService } from './opd-registration.service';


@Component({
  selector: 'app-opd-registration',
  templateUrl: './opd-registration.component.html',
  styleUrls: ['./opd-registration.component.css']
})
export class OpdRegistrationComponent implements OnInit {
  formJSON:any=opdRgistrationForm;
  serviceConfig:any;
  configServ:any;
  opdData: any[];
  constructor(private http: OpdRegistrationService) { }

  ngOnInit(): void {
    this.serviceConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    };
    this.getConfigForTable();
    this.getOPDService();
  }
  getConfigForTable() {
    this.configServ = configService;
  }
  changeEvent(e:any){

  }
  buttonEvent(e:any){
    
  }
  getOPDService() {
    this.http.getOPDService().subscribe((res) => {
      this.opdData = [];
      this.opdData = res[1].result;
      console.log("get all data getOPDService ====>>>>", res)
    });
  }

}
