import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../features/users/api.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as UserStateActions from "../features/users/store/users.action";
import * as UserReducer from '../features/users/store/users.reducer'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],

})
export class AuthComponent implements OnInit {

  alert: boolean = false;
  isLoggedIn = false;
  userState: Observable<UserReducer.State> | Subscription
  constructor(private api: ApiService, private router: Router, private authService: AuthService,
    private store: Store<{ userState: UserReducer.State }>) { }

  login(f: NgForm) {

    this.store.dispatch(new UserStateActions.LoginStart(f.value))

    this.store.select('userState').subscribe((data: any) => {
      this.isLoggedIn = data.isLoggedIn;
    });

    // this.api.login(f.value).subscribe((data: any) => {
    //   // console.log("Here!!", "Data", data, "\n\n\n");
    //   this.store.dispatch(new UserStateActions.Login(data.token, data.user.hasOwnProperty('role')));
    //   this.authService.login(data);
    //   this.router.navigate(['/']);
    // });
  }


  ngOnInit(): void {

    this.userState = this.store.select('userState').subscribe(data => {
      this.isLoggedIn = data.isLoggedIn;
      this.router.navigate['/'];
    })


    // this.authService.check().subscribe((data) => {
    //   if (data !== null) {
    //     this.authService.isLoggedIn = true;
    //   }
    // })
  }

}
