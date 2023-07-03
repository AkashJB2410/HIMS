import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import unitTable from './unit_TableConfig.json';
import unitForm from './unit_form.json';
import { UnitService } from './unit.service';
import unit_breadcrumb from './unit-breadcrumb.json'
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  unitFormData: any = unitForm;
  unit_breadcrumb = unit_breadcrumb;
  configurations: any;
  data: any;
  formdata: any;
  isdataReady = false;
  unitdata: any = []
  flag: any;
  editData:any
  constructor(private messageService: MessageService, private http: UnitService,private common:CommonService) { }

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

  onAdd(e: any) {
    this.editData=[]
    this.flag = e;
  }

  onEdit(e:any){
    this.flag=e.edit
    let obj = {
      "unitId": e.editRow.unitId,
      "unitName": e.editRow.unitName,
      "unitpostfix": e.editRow.unitpostfix,
      "unitcenter": e.editRow.unitcenter,
      "unitAddress": e.editRow.unitAddress,
      "unitEmail": e.editRow.unitEmail,
      "unitMobile": e.editRow.unitMobile,
      "unitPhone": e.editRow.unitPhone,
      "unitContactPerson": e.editRow.unitContactPerson,
      "mstOrg": e.editRow.mstOrg,
      "unitCode": e.editRow.unitCode,
      "unitClinicContactNo": e.editRow.unitClinicContactNo,
      "unitPharmacyLicenseNo": e.editRow.unitPharmacyLicenseNo,
      "unitPharmacyStoreName": e.editRow.unitPharmacyStoreName,
      "unitPharmacyGstNo": e.editRow.unitPharmacyGstNo,
      "unitClinicRegistrationNo": e.editRow.unitClinicRegistrationNo,
      "unitShopAndEstablishmentNo": e.editRow.unitShopAndEstablishmentNo,
      "unitTradeNo": e.editRow.unitTradeNo,
      "unitServer": e.editRow.unitServer,
      "unite.editRowbase": e.editRow.unite.editRowbase,
      "unitFaxNo": e.editRow.unitFaxNo,
      "unitWebSite": e.editRow.unitWebSite,
      "countryId": e.editRow.countryId,
      "countryName": e.editRow.countryName,
      "cityId": e.editRow.cityId,
      "cityName": e.editRow.cityName,
      "stateId": e.editRow.stateId,
      "stateName": e.editRow.stateName,
      "unitClusterId": e.editRow.unitClusterId,
      "unitAddressZip": e.editRow.unitAddressZip,
      "unitAddressArea": e.editRow.unitAddressArea,
      "unitXHipId": e.editRow.unitXHipId,
    }
    this.editData=obj;
  }
  buttonEvent(e:any){
    this.editData=undefined;
this.common.sendEditData(false);
  }
  getConfigForTable() {
    this.tableConfig = unitTable;
  }
  editRow(e: any) {
    this.visibleSidebar = true;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  // sidebarData(e: any) {
  //   if (e != 'reset') {
  //     if (this.flag == "edit") {
  //       this.updateUnit(e);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'success',
  //         detail: 'Data updated successfull.',
  //       });
  //     } else {
  //       this.submitUnit(e);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'success',
  //         detail: 'Data save successfull.',
  //       });
  //     }
  //   }
  // }
  BulkDeleteRows(e: any) {
    this.unitdata = [];
    if (e != '') {
      e.forEach((data: any) => {
        if (data.is_Active != false) {
          let obj = {
            "unitId": data.unitId,
          }
          this.deleteUnit(obj.unitId);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'selected Rows',
            detail: ' Deleted.',
          });
        }
      });
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Delete All Data successfull.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'select Rows',
        detail: 'Rows are not selected.',
      });
    }
  }
  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == "edit") {
        this.updateUnit(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitUnit(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data save successfull.',
        });
      }
    }
  }
  confirmAction(e: any) {
    if (e != false) {
      this.deleteUnit(e.unitId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
  }

  getAllUnit() {
    this.data=undefined;
    this.unitdata=[];
    this.http.GetAllUnitData().subscribe((res) => {
      // for (let i = 0; i < this.data.length; i++) {
      //   this.data[i].srNumber = i + 1;
      // }
      res.forEach((data: any, index:any) => {
        let obj = {
          "id":index,
          "unitId": data.unitId,
          "unitName": data.unitName,
          "unitpostfix": data.unitpostfix,
          "unitcenter": data.unitcenter,
          "unitAddress": data.unitAddress,
          "unitEmail": data.unitEmail,
          "unitMobile": data.unitMobile,
          "unitPhone": data.unitPhone,
          "unitContactPerson": data.unitContactPerson,
          "mstOrg": data.mstOrg,
          "unitCode": data.unitCode,
          "unitClinicContactNo": data.unitClinicContactNo,
          "unitPharmacyLicenseNo": data.unitPharmacyLicenseNo,
          "unitPharmacyStoreName": data.unitPharmacyStoreName,
          "unitPharmacyGstNo": data.unitPharmacyGstNo,
          "unitClinicRegistrationNo": data.unitClinicRegistrationNo,
          "unitShopAndEstablishmentNo": data.unitShopAndEstablishmentNo,
          "unitTradeNo": data.unitTradeNo,
          "unitServer": data.unitServer,
          "unitDatabase": data.unitDatabase,
          "unitFaxNo": data.unitFaxNo,
          "unitWebSite": data.unitWebSite,
          "countryId": data.countryId,
          "countryName": data.countryName,
          "cityId": data.cityId,
          "cityName": data.cityName,
          "stateId": data.stateId,
          "stateName": data.stateName,
          "unitClusterId": data.unitClusterId,
          "unitAddressZip": data.unitAddressZip,
          "unitAddressArea": data.unitAddressArea,
          "unitXHipId": data.unitXHipId,
        }
        this.unitdata.push(obj);
      })
      this.data = [...this.unitdata];
      
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
      this.data;
    });
  }

  updateUnit(unitId: any) {
    this.http.updateUnitData(unitId).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
    });
  }

  deleteUnit(unitId: any) {
    this.http.deleteUnitData(unitId).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
    });
  }

  submitUnit(unitId: any) {
    this.http.saveUnitData(unitId).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
    });
  }
  isActive(event: string) {
    console.log(event);
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;
      this.getAllUnit();
    });
  }
  assignOptions() {
    this.formdata = Object.assign({}, unitForm);
    this.formdata.form.formControls.forEach((data: any) => {
      data.values = [];
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
        this.http.GetAllStateData().subscribe(item => {
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
        this.http.GetAllCityData().subscribe(item => {
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
      if (data.formControlName === "unitOrg") {
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
