import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { BaseController } from "src/app/core/baseController";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";

@Component({
  selector: 'app-input-device-parameter',
  templateUrl: './inputDeviceParameter.component.html'
})
export class InputDeviceParameterComponent extends BaseController implements OnInit {
  constructor(private inputDeviceParameterService: InputDeviceParameterService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.formName = "frmInputRequest";
    this.initializeApp(route, httpClient, toastController);
  }
  getInformationInputDeviceParameter() {
    this.inputDeviceParameterService.getInformation().subscribe((response) => {
      debugger;
      var result = response.data;
      this.selectItem.listAsset = response.data.listAsset;
      this.selectItem.listOperating = response.data.listOperating;
      this.selectItem.listUM = response.data.listUM;
      this.openInputDeviceParameterModal();
    })
  }
  ngOnInit() {
    this.getInformationInputDeviceParameter();
  }
  async openInputDeviceParameterModal() {
    const modal = await this.modalCtrl.create({
      component: InputDeviceParameterModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {

      }
    });
    await modal.present();
  }
}
