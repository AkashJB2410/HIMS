import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() sidebarJSON: any;

  @Output() sidebarData = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit(): void {
    if (this.sidebarJSON.form.sidebar == "p-sidebar-sm") {
      document.documentElement.style.setProperty('--width', '20rem');
    } else if (this.sidebarJSON.form.sidebar == "p-sidebar-md") {
      document.documentElement.style.setProperty('--width', '40rem');
    } else {
      document.documentElement.style.setProperty('--width', '60rem');
    }
  }

  formData(e: any) {
    this.data = e;
  }
  onHide(e: any) {
  this.sidebarData.emit(e);
  }

  buttonEvent(e: any) {
    if (e == 'save') {
      this.sidebarData.emit(this.data);
    } else {
      this.sidebarData.emit(e);
    }
  }
}
