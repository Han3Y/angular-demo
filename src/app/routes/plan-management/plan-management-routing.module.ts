import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanManagementPlanListComponent } from './plan-list/plan-list.component';

const routes: Routes = [

  { path: '', component: PlanManagementPlanListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanManagementRoutingModule { }
