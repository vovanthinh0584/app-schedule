import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputRequestModalComponent } from "src/app/components/input-request/inputRequestModal.component";
import { BaseController } from "src/app/core/baseController";
import { ToastService } from "src/app/core/ToastService";


@Component({
  selector: 'app-input-request',
  templateUrl: './inputRequest.component.html'
})
export class InputRequestComponent extends BaseController implements OnInit {
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "frmInputRequest";
    this.initializeApp(route, httpClient, toastController);

  }
  ngOnInit() {
    this.getInformationInputRequest();
  }
  getInformationInputRequest() {
    this.openInputRequestModal();
  }
  async openInputRequestModal() {
    console.log("InputRequestComponent",this.Language);
    const modal = await this.modalCtrl.create({
      component: InputRequestModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        toastService: ToastService.Toast,
        Message:this.Message
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {

      }
    });
    await modal.present();
  }
}
