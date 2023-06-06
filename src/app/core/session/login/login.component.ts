import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EncryptPipe } from '../../shared/pipes/encrypt-decrypt.pipe';
import data from './login.json';
import { FormService } from '../../shared/service/form.service';
import { SessionService } from '../../shared/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  tabularData: any;
  display: any;
  public timerInterval: any;
  timerFlag = false;
  timerFlag2 = false;
  rmCheck=false;
  constructor(private router: Router, private messageService: MessageService, private http: SessionService, private encrypt: EncryptPipe, private form$: FormService) { }

  ngOnInit() {
    this.loginForm = data.loginForm;
    localStorage.clear();
    sessionStorage.clear();
    this.form$.reRenderForm(this.loginForm.form.formControls[4], false, 'isVisible');
  }

  timer(minute: number, e: any) {
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
        this.loginForm.form.formControls[5].isDisabled = false;
      }
    }, 1000);
  }

  btn(a: any) {
    if (a == 3) {
      this.loginForm.form.formControls[5].isDisabled = true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: " btn msg" });
    }
  }
  oncheck(e: any) {
    console.log("check Box =>", e)
    e.forEach((chk: any) => {
      if (chk.checked == "lsRememberMe") {
        this.rmCheck = true;
      }
    })
  }

  onSubmit(e: any) {
    this.timerFlag2 = false;
    if (this.rmCheck == true) {
      localStorage.setItem('emailId', e.emailId);
      localStorage.setItem('checkbox',e.checkbox[0]);
    } else {
      localStorage['emailId']="";
      localStorage['checkbox']="";
    }
    if (e.captcha) {
      this.http.Logincheck(e)
        .subscribe(data => {
          let a = +data.loginFailed
          if(a==1){
            this.form$.reRenderForm(this.loginForm.form.formControls[4], true, 'isVisible');
          }
          if (a <= 2) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your entered password is wrong.Your account will be locked due to 3 failed attempts.. Attempt  : ' + a });
          } else if (a == 3) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            this.form$.reRenderForm(this.loginForm.form.formControls[5], false,"isEditable");
            this.timer(1, e);
          }
          else if (data.password == e.password) {
            this.timerFlag2 = false;
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Login is successful.' });
            sessionStorage.setItem(
              'loggedUser',
              this.encrypt.transform(JSON.stringify(data))
            );
            sessionStorage.setItem('loggedUser', this.encrypt.transform(JSON.stringify(data)));
            sessionStorage.setItem('loggedIn', 'true');
            // this.router.navigateByUrl('/master-page/user-management');
            this.router.navigateByUrl('/master-page/home');
            }
          else if (data.password != e.password) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        },
          (error): void => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        );
    }
  }

}
