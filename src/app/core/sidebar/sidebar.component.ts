import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../shared/service/common.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
  :host ::ng-deep button {
    margin-right: .25em;
  }
  ::ng-deep .p-component-overlay {
    width: calc(100% - var(--width));
  }
  `]
})

export class SidebarComponent implements OnInit {

  data: any;
  @Input() editRowData: any;
  @Input() visibleSidebar: any;
  @Input() sidebarConfig: any;
  @Input() sidebarJSON: any;
  @Output() sidebarData = new EventEmitter<boolean>;
  @Output() changeEvents = new EventEmitter<boolean>;
  Sidebardata:any
  constructor(private common: CommonService) { }

  ngOnInit(): void {
    // this.handelBackdrop();
    this.Sidebardata=this.sidebarJSON
    this.common.getEditData().subscribe(data => {
      if (data) {
        this.visibleSidebar = data;
      }
    })
  }

  // handelBackdrop() {
  //   if (this.sidebarConfig.sidebar == "p-sidebar-sm") {
  //     document.documentElement.style.setProperty('--width', '20rem');
  //   } else if (this.sidebarConfig.sidebar == "p-sidebar-md") {
  //     document.documentElement.style.setProperty('--width', '40rem');
  //   } else if (this.sidebarConfig.sidebar == "p-sidebar-lg") {
  //     document.documentElement.style.setProperty('--width', '60rem');
  //   } else {
  //     document.documentElement.style.setProperty('--width', '80rem');
  //   }
  // }

  formData(e: any) {
    this.data = e;
  }

  onHide(e: any) {
    this.sidebarData.emit(false);
  }
   
}
