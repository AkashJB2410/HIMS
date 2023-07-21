import { Component, OnInit } from '@angular/core';
import tabularTab from './tabularJSON.json'
import abhaForm from './createABHA.json'
import fechForm from './fetchABHA.json'
import accordionForm from './accordionForm.json'
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/core/shared/service/form.service';

@Component({
  selector: 'app-create-abha-id',
  templateUrl: './create-abha-id.component.html',
  styleUrls: ['./create-abha-id.component.css']
})
export class CreateAbhaIdComponent implements OnInit {
  tabular = tabularTab;
  formData1: any
  formData2: any
  accordion = {
      "id": 0,
      "label": "Profile Details (As per Aadhaar)",
      "selected": true
  }
  accForm = accordionForm;
  editData: any;
  acc = false;
  formId: any;
  pdf: any;

  constructor(private form: FormService, private message: MessageService) { }

  ngOnInit(): void {
  }

  tabularActiveTab(e: any) {
    if (e.id == 0) {
      this.acc = false;
      this.formData1 = abhaForm;
      this.formData2 = "";
    } else if (e.id == 1) {
      this.acc = false;
      this.formData1 = "";
      this.formData2 = fechForm;
    }
  }

  createAbha(e: any) {
    this.accordion.label = "Profile Details (As per Aadhaar)";
    this.acc = true;
    this.formId = e.formId;
    const data = {
      "name": "Raghu Pal",
      "address": "Pune",
      "dob": "19/12/2000",
      "gender": "Male",
      "state": "Maharashtra",
      "district": "Pune"
    }
    setTimeout(() => {
      this.form.reRenderForm(this.accForm.form.formControls[0], data.name, 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[1], data.address, 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[2], data.dob, 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[3], data.gender, 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[4], data.state, 'autofill')
      this.form.reRenderForm(this.accForm.form.formControls[5], data.district, 'autofill')
    }, 0);
  }

  changeCreateAbha(e: any) {
    // const value = e[0];
    // if (e[1].fieldName == 'aadharNo') {
    //   const regex = /^\\d{12}$/
    //   if (regex.test(value)) {
    //     this.acc = true
    //   }
    //   else {
    //     this.acc = false
    //   }
    // }
    // else if (e[1].fieldName == 'mobileNo') {
    //   const regex = /^\\d{10}$/
    //   if (regex.test(value)) {
    //     this.acc = true
    //   }
    //   else {
    //     this.acc = false
    //   }
    // }
    // else if (e[1].fieldName == 'abhAaddress') {
    //   const regex = /^[A-Za-z0-9._%+-]+@sbx$/
    //   if (regex.test(value)) {
    //     this.acc = true
    //   }
    //   else {
    //     this.acc = false
    //   }
    // }

  }

  fetchAbha(e: any) {
    this.accordion.label = "Profile Details (As per ABHA)";
    this.acc = true;
    this.formId = e.formId;
    const data = {
      "name": "Jack",
      "address": "Parli-V",
      "dob": "25/03/1999",
      "gender": "Male",
      "state": "Maharashtra",
      "district": "Beed"
    }
    if ((e.abhAaddress != null || e.abhaId != null) && (e.abhAaddress != '' || e.abhaId != '')) {
      setTimeout(() => {
        this.form.reRenderForm(this.accForm.form.formControls[0], data.name, 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[1], data.address, 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[2], data.dob, 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[3], data.gender, 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[4], data.state, 'autofill')
        this.form.reRenderForm(this.accForm.form.formControls[5], data.district, 'autofill')
      }, 0);
    }
    else {
      this.acc = false;
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Enter Data' })
    }
  }

  buttonEvent(e: any) {
    this.pdf = null;
    if (e == 'pdf') {
      this.pdf = true;
    }
    else if (e == 'png') {
      this.pdf = false;
    }
  }

  saveAccordion(e: any) {
    setTimeout(() => {
      if (this.formId == "0") {
        if (this.pdf == true) {
          this.pdf = false;
          this.message.add({ severity: 'success', summary: 'PDF', detail: '' })
        }
        else if (this.pdf != null) {
          this.message.add({ severity: 'success', summary: 'PNG', detail: '' })
        }
        else if (this.pdf == null) {
          this.message.add({ severity: 'success', summary: 'Next', detail: '' })
        }
      }
      else if (this.formId == "1") {
        if (this.pdf == true) {
          this.message.add({ severity: 'success', summary: 'PDF', detail: '' })
        }
        else if (this.pdf != null) {
          this.message.add({ severity: 'success', summary: 'PNG', detail: '' })
        }
        else if (this.pdf == null) {
          this.message.add({ severity: 'success', summary: 'Next', detail: '' })
        }
      }
    }, 0)
  }
  changeAccordion(e: any) {

  }
}