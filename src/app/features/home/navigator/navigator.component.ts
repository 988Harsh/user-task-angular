import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../users/api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.check().subscribe(data => {
      if (data !== null) {
        this.api.token = data.token;
        this.isLoggedIn = true;
        this.isAdmin = data.user.hasOwnProperty('role') ? true : false;
        console.log(this.isLoggedIn, " ", this.isAdmin);

      }
      else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    })
  }

  onLogout() {
    this.authService.logout();
  }


}
