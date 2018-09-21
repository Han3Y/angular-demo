import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { I18NService } from './i18n/i18n.service';
import { AppLoadingService} from '@core/services/apploading.service';
import {FormatDateService} from "@core/services/formatDate.service";

@NgModule({
  providers: [
    I18NService,
    AppLoadingService,
    FormatDateService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
