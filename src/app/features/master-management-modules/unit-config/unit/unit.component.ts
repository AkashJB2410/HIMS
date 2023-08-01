import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';
import Application_breadcrumb from './breadcrum.json';
import mstUnitTableConfig from './mstUnitTableConfig.json'
import mstUnitSidebarConfig from './mstUnitSidebarConfig.json'

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  //variable declarations
  applicationBreadcrumb = Application_breadcrumb;
  isDataReady: any;
  isEditMode: boolean;
  gridConfigurations = {
    isFilter: false,
    isTable: true,
    isSideBar: true,
    isConfirmation: true,
  };
  mstUnitData: any;
  tableConfig = mstUnitTableConfig;
  sidebarConfig = mstUnitSidebarConfig;
  selectedUnitData: any;
  deleteMsg = false;

  //API declarations
  apiGet = 'mstUnit/list';
  apiAdd = 'mstUnit/create';
  apiUpdate = 'mstUnit/update';
  apidelete = 'mstUnit/inActivate';
  apiactive = 'mstUnit/activate';
  apiCountryGet = 'mstCountry/list';
  apiStateGet = 'mstState/list'
  apiCityGet = 'mstCity/list'
  apiOrgGet='mstOrganization/list'
  apiClusterGet='mstCluster/list'

  constructor(
    private messageService: MessageService,
    private featurescommonService: FeaturescommonService,
    private common: CommonService
  ) { }
  ngOnInit(): void {
    this.getCountry();
    this.getState();
    this.getCity();
    this.getOrg();
    this.fetchMstUnitData();
  }

  getCountry() {
    let defaultValues = {
      "name": "Select Country",
      "code": ""
    }
    this.featurescommonService.getData(this.apiCountryGet).subscribe(
      (response) => {
        //Extract country object form API response
        const countryObj = response.content.map((country: any) => ({
          name: country.countryName,
          code: country.countryId,
        }));
        //sort countryObj based on the name property
        countryObj.sort((a: any, b: any) => a.name.localeCompare(b.name));
        //add the default option to the beginning of the array
        countryObj.unshift(defaultValues);
        //push the sorted and updated countryobj to the sidebar form control
        this.sidebarConfig.form.formControls[13].values[0].values = countryObj;
      },
      (error) => {
        console.error('API Error', error);
      })
  }

  getState() {
    let defaultValues = {
      "name": "Select State",
      "code": "",
      "Mcode": ""
    }
    this.featurescommonService.getData(this.apiStateGet).subscribe(
      (response) => {
        //Extract state object form the API response
        const stateObj = response.content.map((state: any) => ({
          name: state.stateName,
          code: state.stateId,
          Mcode: state.stateCountryId.countryId
        }));
        //sort stateObj based on the name property
        stateObj.sort((a: any, b: any) => a.name.localeCompare(b.name));
        //add the default option to the beginning of the array
        stateObj.unshift(defaultValues);
        //push the sorted and updated stateObj to the sidebar form control
        this.sidebarConfig.form.formControls[13].values[1].values = stateObj;
      },
      (error) => {
        console.error('API Error:', error);
      }
    )
  }

  getCity() {
    let defaultValues = {
      "name": "Select City",
      "code": "",
      "Mcode": ""
    }
    this.featurescommonService.getData(this.apiCityGet).subscribe(
      (response) => {
        //Extract city object from the API response
        const cityObj = response.content.map((city: any) => ({
          name: city.cityName,
          code: city.cityId,
          Mcode: city.cityStateId.stateId
        }));
        //sort cityObj based on the name property
        cityObj.sort((a: any, b: any) => a.name.localeCompare(b.name));
        //add the default option to the beginning of the array
        cityObj.unshift(defaultValues);
        //push the sorted cityObj to the sidebar form control
        this.sidebarConfig.form.formControls[13].values[2].values = cityObj;
      },
      (error) => {
        console.error('API Error:', error);
      }
    )
  }

  getOrg(){
    let defaultValues={
      "name": "Select Organization",
      "code":""
    }
    this.featurescommonService.getData(this.apiOrgGet).subscribe(
      (response)=>{
        //Extract org object form API response
        const orgObj=response.content.map((org:any)=>({
          name:org.orgName,
          code:org.orgId
        }));
        //sort orgObj based on the name property
        orgObj.sort((a:any, b:any)=>a.name.localeCompare(b.name));
        //add the default option to the beginning of the array
        orgObj.unshift(defaultValues);
        //push the sorted orgObj to the sidebar form control
        this.sidebarConfig.form.formControls[10].values=orgObj;
      },
      (error) => {
        console.error('API Error:', error);
      }
    )
  }

  fetchMstUnitData() {
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        //update the mstUnitData with the API response
        this.mstUnitData = response.content.map((item: any, index: number) => ({
            id: index + 1,
            "unitId": item.unitId,
            "unitName": item.unitName,
            "unitpostfix": item.unitpostfix,
            "unitcenter": item.unitcenter,
            "unitAddress": item.unitAddress,
            "unitEmail": item.unitEmail,
            "unitMobile": item.unitMobile,
            "unitPhone": item.unitPhone,
            "unitContactPerson": item.unitContactPerson,
            "unitCode": item.unitCode,
            "unitClinicContactNo": item.unitClinicContactNo,
            "unitPharmacyLicenseNo": item.unitPharmacyLicenseNo,
            "unitPharmacyStoreName": item.unitPharmacyStoreName,
            "unitPharmacyGstNo": item.unitPharmacyGstNo,
            "unitClinicRegistrationNo": item.unitClinicRegistrationNo,
            "unitShopAndEstablishmentNo": item.unitShopAndEstablishmentNo,
            "unitTradeNo": item.unitTradeNo,
            "unitServer": item.unitServer,
            "unitDatabase": item.unitDatabase,
            "unitFaxNo": item.unitFaxNo,
            "unitAddressZip": item.unitAddressZip,
            "unitAddressArea": item.unitAddressArea,
            "unitXHipId": item.unitXHipId,
            "unitOrgId": item.unitOrgId.orgId,
            "unitOrgName":item.unitOrgId.orgName,
            "unitCountryId": item.unitCountryId.countryId,
            "unitCountryName":item.unitCountryId.countryName,
            "unitDistrictId": item.unitDistrictId.districtId,
            "unitDistrictName":item.unitDistrictId.districtName,
            "unitStateId": item.unitStateId.stateId,
            "unitStateName":item.unitStateId.stateName,
            "unitCityId": item.unitCityId.cityId,
            "unitCityName":item.unitCityId.cityName,
            "unitClusterId":item.unitClusterId.clusterId,
            "unitClusterName":item.unitClusterId.clusterName,
        }));
        //set the flag to indicate that data is ready for refreshing he grid
        this.isDataReady = true;
        console.log(this.mstUnitData);
        
      },
      (error) => {
        console.error('API Error:', error)
      }
    )
  }

  addOrUpdateMstUnit(unitData:any, isEditMode:boolean){
    let obj={
            "unitId": unitData.unitId,
            "unitName": unitData.unitName,
            "unitpostfix": unitData.unitpostfix,
            "unitcenter": unitData.unitcenter,
            "unitAddress": unitData.unitAddress,
            "unitEmail": unitData.unitEmail,
            "unitMobile": unitData.unitMobile,
            "unitPhone": unitData.unitPhone,
            "unitContactPerson": unitData.unitContactPerson,
            "unitCode": unitData.unitCode,
            "unitClinicContactNo": unitData.unitClinicContactNo,
            "unitPharmacyLicenseNo": unitData.unitPharmacyLicenseNo,
            "unitPharmacyStoreName": unitData.unitPharmacyStoreName,
            "unitPharmacyGstNo": unitData.unitPharmacyGstNo,
            "unitClinicRegistrationNo": unitData.unitClinicRegistrationNo,
            "unitShopAndEstablishmentNo": unitData.unitShopAndEstablishmentNo,
            "unitTradeNo": unitData.unitTradeNo,
            "unitServer": unitData.unitServer,
            "unitDatabase": unitData.unitDatabase,
            "unitFaxNo": unitData.unitFaxNo,
            "unitAddressZip": unitData.unitAddressZip,
            "unitAddressArea": unitData.unitAddressArea,
            "unitXHipId": unitData.unitXHipId,
            "unitOrgId": unitData.unitOrg.code,
            "unitCountryId": unitData.selectCountryStateCity[0],
            "unitDistrictId": unitData.unitDistrictiId,
            "unitStateId": unitData.selectCountryStateCity[1],
            "unitCityId": unitData.selectCountryStateCity[2],
            "unitClusterId": unitData.unitClusterId.code,
    }
    // Determine the API endpoint based on the 'isEditMode' flag
    const apiEndpoint = isEditMode ? this.apiUpdate : this.apiAdd;
     // Call the corresponding API method (addData or updateData) based on the 'isEditMode' flag
     this.featurescommonService[isEditMode?'updateData':'addData'](unitData,apiEndpoint).subscribe(
      (response)=>{
        //update the mstUnitData with the API response
        this.mstUnitData=response.result.map((item:any, index:number)=>({
          ...item,
          id:index+1
        }));
       // Set the flag to indicate that data is ready for refreshing the grid
       this.isDataReady = true;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
     },
     (error) => {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
     }
   );
     // Reset the flag to indicate that data is not ready for refreshing the grid yet
   this.isDataReady = false;
 }

 deleteMstUnit(unitData:any){
  this.featurescommonService.deleteData(this.apidelete, unitData.unitId).subscribe(
    (response)=>{
       //update the mstUnitData with the API response
       this.mstUnitData=response.result.map((item:any, index:number)=>({
        ...item,
        id:index+1
      }));
     // Set the flag to indicate that data is ready for refreshing the grid
     this.isDataReady = true;
     this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
   },
   (error) => {
     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
   }
 );
   // Reset the flag to indicate that data is not ready for refreshing the grid yet
 this.isDataReady = false;
}

