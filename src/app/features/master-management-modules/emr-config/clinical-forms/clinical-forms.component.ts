import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';
import breadcrumb from './clinical-forms-breadcrumb.json';
import clinical_Table_Config from './clinical-forms-tableConfig.json';
import clinical_Form from './clinical-forms.json'


@Component({
  selector: 'app-clinical-forms',
  templateUrl: './clinical-forms.component.html',
  styleUrls: ['./clinical-forms.component.css']
})
export class ClinicalFormsComponent implements OnInit {

 // orgDetails:any
 clinicalForms:any =[];
 addnewss:any = clinical_Form;
 configurations: any
 data:any;
 config: any;
 visibleSidebar: boolean = true;
 isdataReady = false;
 saveMethod: boolean=false;
 breadcrumb = breadcrumb;
 formdata: any;
 sidebarJSON: any = clinical_Form;
 editData:any;
 apiGet="mstClinicalForms/list";
 apiAdd="mstClinicalForms/create";
 apiUpdate="mstClinicalForms/update";
 apidelete="mstClinicalForms/inActivate";
 apiactive="mstClinicalForms/activate";

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
   this.config = clinical_Table_Config;
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

 assignDropDownOptions() {
  this.formdata = Object.assign({}, clinical_Form);
  this.formdata.form.formControls.forEach((data: any) => {
    if (data.formControlName === 'cf_field_type') {
      data.values = [];
      let defaultObj = {
        name: 'Clinical Field Type',
        code: '',
      };
      data.values.push(defaultObj);
      this.http.getAllSs().subscribe((item:any) => {
        item.forEach((e: any) => {
          let obj = {
        
            code: e.cf_field_type,
          };
          data.values.push(obj);
        });
      });
    }
  });
}


 isActive(data:any){
   if(!data.isActive){
     this.http.reactiveData(this.apiactive, data, data.cf_id)
       .subscribe(b_Data => {
         this.data = undefined;
         this.getAllSs();
       })
       this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Clinical Forms Enable Successfully' });  
   }
   else if(data.isActive){
     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Clinical Forms is already Active' });
   }
 }


 sidebarData(e: any) {
   console.log("From User Management ==> ", e);
   if (e == 'reset') {
     console.log(e)
   } else if (this.saveMethod) {
     console.log(e)      
     this.submitSs(e);
     this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Clinical Forms Added Successfully' });
     this.saveMethod=false;
   } else {
     console.log(e);      
     this.updateSs(e);
     this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Clinical Forms Updated Successfully.' });      
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
  this.data = undefined;
  this.clinicalForms = [];
   this.http.getData(this.apiGet).subscribe(res => {
    // this.data = res.content;
    console.log('All data=>', res)
    this.data = res.content.forEach((e: any, index: any) => {
      let obj = {
        "id": index,
        "cf_id": e.cf_id,
        "form_name": e.form_name,
        "cf_field_type":e.cf_field_type,
        "cf_speciality_id":e.cf_speciality_id,
        "sequence_no":e.sequence_no,
        "description":e.description,
        "question":e.question,
        "is_Active": e.is_Active,
      }
      this. clinicalForms.push(obj)
    })
    this.data = [...this. clinicalForms];

     this.isdataReady = true;
     for(let i=0; i<this.data.length;i++){
       this.data[i].id=i+1;
     }
     this.data;
   })
   console.log(this.data)
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
   this.http.deleteData(this.apidelete, ssData.cf_id)
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
   this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Clinical Forms Disabled Successfully' });
   }
   else if (e.isActive==false){
     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Clinical Forms is already Disabled' });
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
