import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FooterComponent } from './features/home/footer/footer.component';
import { ChartsComponent } from './features/charts/charts.component';

const appRoutes: Routes = [
    { path: '', component: FooterComponent, pathMatch: 'full' },
    { path: 'chart', component: ChartsComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}