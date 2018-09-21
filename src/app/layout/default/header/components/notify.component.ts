import { Component } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/internal/operators';
import {OnInit,OnDestroy} from '@angular/core';

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
  <notice-icon
    [data]="data"
    [count]="count"
    [loading]="loading"
    (select)="select($event)"
    (clear)="clear($event)"
    (popoverVisibleChange)="loadData($event)"></notice-icon>
  `,
})
export class HeaderNotifyComponent implements OnInit,OnDestroy{
  private handleError(error:HttpErrorResponse){
    this.loading = false;
    return throwError('get msg error');
  }
  data: NoticeItem[] = [
    // {
    //   title: '通知',
    //   list: [],
    //   emptyText: '你已查看所有通知',
    //   emptyImage:
    //     'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
    //   clearText: '清空通知',
    // },
    {
      title: '消息',
      list: [],
      emptyText: '您已读完所有消息',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
      clearText: '清空消息',
    },
    // {
    //   title: '待办',
    //   list: [],
    //   emptyText: '你已完成所有待办',
    //   emptyImage:
    //     'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
    //   clearText: '清空待办',
    // },
  ];
  count = 0;
  loading = false;
  subject:any;
  constructor(private msg: NzMessageService,private router:Router,private http:HttpClient) {}
  ngOnInit(){
    // this.subject = webSocket(`ws://${document.location.host}/test`);
    // this.subject.pipe(retry()).subscribe(msg=>{
    //   console.log(msg);
    // });
    // this.subject.next(JSON.stringify({ op: 'hello' }));
  }
  ngOnDestroy(){
    //this.subject.unsubscribe();
  }

  updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime, {
          locale: (window as any).__locale__,
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type).list.push(newItem);
    });
    return data;
  }

  clearSingle(item:any): NoticeItem[]{
    const data = this.data.slice();
    data.forEach(i=>{
      if(i.title === item.type){
        i.list = i.list.filter(p=> p.id !== item.id);
        this.count --;
      }
    });
    return data;
  }

  loadData(event:boolean) {
    if (!event || this.loading) return;
    this.loading = true;
    this.http.get<NoticeIconList[]>('/getMsg').pipe(catchError(this.handleError)).subscribe((data:any)=>{
      this.loading = false;
      if(data.status === 0){
        this.data = this.updateNoticeData(data.data);
        this.count = data.data.length;
      }
    });
  }

  clearMsg(id:string):Observable<{}>{
    return this.http.post('/clearMsg',{id:id});
  }

  clear(type: string) {
    this.clearMsg('all').subscribe((data:any)=>{
      if(data.status === 0 && data.data === true){
        this.count = 0;
        this.data = this.updateNoticeData([]);
        this.msg.success(`清空了 ${type}`);
      }
    });
  }

  select(res: any) {
    this.clearMsg(res.item.id).subscribe((data:any)=>{
      if(data.status === 0 && data.data === true){
        this.data = this.clearSingle(res.item);
        if(res.item.link){
          this.router.navigate([res.item.link]);
        }
        this.msg.success(`点击了 ${res.title} 的 ${res.item.title}`);
      }
    });
  }
}
