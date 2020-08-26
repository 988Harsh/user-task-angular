import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../features/users/api.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],

})
export class AuthComponent implements OnInit {

  isLoggedIn = false;
  constructor(private api: ApiService, private router: Router, private authService: AuthService) { }

  login(f: NgForm) {

    this.api.login(f.value).subscribe((data: any) => {
      // console.log("Here!!", "Data", data, "\n\n\n");
      this.api.token = data.token;
      this.authService.login(data);
      this.router.navigate(['/']);
    });
  }


  ngOnInit(): void {
    this.authService.check().subscribe((data) => {
      if (data !== null) {
        this.authService.isLoggedIn = true;
        this.router.navigate['/'];
      }
    })
  }

}
