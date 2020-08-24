import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../features/users/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],

})
export class AuthComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  login(f: NgForm) {

    this.api.login(f.value).subscribe((data: any) => {
      this.api.token = data.token;
      this.api.isLoggedIn = true;
      this.router.navigate(['/tasks']);
    });
  }

  ngOnInit(): void {
  }

}
