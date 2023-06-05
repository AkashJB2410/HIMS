import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tabular-forms',
  templateUrl: './tabular-forms.component.html',
  styleUrls: ['./tabular-forms.component.css']
})
export class TabularFormsComponent implements OnInit {

  tabularData: any
  config: any;
  formData: any;
  index: any = 0
  activeIndex: any = 0;
  StoredData: any = [];
  data: any;
  map = new Map<string, string>();

  @Input() tabularJSON: any;
  @Input() tableConfigJSON: any;
  @Input() configurations: any;
  @Input() sidebarJSON: any;
  @Input() tableData:any;
  @Input() filterData:any;
  @Output() tabularEmitData = new EventEmitter<any>();
  @Output() confirmActionData = new EventEmitter<any>();
  @Output() dataSidebar = new EventEmitter<any>();
  @Output() dataFitered = new EventEmitter<any>();
  @Output() changeEvents = new EventEmitter<any>();
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.tabularData = this.tabularJSON.tabular;
    this.config = this.tableConfigJSON;
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
  }
  buttonClick(e: any) {
    if (e == 'submit') {
      this.show()
      this.map.get(this.formData)
    }
  }
  tabularValue(event: any) {
    this.data = event;
    this.tabularEmitData.emit(this.data);
  }
  changeEvent(e:any){
    this.changeEvents.emit(e);
  }
  confirmAction(e: any) {
    // this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    this.confirmActionData.emit(e);
  }
  sidebarData(e: any) {
    console.log("From User Management ==> ", e)
    this.dataSidebar.emit(e);
  }

  fiteredData(e: any) {
    this.dataFitered.emit(e);
    // this.data = undefined;
  }
}

