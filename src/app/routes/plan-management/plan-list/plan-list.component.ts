import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent,STData} from '@delon/abc';
import {PlanManagementPlanViewComponent} from "../plan-view/plan-view.component";
import {PlanManagementPlanEditComponent} from "../plan-edit/plan-edit.component";
import {NzModalService} from "ng-zorro-antd";
import {Router} from "@angular/router";
// declare var $:any;

@Component({
  selector: 'app-plan-management-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls:['./plan-list.less']
})
export class PlanManagementPlanListComponent implements OnInit {
  s:any = {};
  url = `/planList`;
  selectedRows: STData[] = [];
  @ViewChild('st') st: STComponent;
  @ViewChild('planConfirm') planConfirm: TemplateRef<{}>;
  columns: STColumn[] = [
    {title:'',index:'id',type:'checkbox'},
    { title: '计划名称', index: 'name'},
    { title: '备案单位名称', index: 'badwmc' },
    { title: '起始日期', index: 'qsrq' },
    { title: '结束日期', index: 'jsrq' },
    { title: '创建人', index: 'cjr' },
    { title: '创建时间', index: 'cjsj' },
    {
      title: '',
      buttons: [
        { text: '执行', click: (item: any) => {
            this.modalService.info({
              nzTitle:'注意',
              nzContent:this.planConfirm,
              nzWidth:'620',
              nzOnOk:()=>{
                this.router.navigate(['index/dashboard',{id:item.id}]);
              }
            });
          }
        },
        { text: '编辑', type: 'static', component: PlanManagementPlanEditComponent, click: 'reload' },
        // { text:'删除',type:'del',click:(record:any)=>{
        //   this.http
        //     .delete('/plan',{ids:[record.id]})
        //     .subscribe(()=>{
        //       this.st.clearCheck();
        //       this.st.load(1);
        //     })
        //   }
        // }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper,private modalService: NzModalService,private router:Router) { }

  ngOnInit() {
    //this.getData();
  }

  _onReuseInit(){
    console.log('_onReuseInit');
  }
  _onReuseDestroy() {
    console.log('_onReuseDestroy');
  }

  checkboxChange(list: STData[]) {
    this.selectedRows = list;
  }


  removeList(){
    let ids = [];
    this.selectedRows.map(i=>ids.push(i.id));
    this.modalService.confirm({
      nzTitle:'确认删除？',
      nzOnOk:()=>{
        this.http
          .delete('/plan',{ids:ids})
          .subscribe(()=>{
            this.st.clearCheck();
            this.st.load(1);
        })
      }
    })
  }

  add() {
    this.modal
      .createStatic(PlanManagementPlanEditComponent, {})
      .subscribe(() => this.st.reset(this.s));
  }

}
