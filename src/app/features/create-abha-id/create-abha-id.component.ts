import { Component, OnInit } from '@angular/core';
import tabularTab from './tabularJSON.json'
import abhaForm from './createABHA.json'
import fechForm from './fetchABHA.json'
import accordionForm from './accordionForm.json'
import { FormService } from 'src/app/core/shared/service/form.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-abha-id',
  templateUrl: './create-abha-id.component.html',
  styleUrls: ['./create-abha-id.component.css']
})
export class CreateAbhaIdComponent implements OnInit {
  tabular=tabularTab;
  formData1:any
  formData2:any
  accordion={
    "data":{
      "id": 0,
      "label": "Profile Details (As per Aadhaar)",
      "selected": true
    }
  }
  accForm=accordionForm;
  editData:any;
  acc=false;
  formId:any;
  pdf:any;

  constructor(private form:FormService, private message:MessageService) { }

  ngOnInit(): void {
  }

  tabularActiveTab(e:any){
    if (e.id == 0) {
      this.acc=false;
      this.formData1 = abhaForm;
      this.formData2 = "";
    } else if (e.id == 1) {
      this.acc=false;
      this.formData1 = "";
      this.formData2 = fechForm;
    } 
  }

  createAbha(e:any){
    this.accordion.data.label="Profile Details (As per Aadhaar)";
    this.acc=true;
    this.formId=e.formId;
    setTimeout(() => {
      this.form.reRenderForm(this.accForm.form.formControls[0], "Raghu Pal", 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[1], "Pune", 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[2], "19/12/2000", 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[3], "Male", 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[4], "Maharashtra", 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[5], "Pune", 'autofill')
    }, 0);
  }

  fetchAbha(e:any){
    this.accordion.data.label="Profile Details (As per ABHA)";
    this.acc=true;
    this.formId=e.formId;
    if((e.abhAaddress!=null || e.abhaId!=null) && (e.abhAaddress!='' || e.abhaId!='')){
      setTimeout(() => {
        this.form.reRenderForm(this.accForm.form.formControls[0], "Jack", 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[1], "Parli-V", 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[2], "25/03/1999", 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[3], "Male", 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[4], "Maharashtra", 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[5], "Beed", 'autofill')
      }, 0);
    }
    else{
      this.acc=false;
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Enter Data' })
    }
  }

  buttonEvent(e:any){
    this.pdf=null;
    if(e=='pdf'){
      this.pdf=true;
    }
    else if(e=='png'){
      this.pdf=false;
    }
  }

  saveAccordion(e:any){
    setTimeout(()=>{
      if(this.formId=="0"){
        if(this.pdf==true){
          this.pdf=false;
          this.message.add({ severity: 'success', summary: 'PDF', detail: '' })
        }
        else if(this.pdf!=null){
          this.message.add({ severity: 'success', summary: 'PNG', detail: '' })
        }
        else if(this.pdf==null){
          this.message.add({ severity: 'success', summary: 'Next', detail: '' })
        }
      }
      else if(this.formId=="1"){
        if(this.pdf==true){
          this.message.add({ severity: 'success', summary: 'PDF', detail: '' })
        }
        else if(this.pdf!=null){
          this.message.add({ severity: 'success', summary: 'PNG', detail: '' })
        }
        else if(this.pdf==null){
          this.message.add({ severity: 'success', summary: 'Next', detail: '' })
        }
      }
    }, 0)
  }
  changeAccordion(e:any){
    
  }
}