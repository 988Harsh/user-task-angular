import { UsersComponent } from "./users/users.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
    {
        path: '', component: UsersComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'add', component: UserAddComponent },
            { path: ':token/edit', component: UserEditComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, NgxPaginationModule],
    declarations: [UsersComponent, UserAddComponent, UserEditComponent],
    exports: [RouterModule]
})
export class UserModule {

}