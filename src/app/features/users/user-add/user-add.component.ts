import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { User } from "../user.model";
import { UserService } from "../users.service";
import { Router } from '@angular/router';
import { ApiService } from "../api.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class UserAddComponent implements OnInit {

  // @ViewChild('f', { static: true }) addForm: NgForm;
  name: string;
  email: string;
  password: string;
  age: number;

  constructor(private usersService: UserService, private router: Router, private usersApi: ApiService) { }

  addUser(f: NgForm) {
    const data = f.value;
    let user: User = new User(data.name, data.age, data.email, data.password);
    this.usersApi.addUser(user).subscribe((data: any) => {
      user.tokens = data.token;
      user = <User>data;
      this.usersService.sendUser(<User>data.user);
      this.router.navigate(['/users'])
    })
  }

  ngOnInit(): void {
  }





}
