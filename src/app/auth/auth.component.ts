import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../features/users/api.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as UserStateActions from "../features/users/store/users.action";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],

})
export class AuthComponent implements OnInit {

  isLoggedIn = false;
  userState: Observable<{ isLoggedIn: boolean, isAdmin: boolean, token: string }> | Subscription
  constructor(private api: ApiService, private router: Router, private authService: AuthService,
    private store: Store<{ userState: { isLoggedIn: boolean, isAdmin: boolean, token: string } }>) { }

  login(f: NgForm) {

    this.api.login(f.value).subscribe((data: any) => {
      // console.log("Here!!", "Data", data, "\n\n\n");
      this.store.dispatch(new UserStateActions.Login(data.token, data.user.hasOwnProperty('role'), true));
      this.authService.login(data);
      this.router.navigate(['/']);
    });
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
