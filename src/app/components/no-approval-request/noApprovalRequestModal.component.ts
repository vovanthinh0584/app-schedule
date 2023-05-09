import { InputRequestService } from '../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";

@Component({
  selector: 'app-no-approval-request-modal',
  templateUrl: './noApprovalRequestModal.component.html',
  styleUrls: ['./noApprovalRequestModal.component.css'],
})
export class NoApprovalRequestModalComponent implements OnInit {
  @Input() Language;
  @Input() Item;
  @Input() toastService;
  @Input() Message;
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
  
    console.log("NoApprovalRequestModalComponent")
   
  }
 
  ngOnInit() {
  
    

  }
  
 
  onSave(){
    this.service.createNoApprovalRequest(this.Item).subscribe(response => {
      if (response.Code == 200) {
        this.toastService.success(this.Message.InputRequest.Success);
        this.close(true);
      }
    }, (e) => { });
  }
  close(status) {
    this.modalCtrl.dismiss(status);
  }
}