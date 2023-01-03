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
      this.service.createInputRequest(this.selectItem).subscribe(response => {
        debugger;
        if (response.Code == 200) {
          this.toastService.success(this.Message.InputRequest.Success);
          this.close();
        }
      }, (e) => { });
    }
    
  }
  close() {
    debugger;
    this.modalCtrl.dismiss(true);
  }

  ValidForm() {
    debugger;
    if(!this.selectItem.ZoneId)
    {
        this.toastService.warn(this.Message.InputRequest.ZoneId);
        return false;
    }
    if(!this.selectItem.Requester)
    {
        this.toastService.warn(this.Message.InputRequest.Requester);
        return false;
    }
    if(!this.selectItem.ReceiveName)
    {
        this.toastService.warn(this.Message.InputRequest.ReceiveName);
        return false;
    }
    if(!this.selectItem.Equipment)
    {
        this.toastService.warn(this.Message.InputRequest.Equipment);
        return false;
    }
    if(!this.selectItem.Descriptionrequest)
    {
        this.toastService.warn(this.Message.InputRequest.RequestedContent);
        return false;
    }
    

    return true;
  }
}