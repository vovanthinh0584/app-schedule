import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { BaseController } from "src/app/core/baseController";
import { Location } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent extends BaseController implements OnInit {
  TotalNotification: any = 0;
  isOnMainPage: any = true;
  constructor(private navCtlr: NavController, private chRef: ChangeDetectorRef, private route: Router, private activatedRoute: ActivatedRoute, httpClient: HttpClient, toastController: ToastController, private _location: Location, private aRoute: ActivatedRoute) {
    super();
    debugger
    this.initializeApp(route, httpClient, toastController);
    this.Language.MenuTitle = this.user.Language == 'vi-VN' ? 'Danh mục' : 'Catagory';
    this.Language.LogoutTitle = this.user.Language == 'vi-VN' ? 'Đăng xuất' : 'Log out';
  }
  ngOnInit() {
    this.eventEmitterService.changeTitle.subscribe((x) => {
      this.Language.Title = x;
    })
    this.eventEmitterService.changeNotification.subscribe((x: any) => {
      debugger;
      this.TotalNotification = x.result;
    })
    this.eventEmitterService.changeVisibleNotification.subscribe((x: any) => {
      this.isOnMainPage = x.result;
    });

    setTimeout(() => { this.chRef.detectChanges() }, 100);
  }
  btnNotification() {
    debugger
    this.navCtlr.navigateRoot(`/main/notification`);
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

