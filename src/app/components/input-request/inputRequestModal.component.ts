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
  @Input() User;
  datePickerConfig: any = {
    //inputDate: new Date("2018-12-01");
    showTodayButton: false, // default true
    closeOnSelect: true, // default false
    setLabel: 'Set',  // default 'Set'
    todayLabel: 'Hôm nay', // default 'Today'
    closeLabel: 'Đóng', // default 'Close'
    titleLabel: 'Select a Date', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'MM/DD/YYYY', // default DD MMM YYYY
    clearButton: false, // default true
  };
  ListType:any=[{TypeID:"1",Type:"Urgent"},{TypeID:"2",Type:"Normal"}]
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
    console.log("InputRequestModalComponent Constructor", this.Language)
   
  }
  ngOnInit() {
      
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
    if(!this.selectItem.UserManage)
    {
        this.toastService.warn(this.Message.InputRequest.UserManage);
        return false;
    }
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