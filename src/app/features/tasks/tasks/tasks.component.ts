import { Component, OnInit } from '@angular/core';
import { Task } from "../task.model";
import { TasksApiService } from "../tasks.api.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  constructor(private tasksApi: TasksApiService) { }

  ngOnInit() {
    this.tasksApi.listTasks().subscribe(data => {
      this.tasks = <Task[]>data;
    });

  }

  onEdit(task: Task) {

  }




}
