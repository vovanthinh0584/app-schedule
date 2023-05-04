import { InputRequestService } from '../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
import { WorkPermitService } from 'src/app/services/workPermit/work-permit.service';
import { CameraImageModalComponent } from '../camera-image/cameraImageModal.component';
@Component({
  selector: 'app-send-work-permit-modal',
  templateUrl: './sendWorkPermitModal.component.html',
  styleUrls: ['./sendWorkPermitModal.component.css'],
})
export class SendWorkPermitModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;
  @Input() Message;
  @Input() User;
  isProjectManager:any=false;
  isZoleManager:any=false;
  isSaleManager:any=false;
  isSend='0';
  isApproval='0';
  isCloseWorker='0';
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: WorkPermitService) {
  
    console.log("SendWorkPermitModalComponent")
   
  }
  checkSend(userLoginRole,status){
    this.isSend='0';
    if(status=='1' &&  userLoginRole=="USER")
     {
       this.isSend='1';
     }
     if(status=='3' &&  userLoginRole=="ProjectManager")
     {
       this.isSend='1';
     }
     if(status=='6' &&  userLoginRole=="ProjectManager")
     {
       this.isSend='1';
     }
  }
  checkCloseWorker(userLoginRole,status){
    this.isCloseWorker='0';
    if(status=='9' &&  userLoginRole=="USER")
    {
      this.isCloseWorker='1';
    }
  }
  checkApproval(userLoginRole,status){
    this.isApproval='0';
    if(status=='2' &&  userLoginRole=="ProjectManager")
     {
      this.isApproval='1';
     }
     if(status=='5' &&  userLoginRole=="ZoneManager")
     {
       this.isApproval='1';
     }
     if(status=='8' &&  userLoginRole=="SafeManager")
     {
       this.isApproval='1';
     }
  }
  
  ngOnInit() {
   debugger
   var userLoginRole=this.selectItem.Item.UserLoginRole;
   var status=this.selectItem.Item.Status;
   this.isProjectManager=status && userLoginRole=="USER"?false:true;
   this.isZoleManager=status=="3" && userLoginRole=="ProjectManager"?false:true;
   this.isSaleManager=status=="6" && userLoginRole=="ProjectManager"?false:true;
   this.checkSend(userLoginRole,status);
    this.checkApproval(userLoginRole,status);
    this.checkCloseWorker(userLoginRole,status);

  }
  onCloseWork(){
    var status=this.selectItem.Item.Status;
    var userLoginRole=this.selectItem.Item.UserLoginRole;
    if(status=="9" && userLoginRole=="USER")
    {
      this.service.CloseWorkerPermit(this.selectItem.Item).subscribe(response => {
        if (response.Code == 200) {
          this.toastService.success(this.Message.WorkPermit.CloseWorkerSuccess);
          this.close(true);
        }
      }, (e) => { 
           this.toastService.error(this.Message.WorkPermit.CloseWorkerError);
          
      });
    }
  }
  onSend(){
    debugger;
    var userLoginRole=this.selectItem.Item.UserLoginRole;
    var status=this.selectItem.Item.Status;
    var body:any={};
    body.WorkPermitNo = this.selectItem.Item.WorkPermitNo;
    if(status=="1")
      {
        body.ProjectManager=this.selectItem.Item.ProjectManager;
      }
    if(status=="3")
      {
        body.ZoneManager=this.selectItem.Item.ZoneManager;
      }
    if(status=="6")
      {
        body.SafeManager=this.selectItem.Item.SafeManager;
      }
    if(userLoginRole=="USER" && status=="1" && !this.selectItem.Item.ProjectManager)
     {
        this.toastService.warn(this.Message.WorkPermit.ProjectManager);
        return;
     }
     if(userLoginRole=="ProjectManager" && status=="3"  && !this.selectItem.Item.ZoneManager){
        this.toastService.warn(this.Message.WorkPermit.ZoneManager);   
        return;
     }
   
     if(userLoginRole=="ProjectManager" && status=="6" && !this.selectItem.Item.SafeManager){
       this.toastService.warn(this.Message.WorkPermit.SaleManager);
       return; 
     }
     
     
    this.service.sendWorkPermit(body).subscribe(response => {
   
      if (response.Code == 200) {
        this.toastService.success(this.Message.WorkPermit.SendSuccess);
        this.close(true);
      }
    }, (e) => { this.toastService.success(this.Message.WorkPermit.SendError);});
  }
 async onImage(){
  debugger;

    const modal = await this.modalCtrl.create({
      component: CameraImageModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        toastService: this.toastService,
        User:this.User,
        Message:this.Message
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data==true) {
        
      }
    });
    await modal.present();
  }
  onApproval(){
    debugger;
    var userLoginRole=this.selectItem.Item.UserLoginRole;
    var status=this.selectItem.Item.Status;
    if(status=="2" && userLoginRole=="ProjectManager")
    {
    //  this.selectItem.Item.Status="3";
      this.selectItem.Item.UserApproval=this.selectItem.Item.ProjectManager;
    }
    if(status=="5" && userLoginRole=="ZoneManager")
    {
      //this.selectItem.Item.Status="6";
      this.selectItem.Item.UserApproval=this.selectItem.Item.ZoneManager;
    }
    if(status=="8" && userLoginRole=="SafeManager")
    {
      //this.selectItem.Item.Status="9";
      this.selectItem.Item.UserApproval=this.selectItem.Item.SafeManager;
    }
    this.service.createApprovalWorkPermit(this.selectItem.Item).subscribe(response => {
      if (response.Code == 200) {
        this.toastService.success(this.Message.WorkPermit.Approval);
        this.close(true);
      }
    }, (e) => { 
         this.toastService.success(this.Message.WorkPermit.ApprovalError);
    });
  }
  onNoApproval(){
    debugger;
    var userLoginRole=this.selectItem.Item.UserLoginRole;
    var status=this.selectItem.Item.Status;
    if(status=="2" && userLoginRole=="ProjectManager")
    {
      //this.selectItem.Item.Status="4";
      this.selectItem.Item.UserApproval=this.selectItem.Item.ProjectManager;
    }
    if(status=="5" && userLoginRole=="ZoneManager")
    {
     // this.selectItem.Item.Status="7";
      this.selectItem.Item.UserApproval=this.selectItem.Item.ZoneManager;
    }
    if(status=="8" && userLoginRole=="SaleManager")
    {
     // this.selectItem.Item.Status="10";
      this.selectItem.Item.UserApproval=this.selectItem.Item.SaleManager;
    }
    this.service.createNoApprovalWorkPermit(this.selectItem.Item).subscribe(response => {
   
      if (response.Code == 200) {
        this.toastService.success(this.Message.WorkPermit.Approval);
        this.close(true);
      }
    }, (e) => { 
         this.toastService.success(this.Message.WorkPermit.ApprovalError);
    });
  }
  close(status) {
 
    this.modalCtrl.dismiss(status);
  }
  
  
}