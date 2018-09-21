import { Component, HostListener } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'header-storage',
  template: `
  <!--<i class="anticon anticon-tool"></i>-->
  {{ 'clear-local-storage' | translate}}
  `,
  styles:[':host{width:100%;display: block}']
})
export class HeaderStorageComponent {

  constructor(
      private confirmServ: NzModalService,
      private messageServ: NzMessageService
  ) {
  }

  @HostListener('click')
  _click() {
    this.confirmServ.confirm({
      nzTitle: '确认清理本地缓存?',
      nzOnOk: () => {
        localStorage.clear();
        this.messageServ.success('清理完成!');
      }
    });
  }
}
