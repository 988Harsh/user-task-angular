import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../users/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as UserStateActions from "../../users/store/users.action";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  userState: Subscription;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private api: ApiService, private authService: AuthService,
    private store: Store<{ userState: { isLoggedIn: boolean, isAdmin: boolean, token: string } }>) { }

  ngOnInit(): void {

    this.userState = this.store.select('userState').subscribe(data => {
      this.isAdmin = data.isAdmin;
      this.isLoggedIn = data.isLoggedIn;
    })


    // this.authService.check().subscribe(data => {
    //   if (data !== null) {
    //     this.api.token = data.token;
    //     this.isLoggedIn = true;
    //     this.isAdmin = data.user.hasOwnProperty('role') ? true : false;
    //     console.log(this.isLoggedIn, " ", this.isAdmin);

    //   }
    //   else {
    //     this.isLoggedIn = false;
    //     this.isAdmin = false;
    //   }
    // })
  }

  onLogout() {
    this.store.dispatch(new UserStateActions.Logout());
  }


}
