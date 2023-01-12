import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../interfaces/interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  private routeSub!: Subscription;
  userId !: number;
  profile !: IUser;
  editMode : boolean = false;
  reactiveForm !: FormGroup;

  constructor(private users: UserService, private route: ActivatedRoute){}
  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.users.getUserInfo(this.userId))
      this.profile = this.users.getUserInfo(this.userId);
    }); 

    this.editMode = false;

    this.reactiveForm = new FormGroup({
      picture: new FormControl(null),
      name: new FormControl(null),
      species: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      email: new FormControl(null, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")),
      password: new FormControl(null, [Validators.required])
    }
  )
  }

  edit(){this.editMode = !this.editMode; console.log(this.editMode)}
  update(){
    const val = this.reactiveForm.value;
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
