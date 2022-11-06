import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { BaseController } from "src/app/core/baseController";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseController implements OnInit {
 
  constructor(private route: Router, private activatedRoute: ActivatedRoute,httpClient:HttpClient,toastController: ToastController) {
     super();
    this.initializeApp(route,httpClient,toastController);
  }
  ngOnInit() {
   //this._route.navigate([`/main/get-task`], { replaceUrl: true });
  }
  
  logout()
  {
    this.route.navigate([`login`], { replaceUrl: true });
  }
 
}
