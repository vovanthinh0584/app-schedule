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
  @Input() selectItem;

  constructor(private _route: Router, private activatedRoute: ActivatedRoute,private modalCtrl: ModalController,private inputDeviceParameterService:InputDeviceParameterService) {

  
   
  }
  ngOnInit() {

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
    this.inputDeviceParameterService.createInputDeviceParameter(body).subscribe(response=>{
      debugger;
      var result=response;
    });
  }
  close(){
    this.modalCtrl.dismiss();
  }
}
