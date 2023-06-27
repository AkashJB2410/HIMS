import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../shared/service/session.service';
import { EncryptPipe } from '../../shared/pipes/encrypt-decrypt.pipe';
import { FormService } from '../../shared/service/form.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import login from './login.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    organisation: new FormControl('', [Validators.required]),
    captcha: new FormControl('', [Validators.required])
  });
  loginFormData =login;
  orgList: any = [];
  tabularData: any;
  display: any;
  public timerInterval: any;
  timerFlag = false;
  timerFlag2 = false;
  attempts: any = 1;
  constructor(private router: Router, private messageService: MessageService, private http: SessionService, private encrypt: EncryptPipe, private form$: FormService) { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
  }
  
  getEmail(e: any) {
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
  
  getCaptcha(e: any){
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
    if(this.loginForm.value.captcha){
      this.http.Logincheck(this.loginForm.value)
      .subscribe(data => {
        let a = + data.loginFailed
        if (a <= 2) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your entered password is wrong.Your account will be locked due to 3 failed attempts.. Attempt  : ' + a });
        } else if (a == 3) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          this.timer(1);
        } else if (data.password == this.loginForm.value.password) {
          this.timerFlag2 = false;
          this.messageService.add({ severity: 'success', summary: 'Login', detail: 'Logged in successful.' });
          sessionStorage.setItem('loggedUser',this.encrypt.transform(JSON.stringify(data)));
          sessionStorage.setItem('loggedIn', 'true');
          this.router.navigateByUrl('/master-page/home');
        } else if (data.password != this.loginForm.value.password) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid captcha'});
    }
  }
}


