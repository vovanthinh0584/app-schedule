import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterName } from './core/event-emitter-service';
import { StorageService } from './core/StorageService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  storageService = StorageService.Storage;
     isLoading=true;
     eventEmitterService=EventEmitterName.EventEmitterService;
     constructor(private router: Router ) {
       
      
     }
     i:any=10;
  ngOnInit() {
    this.eventEmitterService.changeStartLoading.subscribe((x:any)=>{
      this.isLoading=true;
      
   })
    this.eventEmitterService.changeFinishLoading.subscribe((x:any)=>{
      this.isLoading=x.result
      
   })
 
    setInterval(()=>{
      this.i+=10; 
      this.eventEmitterService.changeNotification.emit({result:this.i})
    },120000)
    var user=this.storageService.getObject("userInfo");
    if(user==null)
       this.router.navigate([`/login`], { replaceUrl: true });
  }
}
