import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlTypes, IFormField } from './form.interface';
import { CustomDatePipe } from '../shared/service/custom-date.pipe';
import { FormService } from '../shared/service/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})

export class FormComponent implements OnInit {
  form: FormGroup;
  formControls: IFormField[] = [];
  formJson: any;
  group: any = {};
  data: any = [];
  formButtons: any;
  format: any;
  dateFormat: any;
  date = new Date();
  events: any = [];
  regex: Array<string> = ['int', 'num', 'alpha', 'alphanum'];
  formValid: boolean = false;
  primeNgComponents: Array<string> = ['month', 'select', 'radio', 'checkbox', 'date', 'dateRange', 'password'];
  @Input() formJSON: any;
  @Input() editData: any;
  @Output() formData = new EventEmitter<any>();
  @Output() btnEvent = new EventEmitter<any>();
  @Output() changeEvents = new EventEmitter<any>();
  formStaticText: typeof FormControlTypes;
  pipename: CustomDatePipe;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe, public customDate: CustomDatePipe, private form$: FormService) { }

  ngOnInit(): void {
    this.formJson = this.formJSON.form;
    this.form = this.formBuilder.group({});
    this.setForm();
    this.formStaticText = FormControlTypes;
    this.pipename = this.customDate;
    this.form$.renderNewForm.subscribe(data => {
      this.renderForm(data);
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

  onImageUpload(event: any, id: any) {
    id.fieldValue = event.target.files[0];
  }

  onFilesUpload(event: any, id: any) {
    id.fieldValue = event.target.files;
  }

  changeEvent(event: any, data: any) {
    this.events = [];
    this.events.push(event);
    this.events.push(data);
    this.changeEvents.emit(this.events);
  }

  dependentDrop(value: any, control: any) {
    var ctrl = this.form.get(control.fieldName);
    ctrl.setValue(value);
  }

  renderForm(data: any) {
    if (data.funtonality == 'isVisible') {
      this.visibility(data);
    } else if (data.funtonality == 'isEditable') {
      this.enableDisableElement(data);
    } else if (data.funtonality == 'autofill') {
      this.setData(data);
    } else if (data.funtonality == 'resetControl') {
      this.resetControl(data);
    }
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
        document.getElementById(data.formData.formControlName)
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
      if (control.validations != undefined) {
        if (!this.regex.includes(control.validations.pattern) && control.validations.pattern != "") {
          const noSpecial: RegExp = /^[14]+$/
          control.validations.pattern = noSpecial;
        }
      }
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
        fieldValue: this.data[i] || '',
        row: control.row || '',
        icons: control.icons || '',
        transient: control.transient || false,
        limit: control.limit || '',
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
      this.formControls.forEach((element) => {
        if (element.transient) {
          delete this.form.value[element.fieldName];
        }
        if (element.fieldType == 'date') {
          this.form.value[element.fieldName] = this.datepipe.transform(
            element.fieldValue,
            element.format
          );
        }
      });
      this.formData.emit(this.form.value);
      this.btnEvent.emit(event);
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
