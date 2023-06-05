import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [`
  :host ::ng-deep .p-component-overlay {
    width: 100%;
  }
`]
})
export class FilterComponent implements OnInit {
  isPopup: boolean = false;
  flag: boolean = true;
  @Input() filterData: any;
  @Output() selectedData = new EventEmitter<any>();
  filterdata: any;
  data: any;
  editData: any;
  displayModal: boolean;
  FData: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private mess: MessageService
  ) {
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.setupPopup();
  }

  setupPopup() {
    localStorage.setItem('filterData', JSON.stringify(this.filterData));
    localStorage.setItem('newFilterData', JSON.stringify(this.filterData));
    this.FData = JSON.parse(localStorage.getItem('filterData'));
    var a: any = [];
    let editdata: any = {};
    this.FData.form.formControls.forEach((element: any) => {
      if (element.type != 'button' && element.type != 'icon') {
        let obj = {
          isEditable: true,
          isVisible: true,
          label: '',
          type: 'checkbox',
          inputType: 'checkbox',
          class: 'col-md-6 my-1',
          placeholder: '',
          value: '',
          formControlName: element.formControlName,
          message: {},
          values: [
            {
              name: element.label,
              code: element.label,
            },
          ],
          validations: {
            required: false,
            pattern: '',
          },
        };
        a.push(obj);
      }
      if (element.isVisible) {
        editdata[element.label] = [element.label];
      }
    });

    let btn1 = {
      isEditable: true,
      isVisible: true,
      type: 'button',
      subtype: 'submit',
      btnLabel: 'Add Filter',
      class: 'col-md-6 ',
      valueclass: "butn-custom-prmry",
      icon: '',
      isDisabled: false,
      formControlName: '',
      validations: {
        required: false,
        pattern: '',
      },
    };

    let btn2 = {
      isEditable: true,
      isVisible: true,
      type: 'button',
      subtype: 'cancle',
      btnLabel: 'Close',
      class: 'col-md-6 ',
      valueclass: "butn-custom-orange",
      icon: '',
      isDisabled: false,
      formControlName: '',
      validations: {
        required: false,
        pattern: '',
      },
    };
    this.FData.form.formControls = a;
    this.FData.form.formControls.push(btn1);
    this.FData.form.formControls.push(btn2);
    this.editData = editdata;
    localStorage.setItem('editData', '');
    this.filterData = JSON.parse(localStorage.getItem('filterData'));
  }

  formData(e: any) {
    this.filterdata = e;
  }

  btnEvent(e: any) {
    if (e == 'search') {
      this.selectedData.emit(this.filterdata);
    } else if (e == 'reset') {
      this.filterData = JSON.parse(localStorage.getItem('filterData'));
    } else if (e == 'openFilter') {
      this.displayModal = true;
      this.filterData = undefined;
      let data = JSON.parse(localStorage.getItem('newFilterData'));
      if (data != null) {
        this.data = data;
      }
      this.isPopup = this.flag;
    } else {
      this.displayModal = true;
      this.filterData = undefined;
      let data = JSON.parse(localStorage.getItem('newFilterData'));
      if (data != null) {
        this.data = data;
      }
      this.isPopup = this.flag;
    }
  }

  close() {
    this.filterData = JSON.parse(localStorage.getItem('newFilterData'));
    this.displayModal = false;
  }

  response(e: any) {
    let i = 0;
    let data = JSON.parse(localStorage.getItem('filterData'));
    if (e.value === "") {
      console.log('hello')
    }
    for (const key in e) {
      if (e[key] == data.form.formControls[i].label) {
        data.form.formControls[i].isVisible = true;
      } else {
        if (key != '') {
          data.form.formControls[i].isVisible = false;
        }
      }
      i++;
    }
    localStorage.setItem('newFilterData', JSON.stringify(data));
    this.filterData = data;
    localStorage.setItem('editData', JSON.stringify(e));
    this.displayModal = false;
  }
}
