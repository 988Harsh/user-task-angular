import { Component, OnInit, Input, EventEmitter, Output, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/features/users/users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  updateSub: Subscription;
  user: User;
  name: string;
  email: string;
  age: number;
  password: string;
  constructor(private usersService: UserService, private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let token;
    this.route.params.subscribe((params: Params) => {
      token = params['token'];
    })

    this.api.getUser(token).subscribe(data => {
      this.user = <User>data;
      // console.log("Here!", this.user);
      this.name = this.user.name;
      this.email = this.user.email;
      this.age = this.user.age;
      this.password = this.user.password;
    });
  }

  onSubmit(f: NgForm) {


    const data = f.value;

    this.user.email = data.email;
    this.user.age = data.age;
    this.user.name = data.name;
    this.user.password = data.password;

    this.updateSub = this.api.updateUser(data, this.user.tokens[0].token).subscribe(data => {
      console.log("Inside Update", data);
      this.usersService.sendUser(this.user);

    });
    this.router.navigate(['/users'], { preserveQueryParams: true });

  }

}
