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
  listClassifications: any = [
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "R",
      name: "Repair"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "PM",
      name: "Preventive maintenance"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "OP",
      name: "Operation"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "SP",
      name: "Support"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "CL",
      name: "Cleaning"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "RP",
      name: "Replace"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "SA",
      name: "Safety"
    },
  ];
  isBtnFinished=true;
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private getTaskService: GetTaskService) {

  }

  ngOnInit() {
   
    if(this.CurrentItem.Status=="Finished" || this.CurrentItem.Status=="Process")
    {
      this.isBtnFinished=false;
    }
    this.getTaskService.GetListType().subscribe(x=>{
      debugger;
      this.listClassifications=x.Data;
      this.CurrentItem.ClassificationName = this.listClassifications.find(x=>x.Classification == this.CurrentItem.Classification).name;
    }
      )
    
  }

  async onAssingerWork() {
    const modal = await this.modalCtrl.create({
      component: AssignerWorkModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        Message: this.Message,
        CurrentItem: this.CurrentItem,
        toastService: this.toastService,
      }
    });
    modal.onDidDismiss().then((data: any) => {
      debugger;
      var result=data.data;
      if (result.status == true) {
         this.CurrentItem=result.item;
      }
    });
    await modal.present();
  }
  onFinisherWork() {
    this.getTaskService.FinishedTask(this.CurrentItem).subscribe(x => {
      if (x.Data == 1) {
        this.toastService.success(this.Message.GetTask.FinishedSuccessfully);
        this.close(true);
      }
      else {
        this.toastService.success(this.Message.GetTask.FinishedError);
        this.close(false);
      }
    })
  }

  close(trangthai) {
    this.modalCtrl.dismiss(trangthai);
  }


}
