import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoindetailComponent } from './coindetail/coindetail.component';
import { CoinlistComponent } from './coinlist/coinlist.component';

const routes: Routes = [
  {path: "", redirectTo: "list", pathMatch: "full"},
  {path: "list", component: CoinlistComponent},
  {path: "detail", component: CoindetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
