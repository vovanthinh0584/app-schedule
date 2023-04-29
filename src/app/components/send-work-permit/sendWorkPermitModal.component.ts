import { InputRequestService } from '../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
import { WorkPermitService } from 'src/app/services/workPermit/work-permit.service';
import { CameraImageModalComponent } from '../camera-image/cameraImageModal.component';
@Component({
  selector: 'app-send-work-permit-modal',
  templateUrl: './sendWorkPermitModal.component.html',
  styleUrls: ['./sendWorkPermitModal.component.css'],
})
export class SendWorkPermitModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;
  @Input() Message;
  @Input() User;
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: WorkPermitService) {
  
    console.log("SendWorkPermitModalComponent")
   
  }
  ngOnInit() {
   debugger
  }
  onSend(){
    this.service.sendWorkPermit(this.selectItem.RequestData).subscribe(response => {
   
      if (response.Code == 200) {
        this.toastService.success(this.Message.InputRequest.Success);
        this.close(true);
      }
    }, (e) => { });
  }
 async onImage(){
  debugger;

    const modal = await this.modalCtrl.create({
      component: CameraImageModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        toastService: this.toastService,
        User:this.User,
        Message:this.Message
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data==true) {
        
      }
    });
    await modal.present();
  }
  
  close(status) {
 
    this.modalCtrl.dismiss(status);
  }

  
}