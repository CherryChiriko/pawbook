import { Component, OnInit } from '@angular/core';
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

  constructor(private users: UserService, private route: ActivatedRoute){}
  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.users.getUserInfo(this.userId))
      this.profile = this.users.getUserInfo(this.userId);
    }); 
  }
  // isLoggedIn = this.users.loginCheck(this.userId)

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
