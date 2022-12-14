import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import * as moment from "moment";
import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { BaseController } from "src/app/core/baseController";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";


@Component({
  selector: 'app-input-device-parameter',
  templateUrl: './inputDeviceParameter.component.html',
  styleUrls: ['./input-device-parameter.scss'],
})
export class InputDeviceParameterComponent extends BaseController implements OnInit  {

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

InputDate:any;
  constructor(private inputDeviceParameterService:InputDeviceParameterService,private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController,public httpClient:HttpClient,toastController: ToastController) {
     super();
     this.fromName="frminputDeviceParameter";
     this.initializeApp(route,httpClient,toastController);
     this.InputDate = moment(new Date()).format('MM/DD/YYYY');
  
  }
 
  
  getInformationInputDeviceParameter(){
    this.inputDeviceParameterService.getInformation().subscribe((response)=>{
      
      var result=response.data; 
      this.selectItem.listAsset= response.Data.listAsset;
      this.selectItem.listOperating= response.Data.listOperating;
      this.selectItem.listUM= response.Data.listUM;
      this.selectItem.AssetId=this.selectItem.listAsset[0].AssetID;
      this.onSearch();
    })
  }
  getParameter(){

    this.inputDeviceParameterService.getParameter(this.selectItem).subscribe((response)=>{
   
      this.selectItem.ListAssetOperation=response.Data;
    })
  }
  
  
  onSearch(){
      this.selectItem.InputDate=this.InputDate;
      this.getParameter();
  }
  ngOnInit() {
    this.getInformationInputDeviceParameter();
   }
  onSelectdData(data){
    this.openInputDeviceParameterModal(data);
  }
  async openInputDeviceParameterModal(item:any) {
    const modal = await this.modalCtrl.create({
        component: InputDeviceParameterModalComponent,
        componentProps: {
           Language:this.Language,
           selectItem:this.selectItem,
           Message:this.Message,
           CurrentItem:item,
           toastService:this.toastService
        }
    });
    modal.onDidDismiss().then((data:any) => {
    
        if (data.TRANGTHAI==true) {
          this.onSearch();
        }
    });
    await modal.present();
}
}
