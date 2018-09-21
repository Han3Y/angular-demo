import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema,FormProperty ,PropertyGroup} from '@delon/form';
import {FormatDateService} from "@core/services/formatDate.service";

@Component({
  selector: 'app-plan-management-plan-edit',
  templateUrl: './plan-edit.component.html',
})
export class PlanManagementPlanEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name:{type:'string',title:'计划名称',pattern:'^[\u4e00-\u9fa5_a-zA-Z0-9-_+]+$',maxLength:30},
      companyId:{type:'string',title:'备案单位'},
      userIds:{type:'string',title:'检查人员信息'},
      zzjgdm:{type:'string',title:'组织机构代码',pattern:'^[\u4e00-\u9fa5_a-zA-Z0-9-_+]+$',maxLength:30},
      start: {type: 'string',title:'日期',default: this.date.dateFtt('yyyy-MM-dd',new Date()),format:'date'},
      end:{type: 'string',format:'date',default: this.date.dateFtt('yyyy-MM-dd',new Date())},
      jhly:{type:'string',title:'计划来源','enum':['平台系统创建','工具箱创建'],'default':'平台系统创建'},
      jclx:{type:'string',title:'检查类型','enum':['单位检查','系统检查','全部检查','日常工作'],'default':'单位检查'},
      hybzms: { type: 'string', title: '', maxLength: 500 },
      gzbj: { type: 'string', title: '', maxLength: 500 },
      scfxwt: { type: 'string', title: '', maxLength: 500 },
    },
    required: ['name','companyId','userIds', 'zzjgdm', 'start','end','jhly','jclx'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 120,
      grid: { span: 12 },
      spanControl:15
    },
    $jhly:{
      widget:'radio'
    },
    $jclx:{
      widget:'radio'
    },
    $companyId:{
      widget:'select',
      asyncData: () =>this.http.get('/companyList')
    },
    $userIds:{
      widget:'select',
      mode:'multiple',
      asyncData: () =>this.http.get('/userList')
    },
    $start:{
      widget: 'date',
      end:'end',
      format:'YYYY-MM-DD'
    },
    $hybzms: {
      widget: 'textarea',
      placeholder:'已发布的行业网络安全文件和描述',
      grid: { span: 24 },
      spanControl:19,
      // validator: (value: any, formProperty: FormProperty, form: PropertyGroup) => {
      //   return value === 'hjc' ? [] : [{ keyword: 'required', message: '必须是cipchk@qq.com'}];
      // }
    },
    $gzbj: {
      widget: 'textarea',
      placeholder:'公安机关开展此次安全检查工作背景',
      grid: { span: 24 },
      spanControl:19,
    },
    $scfxwt: {
      widget: 'textarea',
      placeholder:'上次检查工作中发现的问题',
      grid: { span: 24 },
      spanControl:19,
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv:NzMessageService,
    public http: _HttpClient,
    private date:FormatDateService
  ) {}

  ngOnInit(): void {
    if (this.record.id > 0)
    this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    console.log(value);
    // this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   this.modal.close(true);
    // });
  }

  close() {
    this.modal.destroy();
  }
}
