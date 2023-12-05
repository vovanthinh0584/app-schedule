import { InputRequestService } from '../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
import { NoApprovalRequestModalComponent } from '../no-approval-request/noApprovalRequestModal.component';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-information-request-modal',
  templateUrl: './informationRequestModal.component.html',
  styleUrls: ['./informationRequestModal.component.css'],
})
export class InformationRequestModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;
  @Input() Message;
  @Input() User;
  
  isSend:any=false;
  isApproval:any=false;
  isVisible:any=false;
  ListType:any=[{TypeID:"1",Type:"Urgent"},{TypeID:"2",Type:"Normal"}];
  UserManager:any = {};
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
  
    console.log("InformationRequestModalComponent")
   
  }
  onVisible(){
    this.service.VisibleRequest(this.selectItem.RequestData).subscribe((x)=>{
      if(x.Code==200)
       {
         this.toastService.success(this.Message.InputRequest.VisibleRequest);
         this.close(true);
       }
     
   });
  }
  isManager=false;
  ngOnInit() {
    debugger
    this.isManager=false;
    this.isVisible=false;
    this.isSend=false;
    this.isApproval=false;
    var status=this.selectItem.RequestData.Status;
    if(this.selectItem.RequestData.UserManage)
    {
      this.UserManager.UserId = this.selectItem.RequestData.UserManage;
      this.UserManager.UserName =this.selectItem.ListManagement.find(x=>x.UserId==this.UserManager.UserId).UserName
    }
    
   if(status!='1')
   {
    this.isManager=true;
    
   }
    if(this.User.UserID==this.selectItem.RequestData.Requester.toUpperCase()
      && status=='1')
      {
        this.isSend=true;
        return;
      }
    if(this.User.UserID==this.selectItem.RequestData.UserManage.toUpperCase() && status=='2')
      {
           this.isApproval=true;
      }
    if((this.selectItem.RequestData.Status=="4" &&  this.selectItem.RequestData.Requester.toUpperCase()==this.User.UserID) || (status=="3" && this.selectItem.RequestData.Requester.toUpperCase()==this.User.UserID) )
    {
      this.isVisible=true;
    }

  }
  onSend(){
    if(!this.UserManager.UserId)
    {
        this.toastService.warn(this.Message.InputRequest.UserManage);
        return false;
    }
    
      this.selectItem.RequestData.UserManage = this.UserManager.UserId;
    
    this.service.sendInputRequest(this.selectItem.RequestData).subscribe(response => {
   
      if (response.Code == 200) {
        this.toastService.success(this.Message.InputRequest.Success);
        this.close(true);
      }
    }, (e) => { });
  }
  onApproval(){
    
    this.service.createApprovalRequest(this.selectItem.RequestData).subscribe(response => {
   
      if (response.Code == 200) {
        this.toastService.success(this.Message.InputRequest.Success);
        this.close(true);
      }
    }, (e) => { });
  }
 async onNoApproval(){
   
    const modal = await this.modalCtrl.create({
      component: NoApprovalRequestModalComponent,
      componentProps: {
        Language: this.Language,
        Item: this.selectItem.RequestData,
        toastService: this.toastService,
        Message:this.Message
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data==true) {
        this.close(true)
      }
    });
    await modal.present();
  }
  close(status) {
 
    this.modalCtrl.dismiss(status);
  }

  
}