import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TasksApiService } from '../tasks.api.service';
import { Task } from '../task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../tasks.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  updateSub: Subscription;
  task: Task;
  description: string;
  @ViewChild('completed', { static: true }) completed: ElementRef;
  constructor(private api: TasksApiService, private route: ActivatedRoute, private tasksService: TaskService, private router: Router) { }

  ngOnInit(): void {

    let id;
    this.route.params.subscribe((params: Params) => {
      id = params['id'];
    })

    this.api.fetchTask(id).subscribe(data => {
      this.task = <Task>data;
      // console.log("Here!", this.user);
      this.description = this.task.description;
      this.completed.nativeElement.value = this.task.completed;
    });

  }

  onSubmit(f: NgForm) {


    const data = f.value;

    this.task.description = data.description;
    this.task.completed = this.completed.nativeElement.value;
    this.updateSub = this.api.updateTask(this.task._id, data).subscribe(data => {
      console.log("Inside Update", data);
      this.tasksService.sendTask(this.task);

    });
    this.router.navigate(['/tasks'], { preserveQueryParams: true });

  }


}
