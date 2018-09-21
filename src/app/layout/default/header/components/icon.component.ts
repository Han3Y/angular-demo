import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';

class HeadMenu{
  name:string;
  link:string;
  icon:string;
}
@Component({
  selector: 'header-icon',
  template: `
  <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" [(nzVisible)]="visible">
    <div class="alain-default__nav-item" nz-dropdown>
      <i class="anticon anticon-appstore-o"></i>
    </div>
    <div nz-menu class="wd-xl animated jello">
      <nz-spin [nzSpinning]="loading">
        <div style="width: 400px;" nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="app-icons">
          <ng-container *ngFor="let menu of menuList">
            <div nz-col [nzSpan]="6" (click)="changeLink(menu.link)">
              <i class="anticon anticon-{{menu.icon}} bg-cyan text-white"></i>
              <small>{{menu.name}}</small>
            </div>
          </ng-container>
        </div>
      </nz-spin>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderIconComponent implements OnInit{
  loading = true;
  visible = false;
  menuList:HeadMenu[];
  constructor(private http:HttpClient,private router:Router){

  }
  ngOnInit(){
    this.http.get<HeadMenu[]>('/headMenu').subscribe((data:any)=>{
      this.loading = false;
      if(data.status === 0){
        this.menuList = data.data;
      }
    },err=>{
      this.loading = false;
    });
  }

  changeLink(url:string) {
    this.visible = false;
    this.router.navigate([url]);
  }

}
