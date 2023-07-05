import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
loginForm :any
  constructor() { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      mobileNumber: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.onSubmit()
  }
  onSubmit() {
    console.log(this.loginForm.value.username)
 }
}
