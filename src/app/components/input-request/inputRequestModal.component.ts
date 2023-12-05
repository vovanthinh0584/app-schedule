import { InputRequestService } from './../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import * as moment from 'moment';

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
  @Input() User;
  @Input() ListZone;
  @Input() ListBoPhan;
  ListType:any=[{TypeID:"1",Type:"Urgent"},{TypeID:"2",Type:"Normal"}]
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
    console.log("InputRequestModalComponent Constructor", this.Language)
   
  }
  ngOnInit() {
    debugger;var te=this.selectItem;
  }
  save() {
    if (this.ValidForm()) {
      this.service.createInputRequest(this.selectItem).subscribe(response => {
   
        if (response.Code == 200) {
          this.toastService.success(this.Message.InputRequest.Success);
          this.close(true);
        }
      }, (e) => { });
    }
    
  }
  close(status) {

    this.modalCtrl.dismiss(status);
  }

  ValidForm() {
    
    if(this.selectItem.UserManage==this.User.UserID)
    {
        this.toastService.warn(this.Message.InputRequest.ErrorUser);
        return false;
    }
    if(!this.selectItem.ZoneId)
    {
        this.toastService.warn(this.Message.InputRequest.ZoneId);
        return false;
    }
    if(!this.selectItem.ZoneId)
    {
        this.toastService.warn(this.Message.InputRequest.ZoneId);
        return false;
    }
    if(!this.selectItem.Equipment)
    {
        this.toastService.warn(this.Message.InputRequest.Equipment);
        return false;
    }
    if(!this.selectItem.MTNDeadLineDateTime)
    {
        this.toastService.warn(this.Message.InputRequest.MTNDeadLineDateTime);
        return false;
    }
    // if(!this.selectItem.UserManage)
    // {
    //     this.toastService.warn(this.Message.InputRequest.UserManage);
    //     return false;
    // }
    // if(!this.selectItem.Equipment)
    // {
    //     this.toastService.warn(this.Message.InputRequest.Equipment);
    //     return false;
    // }
    // if(!this.selectItem.Descriptionrequest)
    // {
    //     this.toastService.warn(this.Message.InputRequest.RequestedContent);
    //     return false;
    // }
    

    return true;
  }
}