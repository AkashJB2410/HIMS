import { TagContentType } from '@angular/compiler';
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
  selectedTheme: any;

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
    ];
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

}
