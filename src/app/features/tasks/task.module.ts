import { Routes, RouterModule } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TaskAddComponent } from "./task-add/task-add.component";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

const taskRoutes: Routes = [
    {
        path: 'tasks', component: TasksComponent, children: [
            { path: 'add', component: TaskAddComponent },
            { path: ':id/edit', component: TasksComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(taskRoutes), CommonModule],
    declarations: [TasksComponent],
    exports: [RouterModule]
})
export class TaskModule {

}