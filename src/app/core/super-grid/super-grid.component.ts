import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-super-grid',
  templateUrl: './super-grid.component.html',
  styleUrls: ['./super-grid.component.css']
})
export class SuperGridComponent implements OnInit {

  toast: any = {};
  showToast: any;
  show: any = false;
  Message: any;
  data: any[];
  config: any;
  visibleSidebar: boolean = false;
  filterData: any;
  editRowData: any;
  deleteRowData: any;
  bulkdelete:any
  @Input() configurations: any;
  @Input() tableConfig: any;
  @Input() tableData: any;
  @Input() filterJSON: any;
  @Input() sidebarJSON: any;

  @Output() sideBarEvent = new EventEmitter;
  @Output() confirmAction = new EventEmitter;
  @Output() fiteredData = new EventEmitter;
  @Output() inlineEdit = new EventEmitter;
  @Output() rowClickData = new EventEmitter;
  @Output() Bulkdelete = new EventEmitter;

  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.config = this.tableConfig;
    this.data = this.tableData;
    this.filterData = this.filterJSON
  }

  deleteRow(e: any) {
    this.deleteRowData = e;
    this.GetConfirm()
  }

  BulkdeleteRow(e: any) {
    this.bulkdelete = e
    this.show = true;
    this.GetConfirm()
  }

  editRow(e: any) {
    this.editRowData = e;
    this.visibleSidebar = true
  }

  addRow(e: any) {
    this.editRowData = e;
    this.visibleSidebar = true
  }

  confirm(e: any) {
    if (e == true) {
      this.confirmAction.emit(this.deleteRowData);
    }
    this.show = false;
  }

  sidebarData(e: any) {
    document.documentElement.style.setProperty('--width', '0rem');
    if (Object.keys(e).length != 0) {
      this.visibleSidebar = false;
      this.sideBarEvent.emit(e);
    } else {
      this.visibleSidebar = false;
    }
  }

  selectedData(fiteredData: any) {
    this.fiteredData.emit(fiteredData);
  }

  inlineedit(e: any) {
    this.inlineEdit.emit(e);
  }

  onRowClick(e: any) {
    this.rowClickData.emit(e);
  }

  GetConfirm() {
    this.confirmationService.confirm({
      header: 'Are you sure that you want to proceed?',
      accept: () => {
        this.confirmAction.emit(this.deleteRowData);
        this.Bulkdelete.emit(this.bulkdelete);

      },
      reject: () => {
        this.confirmAction.emit(false);
      }
    });
  }
  fitereddata(e: any) {
    this.fiteredData.emit(e);
  }

}