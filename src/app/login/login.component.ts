import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  alertMessage: string = '';
  reactiveForm !: FormGroup;
  constructor(private route: Router, private users: UserService){
  }

  
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
      ]),
      password: new FormControl(null, [Validators.required])
    }
  )    
  }

  login(){
    const val = this.reactiveForm.value;
    this.getUser(val.email, val.password ) ? this.route.navigate(['/home']) : 
    this.alertMessage = "User data not found"
    
  }

  getUser(email: string, password: string){
    return this.users.findUser(email, password);
  }
  // formValidation(control: AbstractControl){
  //   // const psw = 'Ih8U'; const eml = 'pixie@gmail.com';
  //   const pswCtrl = control.get('password');
  //   const emlCtrl = control.get('email');
  //   let match = this.users.emailCheck(emlCtrl?.value);
  //   if (match === null) return {notFound: true};
  //   return this.users.getUserInfo(match).password === pswCtrl?.value ? null : {notFound: true};
  // }



  // getUser(eml: string, psw: string){
  //   return eml && psw && eml !== psw ?
  //   {mismatch: true} : null
  //   // return this.users.findUser(eml, psw);
  // }
  // formValidation(control: AbstractControl) {
  //   const pswCtrl = control.get('password');
  //   const emlCtrl = control.get('email');
  //   return this.getUser(emlCtrl?.value, pswCtrl?.value);
  // }

  // getUser(eml: string, psw: string){
  //   // return this.users.findUser(eml, psw);
  // }
  // formValidation(control: AbstractControl) {
  //   const pswCtrl = control.get('password');
  //   const emailCtrl = control.get('email');
  //   return (pswCtrl && emailCtrl) ? this.getUser(pswCtrl?.value, emailCtrl?.value) : null;
  // }








  // getUser(emailCtrl: AbstractControl, pswCtrl: AbstractControl){

  //   return pswCtrl && emailCtrl && pswCtrl.value !== emailCtrl.value ?
  //   {mismatch: true} : null
  //   }
  // formValidation(control: AbstractControl) {
  //   const pswCtrl = control.get('password');
  //   const emailCtrl = control.get('email');
  //   return (pswCtrl && emailCtrl) ? null: this.getUser(pswCtrl, emailCtrl);
  //   // return (pswCtrl && emailCtrl) ? this.getUser(pswCtrl?.value, emailCtrl?.value) : null;
  // }


  
  // formValidation(control: AbstractControl) {
  //   const pswCtrl = control.get('password');
  //   const emailCtrl = control.get('email');
  //   return pswCtrl && emailCtrl && this.getUser(pswCtrl.value, emailCtrl.value) ?
  //   {mismatch: true} : null
  // }

}
