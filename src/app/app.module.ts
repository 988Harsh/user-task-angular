import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HighchartsChartModule } from 'highcharts-angular';
import { CustomHttpInterceptorService } from "./http.interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { TasksApiService } from "./features/tasks/tasks.api.service";
import { TaskModule } from "./features/tasks/task.module";
import { UserModule } from "./features/users/user.module";
import { ApiService } from "./features/users/api.service";
import { AppComponent } from './app.component';
import { TaskService } from './features/tasks/tasks.service';
import { UserService } from './features/users/users.service';
import { NavigatorComponent } from './features/home/navigator/navigator.component';
import { ChartsComponent } from './features/charts/charts.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ChartsComponent,
    AuthComponent
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
  providers: [TaskService, UserService, ApiService, TasksApiService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngOnInit() { }
}
