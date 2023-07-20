import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Vtabs from '../../../core/shared/objects/setting.json';
import { ThemeService } from 'src/app/core/shared/service/theme.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/shared/service/session.service';
import { DecryptPipe } from 'src/app/core/shared/pipes/encrypt-decrypt.pipe';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  verticalTabs: any = Vtabs;
  activeState: any;
  activeList: any;
  Theme: string;
  allFlag = {
    Personalization: true,
    EditForm: false,

  }
  themeOptins: any = []
  @Output() renderComponents = new EventEmitter<any>();
  activeStateButton: any; 
  formatDateVAlue: any;
  formData: Partial<{ dateformat: string; currency: string; }>;
  personalizationData: any;
  ThemePersonalization: any = [];
  logindata: any;
  constructor(private themeService: ThemeService,
    private http: SessionService) { }
  ngAfterViewInit(): void {
    this.activeState = JSON.parse(localStorage.getItem('activeState'))
  }
  ngOnInit(): void {
    this.themeOptins = [
      {
        label: 'Dark theme',
        command: () => this.changeTheme('dark-theme')
      },
      {
        label: 'Light theme',
        command: () => this.changeTheme('light-theme')
      }
    ]
  }
  defaultSelecter(e: Object) {
    let count: number;
    count++;
    if (count > 1) {
      this.render(e);
    }
  }
  restFlag() {
    this.allFlag = {
      Personalization: false,
      EditForm: false,
 

    }
  }
  render(list: any) {
    localStorage.setItem('activeState', list.label);
    this.verticalTabs.tabular.forEach((element: any) => {
      if (list.label == element.label) {
        let li = document.getElementById(list.label);
        li.className = 'design my-1 active';
      } else {
        let li = document.getElementById(element.label);
        li.className = 'design my-1';
      }
      this.defaultSelecter(list);
      switch (list.label) {
        case "Personalization": this.restFlag(); this.allFlag.Personalization = true; break
        case "Profile Details": this.restFlag(); this.allFlag.EditForm = true; break
        default:
          break;
      }
    });
    this.renderComponents.emit(list);
  }
  setActive(items: any) {
    this.activeState = items;
    localStorage.setItem('activeState', JSON.stringify(items));
  }
  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
  setActiveButton(themeOptins: any) {
    this.activeStateButton = themeOptins;
  }
}