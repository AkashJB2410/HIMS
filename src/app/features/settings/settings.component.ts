import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Vtabs from '../../core/shared/objects/setting.json';
import { ThemeService } from 'src/app/core/shared/service/theme.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/shared/service/session.service';

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
    theme: true,
    language: false,
    currency: false,
    dateFormat: false
  }
  themeOptins: any = []
  @Output() renderComponents = new EventEmitter<any>();
  activeStateButton: any;
  dateFormats: any = []
  Currency: any = []
  formatDate: any;
  ForCurrency: any;
  ForThemes:any;
  formatDateVAlue: any;
  form = new FormGroup({
    dateformat: new FormControl(''),
    currency: new FormControl(''),
    themes: new FormControl('')

  });
  formData: Partial<{ dateformat: string; currency: string; }>;
  personalizationData: any;
  ThemePersonalization: any =[];
  constructor(private themeService: ThemeService,
    private http: SessionService) { }
  ngAfterViewInit(): void {
    this.activeState = JSON.parse(localStorage.getItem('activeState'))
  }
  ngOnInit(): void {
    this.dateFormats = [
      { name: 'Select date', value: 'select-date' },
      { name: 'Short Date', value: 'M/d/yy' },
      { name: 'Medium Date', value: 'MMM d, y' },
      { name: 'Long Date', value: 'MMMM d, y' },
      { name: 'Full Date', value: 'EEEE, MMMM d, y' },

    ]
    this.Currency = [
      { name: 'Select currency', value: 'select-currency' },
      { name: 'INR', value: 'INR' },
      { name: 'CAD', value: 'CAD' },
      { name: 'USD', value: 'USD' },
      { name: 'EUR', value: 'EUR' },

    ],
    this.ThemePersonalization = [
      { name: 'Select theme', value: 'select-theme' },
      { name: 'Light theme', value: 'light-theme' },
      { name: 'Dark theme', value: 'dark-theme' },
    ]
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
      theme: false,
      language: false,
      currency: false,
      dateFormat: false

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
        case "Themes": this.restFlag(); this.allFlag.theme = true; break
        case "Personalization": this.restFlag(); this.allFlag.language = true; break
        case "Currency": this.restFlag(); this.allFlag.currency = true; break
        case "Date Format": this.restFlag(); this.allFlag.dateFormat = true; break
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
  onSubmit() {
    this.http.addPersonalization(this.form.value.dateformat,this.form.value.currency,this.form.value.themes)
      .subscribe(data => {
        this.personalizationData = data
      });
  }

}