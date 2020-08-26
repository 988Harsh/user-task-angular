import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FooterComponent } from './features/home/footer/footer.component';
import { ChartsComponent } from './features/charts/charts.component';
import { CommonModule } from '@angular/common';
import { UnlessDirective } from './directives/unless.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
    { path: '', component: FooterComponent, pathMatch: 'full' },
    { path: 'chart', component: ChartsComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'users', loadChildren: () => import('./features/users/user.module').then(m => m.UserModule) },
    { path: 'tasks', loadChildren: () => import('./features/tasks/task.module').then(m => m.TaskModule) }
]

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(appRoutes), FormsModule],
    declarations: [FooterComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {

}