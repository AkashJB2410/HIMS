import { Component, OnInit } from '@angular/core';
import { SuperSpecialityService } from './super-speciality.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import breadcrumb from './super-speciality-breadcrumb.json';
import speciality_Table_Config from './super-speciality-tableConfig.json';
import speciality_Form from './super-speciality.json'
import { FeaturescommonService } from '../shared/featurescommon.service';

@Component({
  selector: 'app-super-speciality',
  templateUrl: './super-speciality.component.html',
  styleUrls: ['./super-speciality.component.css']
})
export class SuperSpecialityComponent implements OnInit {

  // orgDetails:any
  addnewss:any = speciality_Form;
  configurations: any
  data:any;
  config: any;
  visibleSidebar: boolean = true;
  isdataReady = false;
  saveMethod: boolean=false;
  breadcrumb = breadcrumb;
  editData:any;
  apiGet="mstSuperSpeciality/list";
  apiAdd="addMstSuperSpeciality/create";
  apiUpdate="updateMstSuperSpeciality/update";
  apidelete="deleteMstSuperSpeciality/inActivate";
  apiactive="reactiveMstSuperSpeciality/activate";

  constructor(private messageService: MessageService, private common:CommonService, private http:FeaturescommonService) { }
  
  ngOnInit(): void {
    
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllSs();
    this.getConfigForTable();
  }

  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e)
    } else if (e == 'cancel') {
      console.log(e)
    }
  }

  getConfigForTable() {    
    this.config = speciality_Table_Config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  buttonEvent(e:any){
    this.editData=undefined;
    this.common.sendEditData(false);
  }

  saveSSpeciality(e:any){
    this.addnewss.form.formControls[0].isVisible=false;
    this.saveMethod = true;
    this.editData=[];
    this.common.sendEditData(false);
  }

  editSSpeciality(e:any){
    this.addnewss.form.formControls[0].isVisible=true;
    this.editData=e.editRow;
  }

  isActive(data:any){
    if(!data.isActive){
      this.http.reactiveData(this.apiactive, data, data.ss_id)
        .subscribe(b_Data => {
          this.data = undefined;
          this.getAllSs();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Super Speciality Enable Successfully' });  
    }
    else if(data.isActive){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Super Speciality is already Active' });
    }
  }


  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (this.saveMethod) {
      console.log(e)      
      this.submitSs(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Super Speciality Added Successfully' });
      this.saveMethod=false;
    } else {
      console.log(e);      
      this.updateSs(e);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Super Speciality Updated Successfully.' });      
    }
  }  

  submitSs(ssData: any) {
    console.log("hello");
    this.http.addData(ssData, this.apiAdd)
      .subscribe(data => {
        this.data = undefined;
        this.getAllSs();
        console.log("data" + data)
      })
  } 

  getAllSs() {
    this.http.getData(this.apiGet).subscribe(res => {
      this.data = res.content;
      this.isdataReady = true;
      for(let i=0; i<this.data.length;i++){
        this.data[i].id=i+1;
      }
      this.data;
    })
  }

  updateSs(ssData:any){
    this.http.updateData(ssData, this.apiUpdate)
    .subscribe(data => {
      this.data = undefined;
      this.getAllSs();
      console.log("data" + data)
    })
  }


  deleteSs(ssData: any) {
    this.http.deleteData(this.apidelete, ssData.ss_id)
      .subscribe(data => {
        this.data = undefined;
        this.getAllSs();
        console.log("data" + data)
      })
  }
  
  confirmAction(e: any) {
    if(e.isActive==true){
      this.data=undefined;
    this.deleteSs(e);    
    this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Super Speciality Disabled Successfully' });
    }
    else if (e.isActive==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Super Speciality is already Disabled' });
    }
    else{}
  }

  bulkDeleteRows(bulk_Data: any) {
    let count = 0;
    if (bulk_Data != '') {
      bulk_Data.forEach((ssData: any) => {
        if (ssData.isActive == true) {
          this.deleteSs(ssData);
          count++;
        }
      });
      if (count == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The Selected Rows are Already Disabled',
        });
        this.data = undefined;
        this.getAllSs();
      }
      else if (count != 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Bulk Deleted',
          detail: 'Successful Disabled',
        });
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No Row Selected',
      });
    }
  }

}
