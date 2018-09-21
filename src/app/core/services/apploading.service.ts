import {Injectable} from '@angular/core';
import {Subject,Observable} from 'rxjs';
@Injectable()
export class AppLoadingService{
  constructor(){

  }
  private _sendMessage = new Subject<any>();
  sendMessage(msg:any){
    this._sendMessage.next(msg);
  }
  getMessage():Observable<any>{
    return this._sendMessage.asObservable();
  }
  showLoading(){
    this.sendMessage(true);
    setTimeout(()=>this.sendMessage(false),2000);
  }
}
