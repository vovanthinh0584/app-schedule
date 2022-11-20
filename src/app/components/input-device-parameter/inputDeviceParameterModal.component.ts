import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
@Component({
  selector: 'app-input-device-parameter-modal',
  templateUrl: './inputDeviceParameterModal.component.html',
  styleUrls: ['./inputDeviceParameterModal.component.css']
})
export class InputDeviceParameterModalComponent implements OnInit{
  @Input() Language;
  @Input() selectItem:any;
  @Input() Message;
  @Input() CurrentItem:any;
  @Input() toastService:any;
  
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
    private inputDeviceParameterService:InputDeviceParameterService) {

  
   
  }
  ngOnInit() {
    debugger;
    this.CurrentItem.InputDate = moment(this.CurrentItem.InputDate).format('MM/DD/YYYY');
  }
  ValidForm(){
    debugger;
   

    if(!this.CurrentItem.AssetId)
    {
        this.toastService.warn(this.Message.InputDeviceParameter.AssetId);
        return false;
    }
    if(!this.CurrentItem.InputDate)
    {
        this.toastService.warn(this.Message.InputDeviceParameter.InputDate);
        return false;
    }
    if(!this.CurrentItem.OperatingId)
    {
        this.toastService.warn(this.Message.InputDeviceParameter.OperatingId);
        return false;
    }
    if(!this.CurrentItem.UMID)
    {
        this.toastService.warn(this.Message.InputDeviceParameter.UMID);
        return false;
    }
    if(!this.CurrentItem.Value)
    {
        this.toastService.warn(this.Message.InputDeviceParameter.Value);
        return false;
    }
    return true;
}
  save(){
    debugger;
    if(!this.ValidForm()) return;
    var body:any={};
    body.BUID=this.selectItem.BUID;
    body.AssetId=this.CurrentItem.AssetId;
    body.InputDate=this.CurrentItem.InputDate;
    body.OperatingID=this.CurrentItem.OperatingID;
    body.UMID=this.CurrentItem.UMID;
    body.Value=this.CurrentItem.Value;
    body.Note=this.CurrentItem.Note;
    body.Lang=this.CurrentItem.Language;
    body.UserId=this.selectItem.UserID;
    body.RecordID=this.CurrentItem.RecordID;
    
    this.inputDeviceParameterService.createInputDeviceParameter(body).subscribe(response=>{
      
      var result=response;
      this.close(true);
    });
  }
  close(trangthai){
    this.modalCtrl.dismiss(trangthai);
  }
}
