import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CompanyManagementRoutingModule } from './company-management-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    CompanyManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CompanyManagementModule { }
