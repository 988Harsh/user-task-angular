import { Component, OnInit, Input, EventEmitter, Output, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/features/users/users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  constructor(private usersService: UserService, private route: ActivatedRoute, private router: Router) { }

  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;
  @ViewChild('ageInput', { static: true }) ageInput: ElementRef;
  @ViewChild('emailInput', { static: true }) emailInput: ElementRef;

  saveUser() {
    this.user.name = this.nameInput.nativeElement.value;
    this.user.age = this.ageInput.nativeElement.value;
    this.user.email = this.emailInput.nativeElement.value;
    this.usersService.saveUser(this.user);
    this.router.navigate(['/users']);
  }

  ngOnInit(): void {
    let id;
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
    })
    this.user = this.usersService.getUser(id)

    this.nameInput.nativeElement.value = this.user.name;

    this.ageInput.nativeElement.value = this.user.age;

    this.emailInput.nativeElement.value = this.user.email;

  }

  onSubmit(f: NgForm) {
    console.log(f.value);

  }

}
