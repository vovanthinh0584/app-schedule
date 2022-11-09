import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
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

  constructor(private _route: Router, private activatedRoute: ActivatedRoute,private modalCtrl: ModalController,private inputDeviceParameterService:InputDeviceParameterService) {

  
   
  }
  ngOnInit() {
     debugger 
     var item=this.selectItem.Item;
  }
  ValidForm(){
    debugger;
    // if(!this.selectItem.AssetId)
    // {
    //     this.toastService.warn(this.Message.Login.UserId);
    //     return false;
    // }
    // if(!this.selectItem.OperatingID)
    // {
    //     this.toastService.warn(this.Message.Login.Password);
    //     return false;
    // }
    // if(!this.selectItem.BusinessUnitID)
    // {
    //     this.toastService.warn(this.Message.Login.BusinessUnitID);
    //     return false;
    // }
    // if(!this.selectItem.Language)
    // {
    //     this.toastService.warn(this.Message.Login.Language);
    //     return false;
    // }
    return true;
}
  save(){
    debugger;
    var body:any={};
    body.BUID=this.selectItem.BUID;
    body.AssetId=this.selectItem.AssetId;
    body.InputDate=this.selectItem.InputDate;
    body.OperatingID=this.selectItem.OperatingID;
    body.UMID=this.selectItem.UMID;
    body.Value=this.selectItem.Value;
    body.Note=this.selectItem.Note;
    body.Lang=this.selectItem.Language;
    body.UserId=this.selectItem.UserID;
    body.RecordID=null;
    this.modalCtrl.dismiss(this.selectItem.Item);
    // this.inputDeviceParameterService.createInputDeviceParameter(body).subscribe(response=>{
    //   debugger;
    //   var result=response;
    // });
  }
  close(){
    this.modalCtrl.dismiss();
  }
}
