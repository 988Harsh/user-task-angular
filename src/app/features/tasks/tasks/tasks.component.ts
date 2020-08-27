import { Component, OnInit } from '@angular/core';
import { Task } from "../task.model";
import { TasksApiService } from "../tasks.api.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../tasks.service';
import { ApiService } from '../../users/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  subscription: Subscription;
  subscription2: Subscription;
  subscriptionSubject: Subscription;
  alert = false;
  config: any;
  page: number;
  tasks: Task[] = [];
  isAdmin: boolean;
  userState: Subscription;

  constructor(private tasksApi: TasksApiService, private userApi: ApiService, private route: ActivatedRoute, private router: Router, private tasksService: TaskService, private userToken: ApiService, private auth: AuthService,
    private store: Store<{ userState: { isLoggedIn: boolean, isAdmin: boolean, token: string } }>) {
    this.config = {
      id: 'tasksPagination',
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 0
    }
  }

  pageChange(newPage: number) {
    this.router.navigate(['/tasks'], { queryParams: { page: newPage } });
  }

  ngOnInit() {

    this.userState = this.store.select('userState').subscribe(data => {
      this.isAdmin = data.isAdmin
    })

    //fetch Paginated tasks
    this.subscription2 = this.route.queryParams.subscribe(
      params => {
        this.config.currentPage = params['page'] ? params['page'] : 1;
        this.page = this.config.currentPage
        this.subscription = this.tasksApi.listTasks(this.page).subscribe((data: any) => {
          // console.log(data.count, " ", data.tasks);
          let pages = Math.ceil(data.count / this.config.itemsPerPage);
          if (this.page <= pages) {
            this.alert = false;
            this.tasks = <Task[]>data.tasks;
            this.config.totalItems = data.count;
          }
          else {
            if (this.page !== 1) {
              this.alert = true;
            }
          }

        });
      });

    //Subscribe to tasks subject for changes in table
    this.subscriptionSubject = this.tasksService.listenForTask().subscribe((data: Task) => {
      const index = this.tasks.findIndex(task => task._id === data._id)
      if (index !== -1) this.tasks.splice(index, 1, data);
      else {
        this.config.totalItems += 1;
        if (this.tasks.length < 3) this.tasks.push(data); this.router.navigate(['/tasks'], { queryParams: { page: (Math.ceil(this.config.totalItems) / this.config.itemsPerPage) } })
      };
    });

  }

  onEdit(task: Task) {
    this.router.navigate(['/tasks', task._id, 'edit']);
  }

  onDelete(task: Task) {
    this.tasksApi.deleteTask(task._id).subscribe((data: any) => {
      const index = this.tasks.findIndex(task => task._id === data._id);
      if (index !== -1) this.tasks.splice(index, 1);
      else console.log("No such task Found");
      this.router.navigate(['/tasks']);
    });
  }

  ngOnDestroy() {
    this.subscription2.unsubscribe();
    this.subscriptionSubject.unsubscribe();
  }




}
