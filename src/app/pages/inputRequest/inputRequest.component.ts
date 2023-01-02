import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputRequestModalComponent } from "src/app/components/input-request/inputRequestModal.component";
import { BaseController } from "src/app/core/baseController";
import { ToastService } from "src/app/core/ToastService";
import { InputRequestService } from "src/app/services/inputRequest/input-request.service";


@Component({
  selector: 'app-input-request',
  templateUrl: './inputRequest.component.html'
})
export class InputRequestComponent extends BaseController implements OnInit {
  constructor( private service: InputRequestService,private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "frmInputRequest";
    this.initializeApp(route, httpClient, toastController);
 
  }
  ngOnInit() {
    
    this.getInformationInputRequest();
    this.getListZone();
    this.getReceive();
  }
  getInformationInputRequest() {
     this.service.getListReQuest().subscribe((x)=>{
       this.selectItem.ListInputRequest=x.Data;
    });
 }
  getListZone() {
    this.service.QueryListZone().subscribe((x)=>{

      this.selectItem.ListZone=x.Data;
   });
 }
 getReceive() {
  this.service.GetAdminMTN().subscribe((x)=>{
    debugger;
    this.selectItem.ReceiveName=x.Data;
 });
 }
  openInputRequest(){
    debugger;
    this.openInputRequestModal();
  }
  async openInputRequestModal() {
    console.log("InputRequestComponent",this.Language);
    const modal = await this.modalCtrl.create({
      component: InputRequestModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        toastService: ToastService.Toast,
        Message:this.Message
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {

      }
    });
    await modal.present();
  }
}
