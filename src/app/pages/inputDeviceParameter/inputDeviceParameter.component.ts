import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { BaseController } from "src/app/core/baseController";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";


@Component({
  selector: 'app-input-device-parameter',
  templateUrl: './inputDeviceParameter.component.html'
})
export class InputDeviceParameterComponent extends BaseController implements OnInit  {

  expanded = {};
  timeout: any;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  selectedName : string = "";
  columns = [
    { name: 'STT',prop: 'STT' },
    { name: 'AssetId',prop: 'assetId' },
    { name: 'inputDate',prop: 'inputDate' },
    { name: 'OperatingId',prop: 'OperatingId'},
    { name: 'OperatingName',prop: 'OperatingName'},
    { name: 'UMID',prop: 'uMID' },
    { name: 'Value',prop: 'value' },
    { name: 'Note',prop: 'note' }
  ];
  
  rows = [];
  constructor(private inputDeviceParameterService:InputDeviceParameterService,private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController,public httpClient:HttpClient,toastController: ToastController) {
     super();
     this.fromName="frminputDeviceParameter";
     this.initializeApp(route,httpClient,toastController);
    
  }
  seachbar(){
    debugger;
    this.selectItem.InputDate=new Date();
    this.getParameter();
  }
  onSelectdDatatable(row){
    this.selectItem.Item=row;
    this.openInputDeviceParameterModal();
  }
  getInformationInputDeviceParameter(){
    this.inputDeviceParameterService.getInformation().subscribe((response)=>{
      debugger; 
      var result=response.data; 
      this.selectItem.listAsset= response.data.listAsset;
      this.selectItem.listOperating= response.data.listOperating;
      this.selectItem.listUM= response.data.listUM;
      //this.openInputDeviceParameterModal();
    })
  }
  getParameter(){
    this.selectItem.rows=[];
    this.inputDeviceParameterService.getParameter(this.selectItem).subscribe((response)=>{
      this.selectItem.rows=response.data;
    })
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
  getRowHeight(row) {
    return row.height;
  }
  onSearch(){
    this.getParameter();
  }
  ngOnInit() {
    this.getInformationInputDeviceParameter();

  }
  async openInputDeviceParameterModal() {
    const modal = await this.modalCtrl.create({
        component: InputDeviceParameterModalComponent,
        componentProps: {
           Language:this.Language,
           selectItem:this.selectItem,
           Message:this.Message
        }
    });
    modal.onDidDismiss().then((data) => {
      debugger; 
        if (data.data) {
          
        }
    });
    await modal.present();
}
}
