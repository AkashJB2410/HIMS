import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

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
  bulkdelete: any;
  isActiveData: any;
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
  @Output() isActive = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() changeEvents = new EventEmitter<any>();

  constructor(private confirmationService: ConfirmationService) { }

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
    let edit = "edit"
    this.onEdit.emit("edit");
    this.visibleSidebar = true
  }
  isactive(e: any) {
    this.isActiveData = e;
    this.isActive.emit(e);
  }
  addRow(e: any) {
    this.editRowData = e;
    let add = "add"
    this.onAdd.emit("add");
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

  changeEvent(event: any){
    this.changeEvents.emit(event);
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