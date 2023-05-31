import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { BaseController } from "src/app/core/baseController";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseController implements OnInit {
  TotalNotification:any=0;
  constructor(private navCtlr: NavController,private chRef: ChangeDetectorRef,private route: Router, private activatedRoute: ActivatedRoute,httpClient:HttpClient,toastController: ToastController) {
     super();
     debugger
    this.initializeApp(route,httpClient,toastController);
    this.Language.MenuTitle=this.user.Language =='vi-VN'?'Danh mục':'Catagory';
    this.Language.LogoutTitle=this.user.Language =='vi-VN'?'Đăng xuất':'Log out';
    
  }
  ngOnInit() {
    this.eventEmitterService.changeTitle.subscribe((x)=>{
       this.Language.Title=x;
    })
    this.eventEmitterService.changeNotification.subscribe((x:any)=>{
      debugger;
      this.TotalNotification=x.result;
   })
    setTimeout(()=>{this.chRef.detectChanges()},100) ;
  }
  btnNotification(){
    debugger
    this.navCtlr.navigateRoot(`/main/notification`);
  }
  logout()
  {
    this.storageService.remove("userInfo");
    window.location.reload();
    this.route.navigate(['login'], { replaceUrl: true });
   
  }

}
