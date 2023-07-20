import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import personalization from "./personalization.json";
import { ThemeService } from '../shared/service/theme.service';
import { MasterService } from '../shared/service/master.service';
import coreMaster from './coreMaster.json'

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  sideNavStatus: boolean = false;
  header: any;
  navbarOpen: boolean = false;
  list: any;
  status: boolean = false;
  statusLink: boolean = false;
  toggle: any;
  personalization: any;
  sidenavData: any[] = [];
  masterJSON = coreMaster;
  notification: any
  data: any;
  @Output() sidenavItem = new EventEmitter<any>();
  constructor(private themeService: ThemeService, private masterSerivice: MasterService) { }

  ngOnInit(): void {
    this.getALLSideNavData();
    this.getAllNotifications()
    localStorage.setItem('personalization', JSON.stringify(personalization));
    this.personalization = personalization;
    this.changeTheme();
    this.list = this.masterJSON.masterData;
  }

  clickEvent(e: any) {
    this.toggle = e;
  }

  toggleNavbar(event: boolean) {
    this.navbarOpen = event;
  }

  changeTheme() {
    this.themeService.switchTheme(this.personalization.theme);
  }

  notificationEvent(e: any) {
    if (e == "readAll") {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i]._Read == false) {
          this.masterSerivice.readMsg(this.data[i].notificationId).subscribe((res) => {
            this.getAllNotifications()
          })
        }
      }
    } else {
      this.masterSerivice.readMsg(e.id).subscribe((res) => {
        this.getAllNotifications()
      })
    }
  }

  sidenavItems(item: any) {
    this.sidenavItem.emit(item)
  }

  getALLSideNavData() {
    this.masterJSON.masterData.sidenavItems = [];
    this.masterSerivice.getAllSideNavData().subscribe((res) => {
      res.sidenavItems.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence));
      this.sidenavData = [];
      res.sidenavItems.forEach((sidenav: any) => {
        this.sidenavData.push(sidenav)
      });
      this.sidenavData.forEach(module => {
        module.group.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence));
        module.group.forEach((group: { submodules: { sequence: number; }[]; }) => {
          group.submodules.sort((a: { sequence: number; }, b: { sequence: number; }) => Number(a.sequence) - Number(b.sequence));
        });
      });
      this.masterJSON.masterData.sidenavItems = this.sidenavData
      this.getAuthorize();

    });
  }

  getAllNotifications() {
    this.masterSerivice.getAllNotifications().subscribe((res) => {
      this.data = res;
      let i = 0;
      for (let a of res) {
        let obj = {
          "id": a.notificationId,
          "title": a.title,
          "msg": a.message,
          "readFlag": a._Read
        };
        this.masterJSON.masterData.header.notification.data[i++] = obj;
      }
    });
    this.masterSerivice.countNotification().subscribe((res) => {
      this.masterJSON.masterData.header.notification.count = res.Count;
    });
  }

  getAuthorize() {
    let allData = [
      {
        "moduleId": 1,
        "label": "Home",
        "icon": "bi bi-house",
        "routerLink": "/master-page/home",
        "sequence": "1",
        "group": []
      },
      {
        "moduleId": 7,
        "label": "OPD",
        "icon": "bi bi-person-up",
        "routerLink": "",
        "sequence": "123",
        "group": [
          {
            "groupId": 23,
            "label": "Quick Patient Reg + Visit",
            "icon": "",
            "routerLink": "/master-page/quick-patient-reg-visit",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 24,
            "label": "queue",
            "icon": "",
            "routerLink": "/master-page/queue",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 25,
            "label": "Appointment",
            "icon": "",
            "routerLink": "/master-page/appointment",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 26,
            "label": "Appointment List ",
            "icon": "",
            "routerLink": "/master-page/appointment-list",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 27,
            "label": "Registration",
            "icon": "",
            "routerLink": "/master-page/registration",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 28,
            "label": "Registration List",
            "icon": "",
            "routerLink": "/master-page/registration-list",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 29,
            "label": "OPD  Visit List",
            "icon": "",
            "routerLink": "/master-page/opd-visit-list",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 30,
            "label": "Feedback Visit List",
            "icon": "",
            "routerLink": "/master-page/feedback-visit-list",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 31,
            "label": "Report",
            "icon": "",
            "routerLink": "",
            "sequence": "1",
            "submodules": [
              {
                "subModuleId": 1,
                "label": "List of Registration Report",
                "icon": "null",
                "routerLink": "/master-page/list-of-registration-report",
                "sequence": "12"
              },
              {
                "subModuleId": 2,
                "label": "list of Visit Report",
                "icon": null,
                "routerLink": "/master-page/list-of-visit-report",
                "sequence": "12"
              },
              {
                "subModuleId": 3,
                "label": "Haspathal Report",
                "icon": null,
                "routerLink": "/master-page/haspathal-report",
                "sequence": "123"
              }
            ]
          }
        ]
      },
      {
        "moduleId": 8,
        "label": "IPD",
        "icon": "bi bi-person-down",
        "routerLink": "",
        "sequence": "1",
        "group": [
          {
            "groupId": 32,
            "label": "IPD Quick Registration",
            "icon": "",
            "routerLink": "/master-page/ipd-quick-registration",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 33,
            "label": "AdmissionRequest ",
            "icon": "",
            "routerLink": "",
            "sequence": "1",
            "submodules": [
              {
                "subModuleId": 4,
                "label": "New Admission Request",
                "icon": null,
                "routerLink": "/master-page/new-admission-request",
                "sequence": "123"
              },
              {
                "subModuleId": 5,
                "label": "List of Admission Request",
                "icon": null,
                "routerLink": "/master-page/list-of-admission-request",
                "sequence": "123"
              }
            ]
          },
          {
            "groupId": 34,
            "label": "AdmissionList",
            "icon": "",
            "routerLink": "",
            "sequence": "1",
            "submodules": [
              {
                "subModuleId": 6,
                "label": "Admission List",
                "icon": null,
                "routerLink": "/master-page/admission-list",
                "sequence": "123"
              },
              {
                "subModuleId": 7,
                "label": "Discharge List",
                "icon": null,
                "routerLink": "/master-page/discharge-list",
                "sequence": "123"
              },
              {
                "subModuleId": 8,
                "label": "Admission Cancel List",
                "icon": null,
                "routerLink": "/master-page/admission-cancel-list",
                "sequence": "123"
              }
            ]
          },
          {
            "groupId": 35,
            "label": "BedManagement",
            "icon": "",
            "routerLink": "",
            "sequence": "1",
            "submodules": [
              {
                "subModuleId": 9,
                "label": "Bed Transfer",
                "icon": null,
                "routerLink": "/master-page/bed-transfer",
                "sequence": "123"
              },
              {
                "subModuleId": 10,
                "label": "Under Maintenance",
                "icon": null,
                "routerLink": "/master-page/under-maintenance",
                "sequence": "123"
              },
              {
                "subModuleId": 11,
                "label": "Graphical View",
                "icon": null,
                "routerLink": "/master-page/graphical-view",
                "sequence": "123"
              }
            ]
          },
          {
            "groupId": 36,
            "label": "Discharge",
            "icon": "",
            "routerLink": "/master-page/discharge",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 37,
            "label": "Discharge Summary",
            "icon": "",
            "routerLink": "/master-page/discharge-summary",
            "sequence": "1",
            "submodules": []
          },
          {
            "groupId": 38,
            "label": "Reports",
            "icon": "",
            "routerLink": "",
            "sequence": "1",
            "submodules": [
              {
                "subModuleId": 12,
                "label": "IPD Addmission Report",
                "icon": null,
                "routerLink": "/master-page/ipd-admission-report",
                "sequence": "123"
              }
            ]
          }
        ]
      }
    ];

    let auth = [
      {
        "moduleId": 1,
        "groupId": 1,
        "subModuleId": null,
        "permission": ""
      },
      {
        "moduleId": 7,
        "groupId": 23,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 24,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 25,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 26,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 27,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 28,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 29,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 30,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 7,
        "groupId": 31,
        "subModuleId": 1,
        "permission": ""
      },
      {
        "moduleId": 7,
        "groupId": 31,
        "subModuleId": 2,
        "permission": ""
      },
      {
        "moduleId": 7,
        "groupId": 31,
        "subModuleId": 3,
        "permission": ""
      },
      {
        "moduleId": 8,
        "groupId": 32,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 33,
        "subModuleId": 4,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 33,
        "subModuleId": 5,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 34,
        "subModuleId": 6,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 34,
        "subModuleId": 7,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 34,
        "subModuleId": 8,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 35,
        "subModuleId": 9,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 35,
        "subModuleId": 10,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 35,
        "subModuleId": 11,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 36,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 37,
        "subModuleId": null,
        "permission": "E"
      },
      {
        "moduleId": 8,
        "groupId": 38,
        "subModuleId": 12,
        "permission": "D",
      },

    ]

    allData = allData.filter(module => {
      const moduleAuth = auth.some(a => a.moduleId == module.moduleId && (a.permission == 'E' || a.permission == ''));
      if (moduleAuth) {
        module.group = module.group.filter(group => {
          const groupAuth = auth.some(a => a.moduleId == module.moduleId && a.groupId == group.groupId && (a.permission == 'E' || a.permission == ''));
          if (groupAuth) {
            group.submodules = group.submodules.filter(submodule =>
              auth.some(a => a.moduleId == module.moduleId && a.groupId == group.groupId && a.subModuleId == submodule.subModuleId && (a.permission == 'E' || a.permission == '')))
          }
          return groupAuth;
        })
        return true;
      }
      return false;
    })
    this.masterJSON.masterData.sidenavItems = allData;
  }

}