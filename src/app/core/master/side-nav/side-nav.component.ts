import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  Breadcrumbs  from '../../../features/registration-form/breadcrumb.json';

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
  ariaexpanded:boolean = false;
  @Input() toggle: any;
  @Input() masterJSON: any;
  expandCollapse: boolean = true;
  activeStateSubchild: any;

  clickEvent() {
    this.status = !this.status;
    this.ariaexpanded= !this.ariaexpanded
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
  items:any= Breadcrumbs

  constructor(private router: Router) { }

  ngOnInit(): void {
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
  }
  setStateAsActiveSubchild(SubChilditem: any) {
    this.activeStateSubchild = SubChilditem;
  }
  setStateAsActiveChild(childItems: any) {
    this.activeStatechild = childItems;
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
}
