import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from "../user.model";
import { UserService } from 'src/app/features/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from "../api.service";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  isAuthSub: Subscription;
  subscription2: Subscription;
  subscription: Subscription;
  subscriptionSubject: Subscription;
  users: User[] = [];
  usersdb: User[];
  alert = false;
  config: any;
  page: number;
  isAdmin;
  constructor(private usersService: UserService, private route: ActivatedRoute, private router: Router, private usersApi: ApiService, private auth: AuthService) {
    this.config = {
      id: 'usersPagination',
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 0
    }

  }

  pageChange(newPage: number) {
    this.router.navigate(['/users'], { queryParams: { page: newPage } });
  }

  ngOnInit() {

    this.isAuthSub = this.auth.check().subscribe((data: any) => {
      if (data !== null) {
        this.auth.isLoggedIn = true;
        this.usersApi.setToken(data.token);
        this.isAdmin = data.user.role !== undefined ? true : false;
      }
      else {
        this.isAdmin = false;
      }
    })



    if (this.isAdmin) {
      this.alert = false;
      this.subscription2 = this.route.queryParams.subscribe(
        params => {
          this.config.currentPage = params['page'] ? params['page'] : 1;
          this.page = this.config.currentPage
          console.log(this.page);
          this.subscription = this.usersApi.getUsers(this.page).subscribe((data: any) => {
            let pages = Math.ceil(data.count / this.config.itemsPerPage);
            if (this.page <= pages) {
              this.alert = false;
              this.users = <User[]>data.users;
              this.config.totalItems = data.count;
            }
            else {
              if (this.page !== 1)
                this.alert = true;
            }
          });
        });


      this.subscriptionSubject = this.usersService.listenForUser().subscribe((data: User) => {
        const index = this.users.findIndex(user => user._id === data._id)
        if (index !== -1) this.users.splice(index, 1, data);
        else {
          this.config.totalItems += 1;
          if (this.users.length < 3) this.users.push(data); this.router.navigate(['/users'], { queryParams: { page: (Math.ceil(this.config.totalItems) / this.config.itemsPerPage) } })
        }
      });
    }
    else {
      this.usersApi.getUser(this.usersApi.token).subscribe((data: User) => {
        this.users.push(data);
      })
    }
  }

  onEdit(user: User) {
    this.router.navigate(['/users', user.tokens[0].token, 'edit'], { preserveQueryParams: true });
  }

  onDeleteClick(user: User) {

    this.usersApi.deleteApiUser(user.tokens[0].token).subscribe((data: any) => {
      const index = this.users.findIndex(user => user._id === data._id);
      if (index !== -1) this.users.splice(index, 1);
      else console.log("No such User Found");
      this.router.navigate(['/users']);
    });
  }

  ngOnDestroy() {
    if (this.isAdmin) {
      this.subscription2.unsubscribe();
      this.subscription.unsubscribe();
      this.subscriptionSubject.unsubscribe();
    }
    this.isAuthSub.unsubscribe();
    // this.usersService.users = this.users;
  }

}