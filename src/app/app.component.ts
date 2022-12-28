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
  ngOnInit() {
    this.eventEmitterService.changeStartLoading.subscribe((x:any)=>{
      debugger;
      this.isLoading=true;
      
   })
    this.eventEmitterService.changeFinishLoading.subscribe((x:any)=>{
      debugger;
      this.isLoading=x.result
      
   })
    var user=this.storageService.getObject("userInfo");
    if(user==null)
       this.router.navigate([`/login`], { replaceUrl: true });
  }
}
