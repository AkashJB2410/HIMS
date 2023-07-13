import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  arrowShow: boolean = true;
  status: boolean = false;
  statusLink: boolean = false;
  open: boolean = true
  collapse: boolean = false
  node: any
  ariaexpanded: boolean = false;
  @Input() toggle: any;
  @Input() masterJSON: any;
  @Output() notification = new EventEmitter<any>();
  @Output() sidenavItem = new EventEmitter<any>();
  expandCollapse: boolean = true;
  activeStateSubchild: any;
  LastLoginTimeDate: any

  clickEvent() {
    this.status = !this.status;
    this.ariaexpanded = !this.ariaexpanded
    if (this.statusLink) {
      setTimeout(() => {
        this.statusLink = false;
      }, 230);
    } else {
      this.statusLink = true;
    }
  }

  public sidebarShow: boolean = false;
  navbarOpen = false;
  list: any;
  theme: any;
  userDetails: any;
  header: { title: string; logo: string; };
  activeState: any
  activeStatechild: any
  lastLogin: any
  constructor(private router: Router,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.lastLogin = localStorage.getItem("loggedIn")
    this.LastLoginTimeDate = this.datepipe.transform(this.lastLogin, 'MMMM d, y h:mm a	');
    this.list = this.masterJSON.masterData;
  }

  toggleNavbar(event: boolean) {
    this.navbarOpen = event;
  }

  logOut() {
    sessionStorage.clear()
    this.router.navigateByUrl('login')
  }

  setStateAsActive(item: any) {
    this.activeState = item;
    this.emitSidenaClick(item);

  }
  setStateAsActiveSubchild(SubChilditem: any) {
    this.activeStateSubchild = SubChilditem;
    this.emitSidenaClick(SubChilditem);
  }
  setStateAsActiveChild(childItems: any) {
    this.activeStatechild = childItems;
    this.emitSidenaClick(childItems);
  }
  // arrowToggle(item: any) {
  //   this.arrowShow = true;
  //   this.expandCollapse = !this.expandCollapse;
  //   if (!this.expandCollapse) {
  //     document.getElementById(item.label).className = "pi pi-angle-up downarrow";
  //     this.expandCollapse = true;
  //     this.arrowShow = false;
  //   } 
  // }
  notificationEvent(e: any) {
    this.notification.emit(e)
  }
  emitSidenaClick(items: any) {
    this.sidenavItem.emit(items)
  }
}
