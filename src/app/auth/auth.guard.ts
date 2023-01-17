import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginId : number = -1;  
  loginIdSubs ?: Subscription;

  constructor(private users: UserService, private router: Router){
    this.loginIdSubs = this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
  };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let isLoggedIn = this.loginId > -1;
    if (isLoggedIn){      return true    } 
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
  }
  
}