toggleMstUnitStatus(unitData: any) {
  if(!unitData.isActive){
    this.featurescommonService.reactiveData(this.apiactive, unitData, unitData.unitId).subscribe(
      (response)=>{
        //update the mstUnitData with the API response
        this.mstUnitData=response.result.map((item:any, index:number)=>({
          ...item,
          id:index+1
        }));
       // Set the flag to indicate that data is ready for refreshing the grid
       this.isDataReady = true;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
     },
     (error) => {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
     }
   );
     // Reset the flag to indicate that data is not ready for refreshing the grid yet
   this.isDataReady = false;
  }
}

bulkDeleteMstUnit(arrayOfUnitData: any) {
  if(arrayOfUnitData!=0){
    this.isDataReady=false;
    arrayOfUnitData.forEach((unitData:any)=>{
      this.deleteMstUnitForBulk(unitData);
    })
    if(this.deleteMsg){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bulk Delete' });
      this.deleteMsg = false;
    }
  }
  else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Row Selected' })
  }
}

deleteMstUnitForBulk(unitData:any){
  this.featurescommonService.deleteData(this.apidelete, unitData.unitId).subscribe(
    (response)=>{
        //update the mstUnitData with the API response
        this.mstUnitData=response.result.map((item:any, index:number)=>({
          ...item,
          id:index+1
        }));
       // Set the flag to indicate that data is ready for refreshing the grid
       this.isDataReady = true;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
     },
     (error) => {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
     }
   );
     // Reset the flag to indicate that data is not ready for refreshing the grid yet
   this.isDataReady = false;
  }

  closeSidebarData($event: any) {
    // Clears the selectedUnitData when closing the sidebar
    this.selectedUnitData = undefined;
  }



  confirmAction($event: any) {
    if($event==false){
      this.fetchMstUnitData();
    }
    else{
      if($event.isActive){
        this.deleteMstUnit($event)
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error' })
      }
    }
  }
  onEdit($event: any) {
    let countryStateCity=[$event.editRow.unitCountryId.countryId, $event.editRow.unitStateId.stateId, $event.editRow.unitCityId.cityId]
    this.sidebarConfig.form.formControls[0].isVisible = true;
    this.selectedUnitData={
      unitId:$event.editRow.unitId,
      unitName:$event.editRow.unitName,
      unitpostfix:$event.editRow.unitpostfix,
      unitcenter:$event.editRow.unitcenter,
      unitEmail:$event.editRow.unitEmail,
      unitMobile:$event.editRow.unitMobile,
      unitPhone:$event.editRow.unitPhone,
      unitContactPerson:$event.editRow.unitContactPerson,
      UnitDatabase:$event.editRow.UnitDatabase,
      unitClusterId:$event.editRow.unitClusterId.clusterId,
      unitOrgId:$event.editRow.unitOrgId.orgId,
      unitServer:$event.editRow.unitServer,
      unitFaxNo:$event.editRow.unitFaxNo,
      selectCountryStateCity:countryStateCity,
      unitAddress:$event.editRow.unitAddress,
      unitAddressArea:$event.editRow.unitAddressArea,
      unitAddressZip:$event.editRow.unitAddressZip,
      unitCode:$event.editRow.unitCode,
      unitClinicContactNo:$event.editRow.unitClinicContactNo,
      unitPharmacyLicenseNo:$event.editRow.unitPharmacyLicenseNo,
      unitPharmacyStoreName:$event.editRow.unitPharmacyStoreName,
      unitPharmacyGstNo:$event.editRow.unitPharmacyGstNo,
      unitClinicRegistrationNo:$event.editRow.unitClinicRegistrationNo,
      unitShopAndEstablishmentNo:$event.editRow.unitShopAndEstablishmentNo,
      unitTradeNo:$event.editRow.unitTradeNo
    }
  }
  initializeAddForm($event: any) {
    console.log(this.sidebarConfig.form.formControls[10].values);
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedUnitData = [];
    this.isEditMode = false;
    this.common.sendEditData(false);
  }
  handleButtonClick($event: any) {
      // Clears the selectedUnitData when closing the sidebar
      this.selectedUnitData = undefined;
      this.common.sendEditData(false);
  }
  sidebarData($event: any) {
    if($event=='rest'){ }
    else{
      this.addOrUpdateMstUnit($event, this.isEditMode)
    }
  }


  //   tableConfig: any;
  //   visibleSidebar: boolean = true;
  //   unitFormData: any = unitForm;
  //   unit_breadcrumb = unit_breadcrumb;
  //   configurations: any;
  //   data: any;
  //   formdata: any;
  //   isdataReady = false;
  //   unitdata: any = []
  //   flag: any;
  //   editData:any
  //   constructor(private messageService: MessageService, private http: UnitService,private common:CommonService) { }

  //   onAdd(e: any) {
  //     this.editData=[]
  //     this.flag = e;
  //   }

  //   onEdit(e:any){
  //     this.flag=e.edit
  //     let obj = {
  //       "unitId": e.editRow.unitId,
  //       "unitName": e.editRow.unitName,
  //       "unitpostfix": e.editRow.unitpostfix,
  //       "unitcenter": e.editRow.unitcenter,
  //       "unitAddress": e.editRow.unitAddress,
  //       "unitEmail": e.editRow.unitEmail,
  //       "unitMobile": e.editRow.unitMobile,
  //       "unitPhone": e.editRow.unitPhone,
  //       "unitContactPerson": e.editRow.unitContactPerson,
  //       "mstOrg": e.editRow.mstOrg,
  //       "unitCode": e.editRow.unitCode,
  //       "unitClinicContactNo": e.editRow.unitClinicContactNo,
  //       "unitPharmacyLicenseNo": e.editRow.unitPharmacyLicenseNo,
  //       "unitPharmacyStoreName": e.editRow.unitPharmacyStoreName,
  //       "unitPharmacyGstNo": e.editRow.unitPharmacyGstNo,
  //       "unitClinicRegistrationNo": e.editRow.unitClinicRegistrationNo,
  //       "unitShopAndEstablishmentNo": e.editRow.unitShopAndEstablishmentNo,
  //       "unitTradeNo": e.editRow.unitTradeNo,
  //       "unitServer": e.editRow.unitServer,
  //       "unite.editRowbase": e.editRow.unite.editRowbase,
  //       "unitFaxNo": e.editRow.unitFaxNo,
  //       "unitWebSite": e.editRow.unitWebSite,
  //       "countryId": e.editRow.countryId,
  //       "countryName": e.editRow.countryName,
  //       "cityId": e.editRow.cityId,
  //       "cityName": e.editRow.cityName,
  //       "stateId": e.editRow.stateId,
  //       "stateName": e.editRow.stateName,
  //       "unitClusterId": e.editRow.unitClusterId,
  //       "unitAddressZip": e.editRow.unitAddressZip,
  //       "unitAddressArea": e.editRow.unitAddressArea,
  //       "unitXHipId": e.editRow.unitXHipId,
  //     }
  //     this.editData=obj;
  //   }
  //   buttonEvent(e:any){
  //     this.editData=undefined;
  // this.common.sendEditData(false);
  //   }
  //   getConfigForTable() {
  //     this.tableConfig = unitTable;
  //   }
  //   editRow(e: any) {
  //     this.visibleSidebar = true;
  //   }
  //   addRow(e: any) {
  //     this.visibleSidebar = true;
  //   }
  //   // sidebarData(e: any) {
  //   //   if (e != 'reset') {
  //   //     if (this.flag == "edit") {
  //   //       this.updateUnit(e);
  //   //       this.messageService.add({
  //   //         severity: 'success',
  //   //         summary: 'success',
  //   //         detail: 'Data updated successfull.',
  //   //       });
  //   //     } else {
  //   //       this.submitUnit(e);
  //   //       this.messageService.add({
  //   //         severity: 'success',
  //   //         summary: 'success',
  //   //         detail: 'Data save successfull.',
  //   //       });
  //   //     }
  //   //   }
  //   // }
  //   BulkDeleteRows(e: any) {
  //     this.unitdata = [];
  //     if (e != '') {
  //       e.forEach((data: any) => {
  //         if (data.is_Active != false) {
  //           let obj = {
  //             "unitId": data.unitId,
  //           }
  //           this.deleteUnit(obj.unitId);
  //         } else {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'selected Rows',
  //             detail: ' Deleted.',
  //           });
  //         }
  //       });
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'success',
  //         detail: 'Delete All Data successfull.',
  //       });
  //     } else {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'select Rows',
  //         detail: 'Rows are not selected.',
  //       });
  //     }
  //   }
  //   sidebarData(e: any) {
  //     if (e != 'reset') {
  //       if (this.flag == "edit") {
  //         this.updateUnit(e);
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'success',
  //           detail: 'Data updated successfull.',
  //         });
  //       } else {
  //         this.submitUnit(e);
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'success',
  //           detail: 'Data save successfull.',
  //         });
  //       }
  //     }
  //   }
  //   confirmAction(e: any) {
  //     if (e != false) {
  //       this.deleteUnit(e.unitId);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Message form User component',
  //         detail: 'Deleted Sucessfully',
  //       });
  //     }
  //   }

  //   getAllUnit() {
  //     this.data=undefined;
  //     this.unitdata=[];
  //     this.http.GetAllUnitData().subscribe((res) => {
  //       // for (let i = 0; i < this.data.length; i++) {
  //       //   this.data[i].srNumber = i + 1;
  //       // }
  //       res.forEach((data: any, index:any) => {
  //         let obj = {
  //           "id":index,
  //           "unitId": data.unitId,
  //           "unitName": data.unitName,
  //           "unitpostfix": data.unitpostfix,
  //           "unitcenter": data.unitcenter,
  //           "unitAddress": data.unitAddress,
  //           "unitEmail": data.unitEmail,
  //           "unitMobile": data.unitMobile,
  //           "unitPhone": data.unitPhone,
  //           "unitContactPerson": data.unitContactPerson,
  //           "mstOrg": data.mstOrg,
  //           "unitCode": data.unitCode,
  //           "unitClinicContactNo": data.unitClinicContactNo,
  //           "unitPharmacyLicenseNo": data.unitPharmacyLicenseNo,
  //           "unitPharmacyStoreName": data.unitPharmacyStoreName,
  //           "unitPharmacyGstNo": data.unitPharmacyGstNo,
  //           "unitClinicRegistrationNo": data.unitClinicRegistrationNo,
  //           "unitShopAndEstablishmentNo": data.unitShopAndEstablishmentNo,
  //           "unitTradeNo": data.unitTradeNo,
  //           "unitServer": data.unitServer,
  //           "unitDatabase": data.unitDatabase,
  //           "unitFaxNo": data.unitFaxNo,
  //           "unitWebSite": data.unitWebSite,
  //           "countryId": data.countryId,
  //           "countryName": data.countryName,
  //           "cityId": data.cityId,
  //           "cityName": data.cityName,
  //           "stateId": data.stateId,
  //           "stateName": data.stateName,
  //           "unitClusterId": data.unitClusterId,
  //           "unitAddressZip": data.unitAddressZip,
  //           "unitAddressArea": data.unitAddressArea,
  //           "unitXHipId": data.unitXHipId,
  //         }
  //         this.unitdata.push(obj);
  //       })
  //       this.data = [...this.unitdata];

  //       this.isdataReady = true;
  //       for (let i = 0; i < this.data.length; i++) {
  //         this.data[i].srNumber = i + 1;
  //       }
  //       this.data;
  //     });
  //   }

  //   updateUnit(unitId: any) {
  //     this.http.updateUnitData(unitId).subscribe((data) => {
  //       this.data = undefined;
  //       this.getAllUnit();
  //     });
  //   }

  //   deleteUnit(unitId: any) {
  //     this.http.deleteUnitData(unitId).subscribe((data) => {
  //       this.data = undefined;
  //       this.getAllUnit();
  //     });
  //   }

  //   submitUnit(unitId: any) {
  //     this.http.saveUnitData(unitId).subscribe((data) => {
  //       this.data = undefined;
  //       this.getAllUnit();
  //     });
  //   }
  //   isActive(event: string) {
  //     console.log(event);
  //     this.http.isActiveData(event).subscribe((data) => {
  //       this.data = undefined;
  //       this.getAllUnit();
  //     });
  //   }
  //   assignOptions() {
  //     this.formdata = Object.assign({}, unitForm);
  //     this.formdata.form.formControls.forEach((data: any) => {
  //       data.values = [];
  //       if (data.formControlName === "selectCountry") {
  //         let defaultObj = {
  //           "name": "Select country",
  //           "code": "0"
  //         }
  //         data.values.push(defaultObj);
  //         this.http.GetAllCountryData().subscribe(item => {
  //           item.forEach((e: any) => {
  //             let obj = {
  //               "name": e.countryName,
  //               "code": e.countryId
  //             }
  //             data.values.push(obj);
  //           })
  //         })
  //       }
  //       if (data.formControlName === "selectstate") {
  //         let defaultObj = {
  //           "name": "Select State",
  //           "code": "0"
  //         }
  //         data.values.push(defaultObj);
  //         this.http.GetAllStateData().subscribe(item => {
  //           item.forEach((e: any) => {
  //             let obj = {
  //               "name": e.stateName,
  //               "code": e.stateId
  //             }
  //             data.values.push(obj);
  //           })
  //         })
  //       }
  //       if (data.formControlName === "selectcity") {
  //         let defaultObj = {
  //           "name": "Select City",
  //           "code": "0"
  //         }
  //         data.values.push(defaultObj);
  //         this.http.GetAllCityData().subscribe(item => {
  //           item.forEach((e: any) => {
  //             let obj = {
  //               "name": e.cityName,
  //               "code": e.cityId
  //             }
  //             data.values.push(obj);
  //           })
  //         })
  //       }
  //       if (data.formControlName === "unitCluster") {
  //         let defaultObj = {
  //           "name": "Select Cluster",
  //           "code": "0"
  //         }
  //         data.values.push(defaultObj);
  //         this.http.GetAllClusterData().subscribe(item => {
  //           item.forEach((e: any) => {
  //             let obj = {
  //               "name": e.clusterName,
  //               "code": e.clusterId
  //             }
  //             data.values.push(obj);
  //           })
  //         })
  //       }
  //       if (data.formControlName === "unitOrg") {
  //         let defaultObj = {
  //           "name": "Select Organization",
  //           "code": "0"
  //         }
  //         data.values.push(defaultObj);
  //         this.http.GetAllOrganizationData().subscribe(item => {
  //           item.forEach((e: any) => {
  //             let obj = {
  //               "name": e.orgName,
  //               "code": e.orgId
  //             }
  //             data.values.push(obj);
  //           })
  //         })
  //       }
  //     })
  //   }
}
