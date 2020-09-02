import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HighchartsChartModule } from 'highcharts-angular';
import { CustomHttpInterceptorService } from "./http.interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

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
import { AuthService } from "./auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { userStateReducer } from "./features/users/store/users.reducer";
import { UserEffects } from "./features/users/store/user.effects";
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ChartsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    // UserModule,
    // TaskModule,
    StoreModule.forRoot({ userState: userStateReducer }),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [TaskService, UserService, ApiService, TasksApiService, AuthService, CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngOnInit() { }
}
