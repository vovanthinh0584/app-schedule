import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { GetTaskService } from "src/app/services/getTask/get-task.service";
import { AssignerWorkModalComponent } from "../assigner-work/assignerWorkModal.component";

@Component({
  selector: 'app-get-task-modal',
  templateUrl: './getTaskModal.component.html',
  styleUrls: ['./getTaskModal.component.css']
})
export class GetTaskModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem: any;
  @Input() Message;
  @Input() CurrentItem: any;
  @Input() toastService: any;


  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private getTaskService: GetTaskService) {

  }
  ngOnInit() {
   
  }
  
  async onAssingerWork(){
    const modal = await this.modalCtrl.create({
      component: AssignerWorkModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        Message: this.Message,
        CurrentItem: this.CurrentItem,
        toastService: this.toastService
        
      }
    });
    modal.onDidDismiss().then((data: any) => { 
      
      if (data.data == true) {
       // this.loadData();
      }
    });
    await modal.present();
  }
  onFinisherWork(){
     this.getTaskService.FinishedTask(this.CurrentItem).subscribe(x=>{
      if(x.Data==1)
      {
        this.toastService.success(this.Message.GetTask.FinishedSuccessfully);
        this.close(true);
      }
      else
      {
        this.toastService.success(this.Message.GetTask.FinishedError);
        this.close(false);
      }
     })
  }

  close(trangthai) {
    this.modalCtrl.dismiss(trangthai);
  }

 
}
