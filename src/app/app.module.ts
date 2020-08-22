import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HighchartsChartModule } from 'highcharts-angular';

import { TaskModule } from "./features/tasks/task.module";
import { UserModule } from "./features/users/user.module";
import { ApiService } from "./features/users/api.service";
import { AppComponent } from './app.component';
import { TasksComponent } from './features/tasks/tasks/tasks.component';
import { FooterComponent } from './features/home/footer/footer.component';
import { TaskEditComponent } from './features/tasks/task-edit/task-edit.component';
import { UserEditComponent } from './features/users/user-edit/user-edit.component';
import { UserAddComponent } from './features/users/user-add/user-add.component';
import { TaskDeleteComponent } from './features/tasks/task-delete/task-delete.component';
import { TaskAddComponent } from './features/tasks/task-add/task-add.component';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { TaskService } from './features/tasks/tasks.service';
import { UsersComponent } from "./features/users/users/users.component";
import { UserService } from './features/users/users.service';
import { NavigatorComponent } from './features/home/navigator/navigator.component';
import { ChartsComponent } from './features/charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    UserModule,
    TaskModule
  ],
  providers: [TaskService, UserService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngOnInit() { }
}
