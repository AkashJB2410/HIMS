import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { data } from '../shared/objects/data';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-generictable',
  templateUrl: './generictable.component.html',
})

export class GenerictableComponent implements OnInit {
  checked: true
  status: any = false;
  rowObject: any = []
  exportColumns: any;
  showDialog: any
  show: any = false;
  rowData: any = [];
  visibleSidebar: boolean;
  Message = "Are you sure you want to delete ?"
  first = 0;
  rows: any;
  pdfName: any
  colNames: any;
  _selectedColumns: any;
  selectedOptions: any;
  Fdata: any;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  Is_active = true
  contextMenus: any = [
    { "menu": "Edit", "img": "../../../assets/core_assets/edit.png" },
    { "menu": "Duplicate", "img": "../../../assets/core_assets/duplicate.png" },
    { "menu": "Mark as favourite", "img": "../../../assets/core_assets/Starfavourite.png" },
    { "menu": "Remove", "img": "../../../assets/core_assets/bin.png" },
    { "menu": "Properties", "img": "../../../assets/core_assets/tool.png" }
  ]
  radiobutton:any =[];
  chekboxes: any = [];
  @Input() config: any;
  @Input() tableData: any[];
  @Output() onCheckboxClick = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onDeletechecked = new EventEmitter<string>();
  @Output() inlineEdit = new EventEmitter<string>();
  @Output() onAdd = new EventEmitter<string>();
  @Output() onRowClickData = new EventEmitter<string>();
  @Output() isActive = new EventEmitter<string>();
  @Output() OnScannerClick = new EventEmitter<string>();
  @Output() OnEmergencyClick = new EventEmitter<string>();
  @Output() OnIPDclick = new EventEmitter<string>();
  @Output() OnOPDclick = new EventEmitter<string>();
  @Output() OnServiceclick = new EventEmitter<string>();

  constructor(private toast: MessageService) { }
  ngOnInit() {
    // JSON.parse(localStorage.getItem('Selected Column Value'))
    JSON.parse(localStorage.getItem(this.pdfName))
    if (this.tableData == undefined)
      this.tableData = data;

    if (this.config == undefined)
      this.config = this.config;


    this.exportColumns = this.config.tableHeaders.map((config: any) => ({ title: config.header, dataKey: config.field }));
    this.colNames = this.config.tableHeaders

    this.rows = this.config.rows;

    this.pdfName = this.config.tableName;
    if (JSON.parse(localStorage.getItem(this.pdfName)) != null) {
      this._selectedColumns = JSON.parse(localStorage.getItem(this.pdfName))
    }
    else {
      this._selectedColumns = this.colNames
    }

  
  }

  onrightClick(event: any, rowdata: any) {
    // this.contextmenuX = event.pageX - 245;
    // this.contextmenuY = event.pageY - 40;
    this.rowData = rowdata;
    this.contextmenuX = event.pageX;
    this.contextmenuY = event.pageY;
    this.contextmenu = true;
  }

  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }

  rightClick(list: any) {
    this.disableContextMenu();
    alert(JSON.stringify(this.rowData));
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.tableData ? this.first === (this.tableData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.tableData ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  editProduct(row: any) {
    this.rowData = row
    this.visibleSidebar = true;
    this.onEdit.emit(this.rowData);
  }

  AddNewProduct(row: any) {
    this.status = true
    this.rowData = row
    this.visibleSidebar = true;
    this.onAdd.emit(this.rowData);
  }

  ondelete(row: any) {
    this.show = true;
    this.rowData = row;
    this.onDelete.emit(this.rowData);
  }

  ondeletechecked() {
    this.onDeletechecked.emit(this.chekboxes)
  }

  editT(row: any) {
    this.inlineEdit.emit(row);
  }

  exportExcel(): void {
    if (this.chekboxes.length == 0) {
      var ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData);
    } else {
      var ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.chekboxes);
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.config.tableName + '.xlsx');
  }

  checkBoxClick(event: any) {
    this.rowObject.push(event);
    this.onCheckboxClick.emit(this.rowObject);
  }

  exportPdf() {
    this.exportColumns,
      this._selectedColumns;
    const doc = new jsPDF('p', 'pt', 'a2');
    if (this.chekboxes.length == 0) {
      (doc as any)['autoTable'](this.exportColumns, this.tableData);
    } else {
      (doc as any)['autoTable'](this.exportColumns, this.chekboxes);
    }
    doc.save(this.pdfName + ".pdf");
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;

  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.colNames.filter((col: any) => val.includes(col),
    );
    // localStorage.setItem("Selected Column Value",JSON.stringify(this._selectedColumns))
    localStorage.setItem(this.pdfName, JSON.stringify(this._selectedColumns))
  }

  onRowClick(row_Data: any) {
    this.onRowClickData.emit(row_Data);
  }

  bulkAction() {
    console.log(this.chekboxes);
  }

  getColor(row: any) {
    let color = "";
    if (this.config.getColors) {
      this.config.getColors.forEach((element: any) => {
        if (element.status == row && row != undefined) {
          color = element.color;
        }
      });
    }
    return color;
  }

  active(event: any, e: any) {
    this.isActive.emit(e);
    if (event.target.checked)
      this.enable(e);
    else
      this.disable(e)
  }

  disable(row: any) {
    (document.getElementById("abc" + row.id) as HTMLButtonElement).disabled = true;
  }
  enable(row: any) {
    (document.getElementById("abc" + row.id) as HTMLButtonElement).disabled = false;
  }

  ScannerClick(event: any, e: any) {
    this.OnScannerClick.emit(e);
  }
  emergencyClick(event: any, e: any) {
    this.OnEmergencyClick.emit(e);
  }
  IPDclick(event: any, e: any) {
    this.OnIPDclick.emit(e);
  }
  OPDclick(event: any, e: any) {
    this.OnOPDclick.emit(e);
  }
  serviceClick(event: any, e: any) {
    this.OnServiceclick.emit(e);
  }
}

