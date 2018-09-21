import { Component, Inject ,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {HttpClient,HttpHeaders,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import {ACLService} from "@delon/acl";

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <!--<div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>-->
      <div nz-menu-item (click)="passwordVisible=true"><i class="anticon anticon-setting mr-sm"></i>修改密码</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  <nz-modal [(nzVisible)]="passwordVisible" nzTitle="修改密码" [nzMaskClosable]="false" [nzClosable]="false"  [nzFooter]="passwordFooter" >
    <div>
      <form #f="ngForm" nz-form>
        <nz-form-item>
          <nz-form-label nzRequired nzFor="currentPwd" nzSpan="7">当前密码</nz-form-label>
          <nz-form-control nzSpan="12">
            <input nz-input required type="password" name="currentPwd" id="currentPwd" [(ngModel)]="i.currentPwd" #currentPwd="ngModel">
            <nz-form-explain *ngIf="currentPwd.dirty && currentPwd.invalid">请输入当前密码</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired nzFor="newPwd" nzSpan="7">新密码</nz-form-label>
          <nz-form-control nzSpan="12">
            <input nz-input required type="password" name="newPwd" id="newPwd" [(ngModel)]="i.newPwd" #newPwd="ngModel">
            <nz-form-explain *ngIf="newPwd.dirty && newPwd.invalid">请输入新密码</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired nzFor="confirmPwd" nzSpan="7">确认密码</nz-form-label>
          <nz-form-control nzSpan="12">
            <input nz-input required type="password" name="confirmPwd" id="confirmPwd" [(ngModel)]="i.confirmPwd" #confirmPwd="ngModel">
            <nz-form-explain *ngIf="confirmPwd.dirty && (confirmPwd.invalid || confirmPwd.value != newPwd.value)">
              <ng-container ><span style="color: red">密码输入不一致</span></ng-container>
            </nz-form-explain>
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
    <ng-template #passwordFooter>
      <button nz-button nzType="default" (click)="cancel()" *ngIf="!loading">取消</button>
      <button nz-button nzType="primary" (click)="changePwd()" [nzLoading]="loading" [disabled]="!f.form.valid">确认</button>
    </ng-template>
  </nz-modal>
  `,
})
export class HeaderUserComponent {
  @ViewChild('f') f;
  i:any = {};
  passwordVisible:boolean = false;
  loading:boolean = false;
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private http:HttpClient,
    private msg:NzMessageService,
    private acl:ACLService
  ) {}

  logout() {
    this.tokenService.clear();
    console.log(this.acl.data);
    this.acl.setRole([]);
    console.log(this.acl.data);
    this.router.navigateByUrl(this.tokenService.login_url);
  }
  cancel(){
    this.f.reset();
    this.passwordVisible = false;
  }
  changePwd(){
    this.loading = true;
    console.log(this.f.form.value);
    this.http.post<{}>('/changePassword',this.f.form.value,httpOptions).subscribe(
      (data:any)=>{
        this.loading = false;
        if(data.status === 0 && data.data === true){
          this.cancel();
          this.msg.success(`修改成功`);
        }
      },
      err=>{
        this.loading = false;
        console.log(err);
      }
    )
  }
}
