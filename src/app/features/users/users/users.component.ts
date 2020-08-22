import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from "../user.model";
import { UserService } from 'src/app/features/users/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  users: User[] = [];
  usersdb: User[];
  constructor(private usersService: UserService, private router: Router, private usersApi: ApiService) {

  }

  ngOnInit() {
    this.subscription = this.usersService.listenForUser().subscribe((data: User[]) => {
      console.log("Here!!");
      this.users = data
    });
    this.usersService.getUsers();
    this.subscription.unsubscribe();
    this.subscription = this.usersService.listenForUser().subscribe((data: User) => {
      console.log("Here");
      this.users.push(data);
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/users', id, 'edit']);
  }

  onDeleteClick(id: number) {
    this.usersService.deleteUser(id);
    this.router.navigate(['/users']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.usersService.users = this.users;
  }

}