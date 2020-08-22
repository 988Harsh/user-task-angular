import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { User } from "../user.model";
import { UserService } from "../users.service";
import { Router } from '@angular/router';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class UserAddComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;

  @ViewChild('ageInput', { static: true }) ageInput: ElementRef;

  @ViewChild('emailInput', { static: true }) emailInput: ElementRef;

  // @ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;

  userOne: User;

  constructor(private usersService: UserService, private router: Router, private usersApi: ApiService) { }

  addUser() {
    this.usersService.idInc++;
    this.userOne = new User(
      this.usersService.idInc,
      this.nameInput.nativeElement.value,
      this.ageInput.nativeElement.value,
      this.emailInput.nativeElement.value,
      []);
    // this.usersApi.addUser(this.userOne).subscribe((data: any[]) => {
    //   console.log(data);
    // })
    this.usersService.sendUser(this.userOne);
    // this.usersService.addUser(this.userOne);
    this.router.navigate(['/users'])
  }

  ngOnInit(): void {
  }





}
