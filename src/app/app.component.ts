import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterName } from './core/event-emitter-service';
import { HttpService } from './core/HttpService';
import { StorageService } from './core/StorageService';
import api from './core/api';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  storageService = StorageService.Storage;
     isLoading=true;
     eventEmitterService=EventEmitterName.EventEmitterService;
     api:any;
     constructor(private router: Router ) {
       
      this.api=api.api;
     }
  ngOnInit() {
    
    this.eventEmitterService.changeStartLoading.subscribe((x:any)=>{
      this.isLoading=true;
      
   })
    this.eventEmitterService.changeFinishLoading.subscribe((x:any)=>{
      this.isLoading=x.result
      
   })
 
    setInterval(()=>{
      HttpService.Client.post(`${api.api.url}${api.Notification.GetTotalNotificationNew}`,{}).subscribe(x=>{
        var total=x.Data[0].Total;
        this.eventEmitterService.changeNotification.emit({result:total})
      });
    },300000)
    var user=this.storageService.getObject("userInfo");
    if(user==null)
       this.router.navigate([`/login`], { replaceUrl: true });
  }
}
