import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InformationRequestModalComponent } from "src/app/components/information-request/informationRequestModal.component";
import { InputRequestModalComponent } from "src/app/components/input-request/inputRequestModal.component";
import { BaseController } from "src/app/core/baseController";
import { ToastService } from "src/app/core/ToastService";
import { InputRequestService } from "src/app/services/inputRequest/input-request.service";
import { IonicSelectableComponent } from 'ionic-selectable';
import { WorkPermitService } from "src/app/services/workPermit/work-permit.service";


@Component({
  selector: 'app-input-request',
  templateUrl: './inputRequest.component.html',
  styleUrls: ['./inputRequest.component.scss'],
})
export class InputRequestComponent extends BaseController implements OnInit {
  ListZone: any = [];
  ReceiveName = "";
  constructor(private workPermitService: WorkPermitService,private service: InputRequestService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "FA_frmMTNRequest";
    this.initializeApp(route, httpClient, toastController);

  }
  doRefresh(event){

  }
  ngOnInit() {

    this.getInformationInputRequest();
    this.getListZone();
    this.getReceive();
    this.getListManagement();
    //this.getListBoPhan();
  }

  ngAfterContentChecked() {
    if (this.routeUrl !== '/main/index/page') {
      this.eventEmitterService.changeVisibleNotification.emit({ result: false });
    }
    else {
      this.eventEmitterService.changeVisibleNotification.emit({ result: true });
    }
  }

  async onRequest(item) {
    debugger;
    this.selectItem.RequestData= item;
    if(item.Status=='0')
    {
      this.openInputRequest("Edit");
      
    }
    else
    {
      const modal = await this.modalCtrl.create({
        component: InformationRequestModalComponent,
        componentProps: {
          Language: this.Language,
          selectItem: this.selectItem,
          toastService: ToastService.Toast,
          User: this.user,
          Message: this.Message
        }
      });
      modal.onDidDismiss().then((data) => {
        if (data.data == true) {
          this.getInformationInputRequest();
  
        }
      });
      await modal.present();
     
    }
    
  }
  getInformationInputRequest() {
    this.selectItem.ListRequest = [];
    this.service.getListReQuest().subscribe((x) => {
      this.selectItem.ListRequest = x.Data;
    });
  }
  getListZone() {
    this.service.QueryListZone().subscribe((x) => {
      this.ListZone = x.Data;
      this.selectItem.ListZone = x.Data;
    });
  }
  getListManagement() {
    this.service.GetListManagement().subscribe((x) => {
      this.selectItem.ListManagement = x.Data;
    });
  }
  getListBoPhan() {
    this.workPermitService.GetBoPhans({}).subscribe((x) => {
      this.selectItem.ListBoPhan = x.Data;
    });
  }
  getReceive() {
    this.service.GetAdminMTN().subscribe((x) => {

      this.ReceiveName = x.Data.UserName;
      this.selectItem.ReceiveName = x.Data.UserName;
    });
  }
  openInputRequest(action) {
    this.openInputRequestModal(action);
  }

  async openInputRequestModal(action) {
    console.log("InputRequestComponent", this.Language);
    this.selectItem.RequestData=action=="Create"?{}:this.selectItem.RequestData;
    const modal = await this.modalCtrl.create({
      component: InputRequestModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem.RequestData,
        toastService: ToastService.Toast,
        User: this.user,
        Message: this.Message,
        ListZone:this.selectItem.ListZone,
        ListBoPhan:this.selectItem.ListBoPhan,
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data == true) {
        this.getInformationInputRequest();
      }
    });
    await modal.present();
  }
}
