import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { GetTaskModalComponent } from "src/app/components/get-task/getTaskModal.component";
import { BaseController } from "src/app/core/baseController";
import { NotificationService } from "src/app/services/notification/notification.service";
import * as moment from "moment";
import { ErrorDialogService } from 'src/app/core/errordialog.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.scss'],
})
export class NotificationComponent extends BaseController implements OnInit {
  listNotication: any=[]
  eventLoadmore: boolean = false;
  notification:any={};
  isEmptyData;
  totalNotication:number=0;
  constructor(public dialog: ErrorDialogService,private service: NotificationService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "FA_Notication";
    this.initializeApp(route, httpClient, toastController);

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.notification.BeginNum = 0;
    this.notification.To = 10;
    this.GetListNotification(this.notification,event);
}
  doLoadmore(loadmore) {
    console.log('Begin async operation', loadmore);
    this.notification.BeginNum = this.notification.EndNum;
    this.notification.EndNum += 10;
    this.GetListNotification(this.notification, loadmore);
}
async GetListNotification(body:any, Evt?: any) {
  debugger;
  //this.infiniteScroll.disabled = false;
  let isLoadmore = 'false';
  let isRefresh = 'false'
  if (Evt && Evt.type == 'ionInfinite') {
      isLoadmore = 'true';
  }
  if (Evt && Evt.type == 'ionRefresh') {
      isRefresh = 'true';
  }
  let showSpinner = 'true';
  if (isLoadmore == 'true' || isRefresh == 'true') {
      showSpinner = 'false';
  }
  let _res:any = [];
  await this.service.GetListNotification(body).subscribe(async res => {
      debugger;
      _res = res;
      await this.dialog.openDialogResponse(res).then(async success => {
          if (success) {
              if (isLoadmore == 'true') {
                  this.listNotication.push.apply(this.listNotication, res.Data);
              } else {
                  this.listNotication = res.Data;
              }
              this.isEmptyData = this.listNotication.length > 0 ? false : true;
              
          }
      });
  }).add(() => {
      if (Evt) {
          Evt.target.complete();
          //all data is loaded
          if (this.totalNotication < 10 && Evt.type == 'ionInfinite') {
              //Evt.target.disabled = true;
              this.eventLoadmore = true;
          } else {
              //Evt.target.disabled = false;
              this.eventLoadmore = false;
          }
      }
  });
}

 
  ngOnInit(): void {
    debugger
    this.notification.BeginNum = 0;
    this.notification.EndNum = 10;
    this.service.GetTotalNotification().subscribe(x=>{
      debugger;
      this.totalNotication=x.Data[0].Total;
    });
    this.GetListNotification(this.notification);
   
  }
 
}
