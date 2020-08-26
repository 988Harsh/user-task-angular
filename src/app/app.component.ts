import { Component, Input, Output, OnInit } from '@angular/core';
import { User } from "./features/users/user.model";
import { UserService } from "./features/users/users.service";
import { TaskService } from './features/tasks/tasks.service';
import { ApiService } from './features/users/api.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  // @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;


  constructor(private authService: AuthService, private api: ApiService, private router: Router) { }
  ngOnInit() {

  }
  title = 'my-first-app';
}
