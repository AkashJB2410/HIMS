import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { data } from '../shared/objects/data';
// import * as table_config from '../../shared/objects/table_config.json';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

@Component({
  selector: 'app-generictable',
  templateUrl: './generictable.component.html',

})
export class GenerictableComponent implements OnInit {
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

  bulkOpt = [
    { name: 'Bulk Actions', code: '' },
    { name: 'Move to Trash', code: 'NY' },
    { name: 'Excel Export', code: 'NY' },
    { name: 'Some Action', code: 'RM' }
  ];
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

  constructor() { }

  ngOnInit() {
    if (this.tableData == undefined)
      this.tableData = data;

    if (this.config == undefined)
      this.config = this.config;

    this.exportColumns = this.config.tableHeaders.map((config: any) => ({ title: config.header, dataKey: config.field }));
    this.colNames = this.config.tableHeaders
    this.rows = this.config.rows;

    this.pdfName = this.config.tableName
    this._selectedColumns = this.colNames;

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
    const doc = new jsPDF('p', 'pt');
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
    //restore original order
    this._selectedColumns = this.colNames.filter((col: any) => val.includes(col));
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

}

