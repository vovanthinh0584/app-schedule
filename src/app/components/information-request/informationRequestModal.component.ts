import { InputRequestService } from '../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
@Component({
  selector: 'app-information-request-modal',
  templateUrl: './informationRequestModal.component.html',
  styleUrls: ['./informationRequestModal.component.css'],
})
export class InformationRequestModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;
  @Input() Message;
  
  ListType:any=[{TypeID:"1",Type:"Urgent"},{TypeID:"2",Type:"Normal"}]
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
  
    console.log("InformationRequestModalComponent")
   
  }
  ngOnInit() {
      debugger
  }
  onApproval(){

  }
  onNoApproval(){

  }
  close() {
    debugger;
    this.modalCtrl.dismiss(true);
  }

  
}