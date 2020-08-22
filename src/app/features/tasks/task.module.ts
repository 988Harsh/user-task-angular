import { Routes, RouterModule } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NgModule } from "@angular/core";

const taskRoutes: Routes = [
    { path: 'tasks', component: TasksComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(taskRoutes)],
    exports: [RouterModule]
})
export class TaskModule {

}