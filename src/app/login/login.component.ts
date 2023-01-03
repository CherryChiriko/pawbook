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
  successMessage: string = ''
  rePassword !: string;

  constructor(private route: Router, private users: UserService){
    // console.log(this.findUser('Ih8U'))
  }

  reactiveForm !: FormGroup;
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
      ]),
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required])
    }
    // ,this.formValidation
  )    
  }

  register(){
    this.successMessage = "User data registered successfully"
    this.route.navigate(['/home'])
  }
  findUser(psw: string){
    return this.users.pswCheck(psw);
  }
  formValidation(control: AbstractControl) {
    console.log(this.findUser(control.get('password')?.value));
    // return control.get('password')?.value? {mismatch: true} : null;
  }

//   formValidation(control: AbstractControl) {
//   const pswCtrl = control.get('password');
//   const rePswCtrl = control.get('rePassword');
//   return pswCtrl && rePswCtrl && pswCtrl.value !== rePswCtrl.value ?
//   {mismatch: true} : null
// }

// formValidation(control: AbstractControl){
//   const pswCtrl = control.get('password');
//   const emlCtrl = control.get('email');
//   console.log(this.route)

//   // let match = this.users.pswCheck(pswCtrl?.value);
//   // console.log(match)
//   // return !match? null: this.users.pswCheck(emlCtrl?.value === this.users.getUserEmail(match));
//   return null;
//   // return pswCtrl.value !== 
// }
}
