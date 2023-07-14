import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { DecryptPipe, EncryptPipe } from 'src/app/core/shared/pipes/encrypt-decrypt.pipe';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { SessionService } from 'src/app/core/shared/service/session.service';
import { Base64Converter } from "../../../core/shared/objects/base64converter";
import { Base64ConverterService } from 'src/app/core/shared/service/base64-converter.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: any
  logindata: any
  editData: any;
  files: any;
  base64Image: any;
  image: any;
  user: any;
  constructor(private decrypt: DecryptPipe, private http: SessionService, private base64: Base64ConverterService) { }

  ngOnInit(): void {
    
    this.logindata = JSON.parse(this.decrypt.transform(sessionStorage.getItem("loggedUser")))
    this.user =this.logindata.userName
    this.editForm = new FormGroup({
      userName: new FormControl(this.logindata.userName || "", [Validators.required]),
      mobileNo: new FormControl(this.logindata.mobileNo || "", [Validators.required]),
      emailId: new FormControl(this.logindata.emailId || "", [Validators.required]),
      profileImage: new FormControl(this.logindata.profileImage, [Validators.required]),

      // password: new FormControl("", [Validators.required]),
    });
  }
  onSubmit() {
    this.http.editProfile(this.editForm.getRawValue(), this.logindata.userId).subscribe(data => {
    })
    console.log(this.editData)
  }


  onFileChange(event: any) {
    this.base64.covertToBase64(event.target.files[0]).subscribe(res => {
      this.editForm.get('profileImage').value = res;
    })
  }

}
