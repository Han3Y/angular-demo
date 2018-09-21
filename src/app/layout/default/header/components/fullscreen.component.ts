import { Component, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
  <!--<i class="anticon anticon-{{status ? 'shrink' : 'arrows-alt'}}"></i>-->
  {{(status ? 'fullscreen-exit': 'fullscreen') | translate }}
  `,
  styles:[':host{width:100%;display: block}']
})
export class HeaderFullScreenComponent {
  status = false;

  @HostListener('window:resize')
  _resize() {
    this.status = screenfull.isFullscreen;
  }

  @HostListener('click')
  _click() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
