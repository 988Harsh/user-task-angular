import { Component, Input, Output, OnInit } from '@angular/core';
import { User } from "./features/users/user.model";
import { UserService } from "./features/users/users.service";
import { TaskService } from './features/tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  // @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;



  constructor() { }
  ngOnInit() { }
  title = 'my-first-app';
}
