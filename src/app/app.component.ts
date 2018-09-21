import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService, TitleService } from '@delon/theme';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';
import {AppLoadingService} from '@core/services/apploading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<nz-spin [nzSpinning]="loading"><router-outlet></router-outlet></nz-spin>`,
})
export class AppComponent implements OnInit,OnDestroy {
  loading = false;
  subScription:Subscription;
  @HostBinding('class.layout-fixed')
  get isFixed() {
    return this.settings.layout.fixed;
  }
  @HostBinding('class.layout-boxed')
  get isBoxed() {
    return this.settings.layout.boxed;
  }
  @HostBinding('class.aside-collapsed')
  get isCollapsed() {
    return this.settings.layout.collapsed;
  }
  @HostBinding('class.color-weak')
  get isColorWeak() {
    return this.settings.layout.colorWeak;
  }

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private loadingSrv:AppLoadingService
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      });
    this.subScription = this.loadingSrv.getMessage().subscribe(show=>{
      console.log(show);
      this.loading = show;
    })
  }
  ngOnDestroy(){
    this.subScription.unsubscribe();
  }
}
