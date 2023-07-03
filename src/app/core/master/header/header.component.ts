import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DecryptPipe } from '../../shared/pipes/encrypt-decrypt.pipe';
import { ThemeService } from '../../shared/service/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  toggle: boolean = true;
  list: any;
  theme: any;
  userDetails: any;
  headerData: any
  themeOptins: any[];
  Information: any[];
  selectedTheme: any;
  show = false;
  @Input() headerInput: any;
  @Output() navToggle = new EventEmitter<boolean>();
  @Output() notification = new EventEmitter<boolean>();

  constructor(private themeService: ThemeService, private decrypt: DecryptPipe, private router: Router,
    private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.list = this.headerInput;
    this.userDetails = JSON.parse(this.decrypt.transform(sessionStorage.getItem('loggedUser')));
    this.headerData = this.list.header
    this.themeOptins = [
      {
        label: '',
        icon: 'bi bi-gear ',
        class: 'headerIcon1',
        items: [
          {
            label: 'Theme',
            items: [
              {
                label: 'Dark theme',
                theme: 'dark-theme',
                command: () => this.changeTheme('dark-theme')
              },
              {
                label: 'Light theme',
                theme: 'light-theme',
                command: () => this.changeTheme('light-theme')
              }
            ]
          }
        ]
      }]
    this.Information = [
      {
        label: '',
        icon: 'bi bi-info-circle ',
        class: 'headerIcon1',
        items: [
          {
            label: 'Traning ',
            items: [
              {
                label: 'Traning ',
                theme: 'dark-theme',
              },
              {
                label: 'Traning Videos',
                theme: 'light-theme',
              }
            ],
          }, {
            label: 'Traning',
            items: [
              {
                label: 'Traning',
                theme: 'dark-theme',
              },
              {
                label: 'Traning Video',
                theme: 'light-theme',
                items: [
                  {
                    label: 'Traning ',
                    theme: 'dark-theme',
                  },
                  {
                    label: 'Traning ',
                    theme: 'light-theme',
                  }
                ],
              }
            ],
          }
        ]
      }]
    
    // setTimeout(() => {
    //   let a = document.getElementsByClassName('goog-te-combo')[0] as HTMLSelectElement;
    //   a.options[0].value = "hi";
    // }, 3000);
  }

  ngAfterViewInit() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    this.elementRef.nativeElement.appendChild(s);
  }

  toggleNavbar() {
    this.toggle = !this.toggle;
    this.navToggle.emit(this.toggle);
  }

  logOut() {
    sessionStorage.clear()
    this.router.navigateByUrl('login')
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  notificationEvent(e: any) {
    this.notification.emit(e);
  }

  profile(e: any) {
  }
  
  setting(){
    this.router.navigateByUrl('/master-page/settings');
  }
}