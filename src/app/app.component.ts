import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './core/StorageService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  storageService = StorageService.Storage;
     constructor(private router: Router ) {
         debugger;
         
      
     }
  ngOnInit() {
    var user=this.storageService.getObject("userInfo");
    if(user==null)
       this.router.navigate([`/login`], { replaceUrl: true });
  }
}
