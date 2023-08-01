import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';
import disease_Sub_Categorys_Table_Config from './disease-sub-categorys-tableConfig.json';
import disease_Sub_Categorys_Form from './disease-sub-categorys.json';
import breadcrumb from './disease-sub-categorys-breadcrumb.json';

@Component({
  selector: 'app-disease-sub-categorys',
  templateUrl: './disease-sub-categorys.component.html',
  styleUrls: ['./disease-sub-categorys.component.css']
})
export class DiseaseSubCategorysComponent implements OnInit {

    // orgDetails:any
    addnewss:any = disease_Sub_Categorys_Form;
    configurations: any
    data:any;
    config: any;
    formdata: any;
    visibleSidebar: boolean = true;
    isdataReady = false;
    saveMethod: boolean=false;
    breadcrumb = breadcrumb;
    editData:any;
    apiGet="diseaseSubCategory/list";
    apiAdd="adddiseaseSubCategory/create";
    apiUpdate="updatediseaseSubCategory/update";
    apidelete="deletediseaseSubCategory/inActivate";
    apiactive="reactivediseaseSubCategory/activate";
  
    constructor(private messageService: MessageService, private common:CommonService, private http:FeaturescommonService) { }
    
    ngOnInit(): void {
      
      this.configurations = {
        "isFilter": false,
        "isTable": true,
        "isSideBar": true,
        "isConfirmation": true
      };
      this.getAllDiseaseSubCategory();
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
      this.config = disease_Sub_Categorys_Table_Config;
    }
  
    editRow(e: any) {
      this.visibleSidebar = true;
    }
  
    buttonEvent(e:any){
      this.editData=undefined;
      this.common.sendEditData(false);
    }
  
    saveDisease(e:any){
      this.addnewss.form.formControls[0].isVisible=false;
      this.saveMethod = true;
      this.editData=[];
      this.common.sendEditData(false);
    }
  
    editDisease(e:any){
      this.addnewss.form.formControls[0].isVisible=true;
      this.editData=e.editRow;
    }
  
    isActive(data:any){
      if(!data.isActive){
        this.http.reactiveData(this.apiactive, data, data.ss_id)
          .subscribe(b_Data => {
            this.data = undefined;
            this.getAllDiseaseSubCategory();
          })
          this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Disease Sub Categorys Enable Successfully' });  
      }
      else if(data.isActive){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Disease Sub Categorys is already Active' });
      }
    }
  
  
    sidebarData(e: any) {
      console.log("From User Management ==> ", e);
      if (e == 'reset') {
        console.log(e)
      } else if (this.saveMethod) {
        console.log(e)      
        this.submitDisease(e);
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Disease Sub Categorys Added Successfully' });
        this.saveMethod=false;
      } else {
        console.log(e);      
        this.updateDiseaseSubCategory(e);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Disease Sub Categorys Updated Successfully.' });      
      }
    }  
  
    submitDisease(dscData: any) {
      console.log("hello");
      this.http.addData(dscData, this.apiAdd)
        .subscribe(data => {
          this.data = undefined;
          this.getAllDiseaseSubCategory();
          console.log("data" + data)
        })
    } 

    assignDropDownOptions() {
      this.formdata = Object.assign({}, disease_Sub_Categorys_Form);
      this.formdata.form.formControls.forEach((data: any) => {
        if (data.formControlName === 'dscDiseaseCategoryId') {
          data.values = [];
          let defaultObj = {
            name: 'Disease Sub Category',
            code: '',
          };
          data.values.push(defaultObj);
          this.http.getAllSs().subscribe((item:any) => {
            item.forEach((e: any) => {
              let obj = {
            
                code: e.dscDiseaseCategoryId,
              };
              data.values.push(obj);
            });
          });
        }
      });
    }
  
    getAllDiseaseSubCategory() {
      this.http.getData(this.apiGet).subscribe(res => {
        this.data = res.content;
        this.isdataReady = true;
        for(let i=0; i<this.data.length;i++){
          this.data[i].id=i+1;
        }
        this.data;
      })
      console.log(this.data)
    }
  
    updateDiseaseSubCategory(ssData:any){
      this.http.updateData(ssData, this.apiUpdate)
      .subscribe(data => {
        this.data = undefined;
        this.getAllDiseaseSubCategory();
        console.log("data" + data)
      })
    }
  
  
    deleteDiseaseSubCategory(ssData: any) {
      this.http.deleteData(this.apidelete, ssData.ss_id)
        .subscribe(data => {
          this.data = undefined;
          this.getAllDiseaseSubCategory();
          console.log("data" + data)
        })
    }
    
    confirmAction(e: any) {
      if(e.isActive==true){
        this.data=undefined;
      this.deleteDiseaseSubCategory(e);    
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Disease Sub Categorys Disabled Successfully' });
      }
      else if (e.isActive==false){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Disease Sub Categorys is already Disabled' });
      }
      else{}
    }
  
    bulkDeleteRows(bulk_Data: any) {
      let count = 0;
      if (bulk_Data != '') {
        bulk_Data.forEach((ssData: any) => {
          if (ssData.isActive == true) {
            this.deleteDiseaseSubCategory(ssData);
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
          this.getAllDiseaseSubCategory();
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
