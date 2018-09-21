import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PlanManagementRoutingModule } from './plan-management-routing.module';
import { PlanManagementPlanListComponent } from './plan-list/plan-list.component';
import { PlanManagementPlanViewComponent } from './plan-view/plan-view.component';
import { PlanManagementPlanEditComponent } from './plan-edit/plan-edit.component';

const COMPONENTS = [
  PlanManagementPlanListComponent];
const COMPONENTS_NOROUNT = [
  PlanManagementPlanViewComponent,
  PlanManagementPlanEditComponent];

@NgModule({
  imports: [
    SharedModule,
    PlanManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PlanManagementModule { }
