import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { BaseController } from "src/app/core/baseController";
import { Location } from '@angular/common';
import { NotificationService } from "src/app/services/notification/notification.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseController implements OnInit {
  TotalNotification: any = 0;
  constructor(private navCtlr: NavController, private chRef: ChangeDetectorRef, private service: NotificationService, private route: Router, private activatedRoute: ActivatedRoute, httpClient: HttpClient, toastController: ToastController, private _location: Location, private aRoute: ActivatedRoute) {
    super();
    debugger;
    this.initializeApp(route, httpClient, toastController);
    this.Language.MenuTitle = this.user.Language == 'vi-VN' ? 'Danh mục' : 'Catagory';
    this.Language.LogoutTitle = this.user.Language == 'vi-VN' ? 'Đăng xuất' : 'Log out';
    this.TotalNotification = 0;
    var pathname=window.location.pathname;
    if(this.user.Language=="vi-VN" && pathname=="/main")
    {
      this.Language.Title="Trang chủ";
    }
    else
    {
      this.Language.Title="Home";
    }
   
  }
  ngOnInit() {
    this.eventEmitterService.changeTitle.subscribe((x) => {
      this.Language.Title = x;
    })
    this.eventEmitterService.changeNotification.subscribe((x: any) => {
     // debugger;
      this.TotalNotification = x.result;
    })

    this.setTotalNotification();
    this.chRef.detectChanges();
  }

  setTotalNotification() {
    this.service.GetTotalNotificationNew().subscribe(x => {
      var total = x.Data[0].Total;
      this.eventEmitterService.changeNotification.emit({ result: total })
    });
  }

  btnNotification() {
   // debugger
    this.navCtlr.navigateRoot(`/main/notification`);

    if (this.routeUrl !== '/main/index/page') {
      this.eventEmitterService.changeVisibleNotification.emit({ result: false });
    }
    else {
      this.eventEmitterService.changeVisibleNotification.emit({ result: true });
    }
  }
  logout() {
    this.storageService.remove("userInfo");
    window.location.reload();
    this.route.navigate(['login'], { replaceUrl: true });

  }
  onBack() {
    console.log('on back')
    // this.route.navigate(['../..'], { relativeTo: this.aRoute });
    this.route.navigateByUrl('/main/index');

    // this._location.back();
    // window.location.reload();
    //  this._route.navigate(['main'], { replaceUrl: true });
    // this.route.navigate([], { relativeTo: this.aRoute.parent });
  }
}
