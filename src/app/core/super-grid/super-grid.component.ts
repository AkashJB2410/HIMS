import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-super-grid',
  templateUrl: './super-grid.component.html',
  styleUrls: ['./super-grid.component.css']
})
export class SuperGridComponent implements OnInit {
  show: any = false;
  data: any[];
  config: any;
  filterData: any;
  deleteRowData: any;
  bulkdelete: any;
  isActiveData: any;
  visibleSidebar: boolean = false;
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
    document.documentElement.style.setProperty('--width', '0rem');
    this.GetConfirm()
  }

  BulkdeleteRow(e: any) {
    this.bulkdelete = e
    this.show = true;
    document.documentElement.style.setProperty('--width', '0rem');
    this.GetConfirm()
  }

  editRow(editRow: any) {
    this.handelBackdrop();
    this.visibleSidebar = true;
    let edit = "edit";
    this.onEdit.emit({editRow, edit});
  }
  
  isactive(e: any) {
    this.isActiveData = e;
    this.isActive.emit(e);
  }
  
  addRow(addRow: any) {
    this.handelBackdrop();
    this.visibleSidebar = true;
    let add = "add";
    this.onAdd.emit({addRow, add});
  }

  confirm(e: any) {
    if (e == true) {
      this.confirmAction.emit(this.deleteRowData);
    }
    this.show = false;
  }

  sidebarData(e: any) {
    this.visibleSidebar = e;
    this.sideBarEvent.emit(e);
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
  handelBackdrop() {
    if (this.config.sidebar == "p-sidebar-sm") {
      document.documentElement.style.setProperty('--width', '20rem');
    } else if (this.config.sidebar == "p-sidebar-md") {
      document.documentElement.style.setProperty('--width', '40rem');
    } else if (this.config.sidebar == "p-sidebar-lg") {
      document.documentElement.style.setProperty('--width', '60rem');
    } else {
      document.documentElement.style.setProperty('--width', '80rem');
    }
  }

}