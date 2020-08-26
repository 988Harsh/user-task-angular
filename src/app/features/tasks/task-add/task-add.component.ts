import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../tasks.service';
import { TasksApiService } from '../tasks.api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  description: string;
  @ViewChild('completed', { static: true }) completed: ElementRef
  constructor(private api: TasksApiService, private taskService: TaskService, private router: Router) { }


  addTask(f: NgForm) {
    const data = f.value
    const task: Task = new Task(data.description, this.completed.nativeElement.value);
    this.api.addTask(task).subscribe((data: any) => {
      task._id = data._id;
      this.taskService.sendTask(task);
      this.router.navigate(['/tasks'], { preserveQueryParams: true })
    });

    // user.tokens = data.token;
    // user._id = data.user._id;
    // this.usersService.sendUser(<User>data.user);
    // this.router.navigate(['/users'])


  }


  ngOnInit(): void {
  }

}
