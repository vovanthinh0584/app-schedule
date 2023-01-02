import { InputRequestService } from './../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
@Component({
  selector: 'app-input-request-modal',
  templateUrl: './inputRequestModal.component.html',
  styleUrls: ['./inputRequestModal.component.css'],
})
export class InputRequestModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;
  @Input() Message;
  
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
    console.log("InputRequestModalComponent Constructor", this.Language)
   
  }
  ngOnInit() {
   
  }
  save() {
    let body: any = {};
    body.WorkshopId = this.selectItem.WorkshopId;
    body.LocationId = this.selectItem.LocationId;
    body.WorkerName = this.selectItem.WorkerName;
    body.RequestedContent = this.selectItem.RequestedContent;
    body.Reason = this.selectItem.Reason;

    if (this.ValidForm()) {
      this.service.createInputRequest(body).subscribe(response => {
        if (response.code == 200) {
          this.toastService.success(response.data);

          this.selectItem.WorkshopId = null;
          this.selectItem.LocationId = null;
          this.selectItem.WorkerName = null;
          this.selectItem.RequestedContent = null;
          this.selectItem.Reason = null;
        }
      }, (e) => { });
    }
  }
  close() {
    this.modalCtrl.dismiss();
  }

  ValidForm() {
    debugger;
    if (!this.selectItem.WorkshopId) {
      this.toastService.warn(this.Message.InputRequest.WorkshopId);
      return false;
    }

    if (!this.selectItem.LocationId) {
      this.toastService.warn(this.Message.InputRequest.LocationId);
      return false;
    }

    if (!this.selectItem.WorkerName) {
      this.toastService.warn(this.Message.InputRequest.WorkerName);
      return false;
    }

    if (!this.selectItem.RequestedContent) {
      this.toastService.warn(this.Message.InputRequest.RequestedContent);
      return false;
    }

    if (!this.selectItem.Reason) {
      this.toastService.warn(this.Message.InputRequest.Reason);
      return false;
    }

    return true;
  }
}