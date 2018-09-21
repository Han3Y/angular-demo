import { Component,OnInit ,ViewChild,TemplateRef} from '@angular/core';
import { SettingsService } from '@delon/theme';
import {Observable} from 'rxjs';
import{NzModalService,NzModalRef,UploadFile} from "ng-zorro-antd";
import { AppLoadingService } from '@core/services/apploading.service';
import {HttpClient} from "@angular/common/http";
import {FormatDateService} from "@core/services/formatDate.service";

class Operation{
    name:string;
    type:string
}
@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.less']
})
export class HeaderComponent implements OnInit{
  @ViewChild('tplUpgradeFooter') tplUpgradeFooter: TemplateRef<{}>;
  @ViewChild('tplUpgradeContent') tplUpgradeContent: TemplateRef<{}>;
  @ViewChild('tplRestoreFooter') tplRestoreFooter: TemplateRef<{}>;
  @ViewChild('tplRestoreContent') tplRestoreContent: TemplateRef<{}>;
  uploadSuccess:boolean = false;
  upgrading:boolean = false;
  uploadList:UploadFile[] = [];
  restorePwd:string;
  restoring:boolean = false;
  searchToggleStatus: boolean;
  time:Observable<any>;
  versionVisible = false;
  headerOperations:Operation[];
  tplModal:NzModalRef;

  constructor(
    public settings: SettingsService,
    private modalService: NzModalService,
    private loadingServ:AppLoadingService,
    private http:HttpClient,
    private date:FormatDateService
  ) { }

  ngOnInit(){
    this.time = new Observable(observer =>{
      setInterval(() => observer.next(this.date.dateFtt('yyyy-MM-dd hh:mm:ss',new Date())),1000);
    });

    this.http.get<Operation[]>('/headOperations').subscribe((data:any)=>{
      if(data.status === 0){
        this.headerOperations = data.data;
      }
    })
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  selectOperation(type:string){
    switch (type){
      case 'shutDown':
        this.modalService.confirm({
          nzTitle:'确认关机？',
          nzOnOk:()=>{
            this.loadingServ.showLoading();
          }
        });
        break;
      case 'reboot':
        this.modalService.confirm({
          nzTitle:'确认重启？',
          nzOnOk:()=>{
            this.loadingServ.showLoading();
          }
        });
        break;
      case 'export':

        break;
      case 'version':
        this.versionVisible = true;
        break;
      case 'upgrade':
        this.tplModal = this.modalService.create({
          nzTitle:'系统升级',
          nzContent: this.tplUpgradeContent,
          nzFooter:this.tplUpgradeFooter,
          nzMaskClosable:false,
          nzClosable:false
        });
        break;
      case 'restore':
        this.tplModal = this.modalService.create({
          nzTitle:'恢复出厂',
          nzContent: this.tplRestoreContent,
          nzFooter:this.tplRestoreFooter,
          nzMaskClosable:false,
          nzClosable:false
        });
        break;
    }
  }
  upgrade(){
    this.upgrading = true;
    setTimeout(()=>this.upgrading = false,2000);
  }
  upgradeCancel(){
    this.tplModal.destroy();
    if(this.uploadList.length == 0){
      this.uploadSuccess = false;
    }
  }
  upgradeChangeStatus(event){
    if(event.type === 'success'){
      this.uploadSuccess = true;
    }
  }
  restore(){
    this.restoring = true;
    setTimeout(()=>this.restoring = false,2000);
  }
  restoreCancel(){
    this.tplModal.destroy();
    this.restorePwd = '';
  }
  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
