import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from "../user.model";
import { UserService } from 'src/app/features/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  subscription2: Subscription;
  subscription: Subscription;
  subscriptionSubject: Subscription;
  users: User[];
  usersdb: User[];
  alert = false;
  config: any;
  page: number;
  constructor(private usersService: UserService, private route: ActivatedRoute, private router: Router, private usersApi: ApiService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 0
    }

  }

  pageChange(newPage: number) {
    this.router.navigate(['/users'], { queryParams: { page: newPage } });
  }

  ngOnInit() {
    this.subscription2 = this.route.queryParams.subscribe(
      params => {
        this.config.currentPage = params['page'] ? params['page'] : 1;
        this.page = this.config.currentPage
        this.subscription = this.usersApi.getUsers(this.page).subscribe((data: any) => {
          let pages = Math.ceil(data.count / this.config.itemsPerPage);

          if (this.page <= pages) {
            this.alert = false;
            this.users = <User[]>data.users;
            this.config.totalItems = data.count;
          }
          else {
            this.alert = true;
          }

        });
      });


    this.subscriptionSubject = this.usersService.listenForUser().subscribe((data: User) => {
      const index = this.users.findIndex(user => user._id === data._id)
      if (index !== -1) this.users.splice(index, 1, data);
      else { this.users.push(data); };
    });
  }


  onEdit(user: User) {
    this.router.navigate(['/users', user.tokens[0].token, 'edit'], { preserveQueryParams: true });
  }

  onDeleteClick(user: User) {

    this.usersApi.deleteApiUser(user.tokens[0].token).subscribe((data: any) => {
      const index = this.users.findIndex(user => user._id === data._id);
      if (index !== -1) this.users.splice(index, 1);
      else console.log("No such User Found");

    });
    this.router.navigate(['/users']);
  }

  ngOnDestroy() {

    this.subscription2.unsubscribe();
    this.subscription.unsubscribe();
    this.subscriptionSubject.unsubscribe();
    this.usersService.users = this.users;
  }

}