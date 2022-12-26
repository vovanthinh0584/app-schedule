import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import * as moment from "moment";

import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { BaseController } from "src/app/core/baseController";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
import { Sheet033BoilerService } from "src/app/services/sheet033Boiler/Sheet033Boiler.service";


@Component({
  selector: 'sheet033-boiler',
  templateUrl: './sheet033Boiler.component.html',
  styleUrls: ['./sheet033Boiler.scss'],
})
export class Sheet033BoilerComponent extends BaseController implements OnInit  {

  expanded = {};
  timeout: any;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  selectedName : string = "";
  
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

WorkDate:any;
  constructor(private sheet033BoilerService:Sheet033BoilerService,private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController,public httpClient:HttpClient,toastController: ToastController) {
     super();
 
     this.fromName="Sheet_033_Boiler";
     this.initializeApp(route,httpClient,toastController);
     this.WorkDate = moment(new Date()).format('MM/DD/YYYY');
     this.selectItem.CurrentWorker={};
     this.selectItem.CheckList=[];
  
  }
  async getListWork() {
    await  this.sheet033BoilerService.GetWorks({BUID:this.selectItem.BUID}).subscribe(rs=>{
      this.selectItem.ListWorks =rs.Data
    });
  }
  async getListSheet() {
    await  this.sheet033BoilerService.GetShiftsAttime({BUID:this.selectItem.BUID,ShiftID:this.selectItem.ShiftId}).subscribe(rs=>{
     
      this.selectItem.listSheetAtime =rs.Data
    });
  }
  onChangeWork(event){
    debugger;
    this.selectItem.ShiftId=this.selectItem.CurrentWorker.ShiftId;
    this.selectItem.AssetId=this.selectItem.CurrentWorker.AssetId;
    this.selectItem.WorkDate=this.selectItem.CurrentWorker.WorkDate;
    this.selectItem.AreaId=this.selectItem.CurrentWorker.AreaId;
    this.getListSheet();
 
  }
  ngOnInit() {
    this.getListWork();
   }
   onSearch()
   {
    var obj:any={};
    obj.UserId=this.user.UserID;
    obj.WorkId=this.selectItem.CurrentWorker.WorkNo;
    obj.ShiftId=this.selectItem.ShiftId;
    obj.Time=this.selectItem.Time;
    obj.BUID=this.user.BusinessUnitID;
    obj.Lang=this.user.Language;
    this.selectItem.CheckList=[];

    this.getCheckList(obj);
   }

   async getCheckList(obj:any){
    await  this.sheet033BoilerService.GetCheckList(obj).subscribe(rs=>{
      debugger;
      this.selectItem.CheckList =rs.Data
    });
   }

   onCheckingAll(event)
   {
    if(this.selectItem.CheckList.length>0)
    {
      if(event.currentTarget.checked==true )
      {
         this.selectItem.CheckList.map(x=>{x.Value=1;return x;})
      }
      else
      {
        this.selectItem.CheckList.map(x=>{x.Value=0;return x;})
      }
    }
    
   }
   onSave(){
      if(this.selectItem.CheckList.length==0)
      {
        this.toastService.warn(this.Message.Sheet033Boiler.CheckList);
      }
      else{
        this.sheet033BoilerService.UpdateCheckList(this.selectItem.CheckList).subscribe(()=>{
          this.toastService.success(this.Message.Sheet033Boiler.Save);
        });
      }
   }
  
}
