import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DecryptPipe, EncryptPipe } from 'src/app/core/shared/pipes/encrypt-decrypt.pipe';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
Editform :any
logindata:any
  constructor( private decrypt: DecryptPipe) { }

  ngOnInit(): void {
   this.logindata  = JSON.parse(this.decrypt.transform(sessionStorage.getItem('loggedUser')))
     console.log(this.logindata)
    this.Editform = new FormGroup({
      username: new FormControl(this.logindata.userName, [Validators.required]),
      mobileNumber: new FormControl(this.logindata.emailId, [Validators.required]),
      emailId: new FormControl(this.logindata.emailId, [Validators.required]),
      // password: new FormControl("", [Validators.required]),
    });
    this.onSubmit()
  }
  onSubmit() {
    console.log(this.Editform.value.username)
 }
}
