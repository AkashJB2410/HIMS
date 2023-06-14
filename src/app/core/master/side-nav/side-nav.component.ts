import { Component, Input, OnInit } from '@angular/core';
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
  ariaexpanded:boolean = false;
  @Input() toggle: any;
  @Input() masterJSON: any;
  expandCollapse: boolean = true;
  activeStateSubchild: any;
  home: { icon: string; };

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
  items: { label: string ,icon:string, routerLink: string}[];


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.list = this.masterJSON.masterData;
    this.items = [
      {label: 'Dashboard', icon: 'pi pi-home', routerLink: '/master-page/dashboard'},
      {label: 'Tabular Form',icon: 'pi pi-home', routerLink: '/master-page/user-management'},
      {label: 'Cards', icon: 'pi pi-home', routerLink: '/master-page/card-demo'},
      {label: 'Vertical Tabular', icon: 'pi pi-home' ,routerLink: '/master-page/worklist'}
  ];
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
