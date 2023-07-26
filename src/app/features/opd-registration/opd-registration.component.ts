import { Component, OnInit } from '@angular/core';
import opdRgistrationForm from './opdRegistrationForm.json';


@Component({
  selector: 'app-opd-registration',
  templateUrl: './opd-registration.component.html',
  styleUrls: ['./opd-registration.component.css']
})
export class OpdRegistrationComponent implements OnInit {
  formJSON:any=opdRgistrationForm;
  constructor() { }

  ngOnInit(): void {
  }
  changeEvent(e:any){

  }

}
