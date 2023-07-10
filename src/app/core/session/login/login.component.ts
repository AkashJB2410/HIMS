import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../shared/service/session.service';
import { DecryptPipe, EncryptPipe } from '../../shared/pipes/encrypt-decrypt.pipe';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import login from './login.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm: any;
  loginFormData = login;
  orgList: any = [];
  tabularData: any;
  display: any;
  public timerInterval: any;
  timerFlag = false;
  timerFlag2 = false;
  attempts: any = 1;
  constructor(private router: Router,
    private messageService: MessageService,
    private http: SessionService,
    private encrypt: EncryptPipe,
    private decrypt: DecryptPipe) { }

  ngOnInit() {
    // localStorage.clear();
    sessionStorage.clear();
    let email = (localStorage.getItem("email") != "") ? localStorage.getItem("email") : "";
    let password = (localStorage.getItem("password") != "") ? localStorage.getItem("password") : "";
    let organization = (localStorage.getItem("organization") != "") ? localStorage.getItem("organization") : "";
    this.loginForm = new FormGroup({
      emailId: new FormControl(email, [Validators.required]),
      password: new FormControl(password, [Validators.required]),
      organisation: new FormControl({
        "organization_Id": "",
        "organization_Type": "Select an option"
      }, [Validators.required]),
      captcha: new FormControl('', [Validators.required])
    });
  }
  getEmail(e: any) {
    const email = e.value
  }
  getOrganiszation(e: any) {
    this.http.orgData(e.value)
      .subscribe(res => {
        this.orgList = [];
        let org = {
          "organization_Id": "",
          "organization_Type": "Select an option"
        }
        this.orgList.push(org);
        res.forEach((element: any) => {
          let org = {
            "organization_Id": element.organization_Id,
            "organization_Type": element.organization_Type
          }
          this.orgList.push(org);
        })
      })
  }

  getCaptcha(e: any) {
    this.loginForm.get('captcha').setValue(e);
  }

  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    this.timerFlag = true;
    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      let i = 0;
      if (seconds == 0) {
        clearInterval(this.timerInterval);
        this.timerFlag = false;
        this.timerFlag2 = true;
      }
    }, 1000);
  }

  onSubmit() {
    // if (this.loginForm.value.captcha && this.loginForm.value.organisation.organization_Id != "") {

    if (this.loginForm.value.captcha) {
      this.http.Logincheck(this.loginForm.value)
        .subscribe(data => {
          let a = + data.loginFailed
          if (a <= 2) {
            this.messageService.add({ severity: 'error', summary: 'Your entered password is wrong', detail: 'Your account will be locked due to 3 failed attempts.. No of attempts left  : ' + a });
          } else if (a == 3) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            this.timer(1);
          } else if (data.result[0].password == (this.loginForm.value.password)) {
            this.timerFlag2 = false;
            this.messageService.add({ severity: 'success', summary: 'Login', detail: 'Logged in successfully.' });
            sessionStorage.setItem('loggedUser', this.encrypt.transform(JSON.stringify(data)));
            sessionStorage.setItem('loggedIn', 'true');
            this.router.navigateByUrl('/master-page/home');
          } else if (data.result[0].password!= this.decrypt.transform(this.loginForm.value.password)) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            this.router.navigateByUrl('/master-page/home');
          }
          localStorage.setItem("loggedIn",data.result[0].loggedIn)
        });
        
    } else {
      if (!this.loginForm.value.captcha) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid captcha' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select organization' });
      }
    }
  }
  lsRememberMe(e: any) {
    // if (e.checked && this.loginForm.value.emailId != "" && this.loginForm.value.password != "" && this.loginForm.value.organisation.organization_Id != "") {
    if (e.checked && this.loginForm.value.emailId != "" && this.loginForm.value.password != "") {
      localStorage.setItem("email", this.loginForm.value.emailId);
      localStorage.setItem("password", this.loginForm.value.password);
      localStorage.setItem("organization", this.loginForm.value.organisation.organization_Id);
    } else {
      localStorage.clear();
    }
  }
}


