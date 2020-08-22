import { Component, OnInit } from '@angular/core';
import { Task } from "../task.model";
import { TaskService } from "../tasks.service";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  constructor(private tasksService: TaskService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    console.log(this.tasks);

  }

}
