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
    this.Language.MenuTitle=this.user.Language =='vi-VN'?'Danh mục':'Catagory';
    this.Language.LogoutTitle=this.user.Language =='vi-VN'?'Đăng xuất':'Log out';
  }
  ngOnInit() {
    this.eventEmitterService.changeTitle.subscribe((x)=>{
       debugger;
       this.Language.Title=x;
    })
  }
  
  logout()
  {
    this.storageService.remove("userInfo");
    this.route.navigate([`login`], { replaceUrl: true });
  }
  onHome(){
    debugger;
    this.route.navigate([`main`], { replaceUrl: true });
  }
}
