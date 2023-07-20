import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlTypes, IFormField } from './form.interface';
import { CustomDatePipe } from '../shared/pipes/custom-date.pipe';
import { FormService } from '../shared/service/form.service';
import { Observable, Subscriber, elementAt, observable } from 'rxjs';
import { async, file } from '@rxweb/reactive-form-validators';
import { img } from './base64Image';
import { Base64Converter } from "../shared/objects/base64converter";
import { Base64ConverterService } from '../shared/service/base64-converter.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})

export class FormComponent implements OnInit {
  [x: string]: any;
  form: FormGroup;
  formControls: IFormField[] = [];
  formJson: any;
  group: any = {};
  data: any = [];
  formButtons: any;
  format: any;
  dateFormat: any;
  date = new Date();
  base1 = img;
  events: any = [];
  astreik = false;
  regex: Array<string> = ['int', 'num', 'alpha', 'alphanum'];
  formValid: boolean = false;
  primeNgComponents: Array<string> = ['month', 'select', 'radio', 'checkbox', 'date', 'dateRange', 'password'];
  displayModal: any;
  @Input() formJSON: any;
  @Input() editData: any;
  @Output() formData = new EventEmitter<any>();
  @Output() btnEvent = new EventEmitter<any>();
  @Output() changeEvents = new EventEmitter<any>();
  formStaticText: typeof FormControlTypes;
  pipename: CustomDatePipe;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe, public customDate: CustomDatePipe, private form$: FormService, private base64: Base64ConverterService) { }

  ngOnInit(): void {
    this.formJson = this.formJSON.form;
    this.form = this.formBuilder.group({});
    this.setForm();
    this.formStaticText = FormControlTypes;
    this.pipename = this.customDate;
    this.form$.renderNewForm.subscribe(data => {
      this.renderForm(data);
    });
    this.form$.openModal.subscribe(data => {
      this.showModal(data);
    });
  }

  catpchaValue(value: any, control: any) {
    var ctrl = this.form.get(control.fieldName);
    ctrl.setValue(value);
  }

  confirmPassword(value: any, control: any) {
    var ctrl = this.form.get(control.fieldName);
    ctrl.setValue(value);
  }

  onFilesUpload(event: any, id: any) {
    id.fieldValue = event.target.files;
  }

  changeEvent(event: any, data: any) {
    this.events = [];
    if (event.checked != undefined && event.checked[0] == '')
      event.checked.shift();
    this.events.push(event);
    this.events.push(data);
    this.events.push(this.form.getRawValue());
    this.changeEvents.emit(this.events);
  }

  blurValue(event: any, data: any) {
    this.events = [];
    this.events.push(event.value);
    this.events.push(data);
    this.events.push(this.form.getRawValue());
    this.changeEvents.emit(this.events);
  }

  dependentDrop(value: any, control: any) {
    var ctrl = this.form.get(control.fieldName);
    ctrl.setValue(value);
    this.events = [];
    this.events.push(control);
    this.events.push(value);
    this.events.push(this.form.getRawValue());
    this.changeEvents.emit(this.events);
  }

  renderForm(data: any) {
    if (data.funtonality == 'isVisible') {
      this.visibility(data);
      // this.addControl(data);
    } else if (data.funtonality == 'isEditable') {
      this.enableDisableElement(data);
    } else if (data.funtonality == 'autofill') {
      this.setData(data);
    } else if (data.funtonality == 'resetControl') {
      this.resetControl(data);
    } else if (data.funtonality == 'validations') {
      this.addValidations(data);
    }
  }
  showModal(data: any) {
    this.displayModal = data;
  }

  resetControl(data: any) {
    this.form.controls[data.formData.formControlName].reset();
  }

  setData(data: any) {
    var ctrl = this.form.get(data.formData.formControlName);
    this.form.controls[data.formData.formControlName].setValue(data.value);
  }

  enableDisableElement(data: any) {
    let ctrl = this.form.get(data.formData.formControlName);
    if (data.formData.type != 'button') {
      if (data.value) {
        ctrl.enable();
        let element = document.getElementById(data.formData.formControlName)
        if (data.formData.type == "date" || data.formData.type == "dateRange") {
          element.className = "p-inputtext p-component";
        } else {
          element.className = "input-box"
        }
      } else {
        ctrl.disable();
      }
    } else {
      let btn = document.getElementById(data.formData.formControlName) as HTMLButtonElement;
      btn.disabled = !data.value;
    }
  }

  visibility(data: any) {
    if (data.value) {
      document.getElementById("id" + data.formData.formControlName).style.display = "block";
    } else {
      document.getElementById("id" + data.formData.formControlName).style.display = "none";
    }
  }

  addValidations(data: any) {
    let ctrl = this.form.get(data.formData.formControlName);
    if (data.value.required && data.value.pattern != "") {
      ctrl.addValidators([Validators.required, Validators.pattern(data.value.pattern)]);
    } else {
      ctrl.addValidators(Validators.pattern(data.value.pattern));
    }
  }

  addControl(data: any) {
    this.form.get(data.formData.formControlName)
    this.form.addControl('nationality', this.formBuilder.control('genderDrop', [Validators.required]));
    // ctrl.addControl(data.formData.formControlName, this.group);
  }

  ngOnDestroy() {
    this.formJson = [];
    this.form.reset();
  }

  setForm() {
    if (this.editData) {
      for (const key in this.editData) {
        if (this.editData.hasOwnProperty(key)) {
          this.data.push(this.editData[key]);
        }
      }
    }
    let controls = this.formJSON.form.formControls;
    controls.forEach((control: any, i: any) => {
      // if (control.validations != undefined) {
      //   if (!this.regex.includes(control.validations.pattern) && control.validations.pattern != "") {
      //     const pattern: RegExp = control.validations.pattern;
      //     control.validations.pattern = pattern;
      //   }
      // }
      let ctrl = <IFormField>{
        label: control.label || '',
        fieldName: control.formControlName || '',
        fieldType: control.type || '',
        inputType: control.inputType || '',
        placeholder: control.placeholder || '',
        editable: control.isEditable || '',
        class: control.class || '',
        lblclass: control.lblclass || '',
        valueclass: control.valueclass || '',
        message: control.message || '',
        values: control.values || '',
        validations: control.validations || '',
        data: control.data || '',
        visible: control.isVisible || '',
        format: control.format || '',
        subtype: control.subtype || '',
        icon: control.icon || '',
        isDisabled: control.isDisabled || '',
        btnLabel: control.btnLabel || '',
        fieldValue: (control.defaultValue != undefined) ? control.defaultValue : this.data[i],
        row: control.row || '',
        icons: control.icons || '',
        transient: control.transient || false,
        limit: control.limit || '',
        maxlength: control.maxlength || '',
        minlength: control.minlength || '',
      };
      this.formControls.push(ctrl);
    });
    this.formValidation();
    this.form = new FormGroup(this.group);
  }

  btnClick(event: any) {
    if (event == 'cancel') {
      this.btnEvent.emit(event);
    } else if (event == 'reset') {
      this.btnEvent.emit(event);
      this.form.reset();
    } else {
      this.checkValidations(event);
    }
  }

  checkValidations(event: any) {
    if (this.form.valid) {
      this.formValid = false;
      let formValue = this.form.getRawValue();
      this.formControls.forEach((element) => {
        if (element.transient) {
          // delete this.form.value[element.fieldName];
          delete formValue[element.fieldName];
        }
        if (element.fieldType == 'date') {
          var format = JSON.parse(localStorage.getItem('personalization'));
          this.form.value[element.fieldName] = this.datepipe.transform(
            element.fieldValue,
            format.dateFormat
          );
        }
        if (element.fieldType == 'dependentdropdown') {
          if (element.values.length == 2) {
            if (this.form.value[element.fieldName] != "" && this.form.value[element.fieldName][1].length == 0) {
              this.form.controls[element.fieldName].setErrors({ 'required': true });
            } else {
              let obj1 = element.values[0].values.filter((ele: any) => { if (ele.code == formValue[element.fieldName][0]) { return ele } });
              formValue[element.fieldName][0] = obj1[0];
              let obj2 = element.values[1].values.filter((ele: any) => { if (ele.code == formValue[element.fieldName][1]) { return ele } });
              formValue[element.fieldName][1] = obj2[0];
            }
          } else if (element.values.length == 3) {
            if (this.form.value[element.fieldName] != "" && this.form.value[element.fieldName][1].length == 0 || this.form.value[element.fieldName][2].length == 0) {
              this.form.controls[element.fieldName].setErrors({ 'required': true });
            }
          }
        }
        if (element.fieldType == 'select') {
          let obj = element.values.filter((ele: any) => { if (ele.code == element.fieldValue) { return ele } });
          formValue[element.fieldName] = obj[0];
        }
      });
      formValue.formId = this.formJson.formId ? this.formJson.formId : ""
      this.formData.emit(formValue);
      this.btnEvent.emit(event);
      // this.form.reset();
    } else {
      this.formValid = true;
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  formValidation() {
    for (var field of this.formControls) {
      if (field.editable && field.validations.required && field.validations.pattern != '') {
        this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, },
          [
            Validators.required,
            Validators.pattern(field.validations.pattern)
          ]);
      } else if (field.editable && field.validations.pattern) {
        this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, },
          [
            Validators.pattern(field.validations.pattern)
          ]);
      } else if (field.editable && field.validations.required) {
        this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, },
          [
            Validators.required,
          ]);
      } else {
        this.group[field.fieldName] = new FormControl({ value: field.fieldValue || '', disabled: !field.editable, });
      }
    }
  }
}
