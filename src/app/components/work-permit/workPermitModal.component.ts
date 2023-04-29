import { InputRequestService } from './../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { WorkPermitService } from 'src/app/services/workPermit/work-permit.service';

@Component({
  selector: 'app-work-permit-modal',
  templateUrl: './workPermitModal.component.html',
  styleUrls: ['./workPermitModal.component.css'],
})
export class WorkPermitModalComponent implements OnInit {
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
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service:WorkPermitService) {
    console.log("WorkPermitModalComponent Constructor", this.Language)
  }
  ngOnInit() {
      
  }
  save() {
    if (this.ValidForm()) {
      this.service.saveWorkPermit(this.selectItem).subscribe(response => {
        if (response.Code == 200) {
          this.toastService.success(this.Message.WorkPermit.Success);
          this.close(true);
        }
      }, (e) => { });
    }
  }
  close(status) {

    this.modalCtrl.dismiss(status);
  }

  ValidForm() {
    
    if(!this.selectItem.Contractor)
    {
        this.toastService.warn(this.Message.WorkPermit.Contractor);
        return false;
    }
  
    if(!this.selectItem.DeviceDescription)
    {
        this.toastService.warn(this.Message.WorkPermit.DeviceDescription);
        return false;
    }
    if(!this.selectItem.VendorManager)
    {
        this.toastService.warn(this.Message.InputRequest.VendorManager);
        return false;
    }
    return true;
  }
}