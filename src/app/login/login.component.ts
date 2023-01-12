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
    this.users.findUserLogin(val.email, val.password) ? this.route.navigate(['/home']) : 
    this.alertMessage = "User data not found";
  }

}
