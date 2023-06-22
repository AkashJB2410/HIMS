import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import unitTable from './unit_TableConfig.json';
import unitForm from './unit_form.json';
import { UnitService } from './unit.service';
import unit_breadcrumb from './unit-breadcrumb.json'
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  unitFormData: any = unitForm;
  configurations: any;
  data: any;
  formdata: any;
  isdataReady = false;
  unit_breadcrumb =unit_breadcrumb;
  constructor(private messageService: MessageService ,private http: UnitService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = unitTable
    this.getAllUnit();
    this.assignOptions();
  }
  isActive(event: string) {
    console.log(event);
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;      
      this.getAllUnit();
    });
  }
  
  getConfigForTable() {
    this.tableConfig = unitTable;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  addRow(e:any){
    this.visibleSidebar = true;
  }

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (e.unitId == true) {
      console.log(e);
      this.submitUnit(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateUnit(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  confirmAction(e: any) {
    this.deleteUnit(e.unitId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
    console.log('Deleted' + JSON.stringify(e));
  }

  getAllUnit() {
    this.http.GetAllUnitData().subscribe((res) => {
      this.data = res;
      console.log(this.data);      
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
    });
  }

  updateUnit(unitId: any) {
    this.http.updateUnitData(unitId).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
      console.log('data' + data);
    });
  }

  deleteUnit(unitId: any) {
    this.http.deleteUnitData(unitId).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
      console.log('data' + data);  
    });
  }

  submitUnit(unitId: any) {
    this.http.saveUnitData(unitId).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
      console.log('data' + data);
    });
  }

  assignOptions() {
    this.formdata = Object.assign({}, unitForm);
    this.formdata.form.formControls.forEach((data: any) => {
      data.values=[];
      if (data.formControlName === "selectCountry") {
        let defaultObj = {
          "name": "Select country",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllCountryData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.countryName,
              "code": e.countryId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectstate") {
        let defaultObj = {
          "name": "Select State",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllCountryData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.stateName,
              "code": e.stateId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectcity") {
        let defaultObj = {
          "name": "Select City",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllCountryData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.cityName,
              "code": e.cityId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "unitCluster") {
        let defaultObj = {
          "name": "Select Cluster",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllClusterData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.clusterName,
              "code": e.clusterId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "unitOrganization") {
        let defaultObj = {
          "name": "Select Organization",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllOrganizationData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.orgName,
              "code": e.orgId
            }
            data.values.push(obj);
          })
        })
      }
    })
  }
}
