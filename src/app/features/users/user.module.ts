import { UsersComponent } from "./users/users.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'users', component: UsersComponent, children: [
            { path: 'add', component: UserAddComponent },
            { path: ':id/edit', component: UserEditComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserModule {

}