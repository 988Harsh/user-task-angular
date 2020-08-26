import { Routes, RouterModule } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TaskAddComponent } from "./task-add/task-add.component";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { AuthGuard } from "../../auth/auth.guard";

const taskRoutes: Routes = [
    {
        path: 'tasks', component: TasksComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'add', component: TaskAddComponent },
            { path: ':id/edit', component: TaskEditComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(taskRoutes), CommonModule, FormsModule, NgxPaginationModule],
    declarations: [TasksComponent, TaskAddComponent, TaskEditComponent],
    exports: [RouterModule]
})
export class TaskModule {

}