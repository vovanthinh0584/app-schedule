import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InformationRequestModalComponent } from "src/app/components/information-request/informationRequestModal.component";
import { InputRequestModalComponent } from "src/app/components/input-request/inputRequestModal.component";
import { SendWorkPermitModalComponent } from "src/app/components/send-work-permit/sendWorkPermitModal.component";
import { WorkPermitModalComponent } from "src/app/components/work-permit/workPermitModal.component";
import { BaseController } from "src/app/core/baseController";
import { ToastService } from "src/app/core/ToastService";
import { InputRequestService } from "src/app/services/inputRequest/input-request.service";
import { WorkPermitService } from "src/app/services/workPermit/work-permit.service";


@Component({
  selector: 'app-work-permit',
  templateUrl: './workPermit.component.html',
  styleUrls: ['./workPermit.component.scss'],
})
export class WorkPermitComponent extends BaseController implements OnInit {
  ListVerdorManage: any = [];
  ListWorkPermit: any = [];
  constructor(private service: WorkPermitService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "FA_frmWorkPermit";
    this.initializeApp(route, httpClient, toastController);

  }
  ngOnInit() {

    this.getListVerdormanager();
    this.getListArea();
    this.getListProjectManager();
    this.getListWorkPermit();
    this.getListZonemanager();
    this.getListSalemanager();
  }

  onVisible(item) {

  }
  async onSend(item) {
    
    this.selectItem.Item = item;
    const modal = await this.modalCtrl.create({
      component: SendWorkPermitModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        toastService: ToastService.Toast,
        User: this.user,
        Message: this.Message
      }
    });
    modal.onDidDismiss().then((data) => {
      debugger;
      if (data.data == true) {
        this.getListWorkPermit();
      }
    });
    await modal.present();
  }
  getListZonemanager() {
    this.service.queryListZoneManager().subscribe((x) => {
      this.selectItem.ListZoneManager = x.Data;
    });
  }
  getListSalemanager() {
    this.service.queryListSaleManager().subscribe((x) => {
      this.selectItem.ListSaleManager = x.Data;
    });
  }
  getListVerdormanager() {
    this.service.queryVerdorManager().subscribe((x) => {
      this.selectItem.ListVerdorManager = x.Data;
    });
  }
  getListArea() {
    this.service.queryArea().subscribe((x) => {
      this.selectItem.Areas = x.Data;
    });
  }
  getListProjectManager() {
    this.service.queryListProjectManager().subscribe((x) => {
      this.selectItem.ListProjectManager = x.Data;
    });
  }
  openWorkPermit() {
    this.openWorkPermitModal();
  }
  getListWorkPermit() {
    this.service.queryListWorkPermit().subscribe((x) => {
      this.ListWorkPermit = x.Data;
    });
  }
  async openWorkPermitModal() {
    console.log("WorkPermit", this.Language);
    const modal = await this.modalCtrl.create({
      component: WorkPermitModalComponent,
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
        this.getListWorkPermit();
      }
    });
    await modal.present();
  }
  ngAfterContentChecked() {
    if (this.routeUrl !== '/main/index/page') {
      this.eventEmitterService.changeVisibleNotification.emit({ result: false });
    }
    else {
      this.eventEmitterService.changeVisibleNotification.emit({ result: true });
    }
  }
}
