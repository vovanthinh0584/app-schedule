import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { GetTaskModalComponent } from "src/app/components/get-task/getTaskModal.component";
import { BaseController } from "src/app/core/baseController";
import { GetTaskService } from "src/app/services/getTask/get-task.service";
import * as moment from "moment";

@Component({
  selector: 'app-list-task',
  templateUrl: './listWork.component.html',
  styleUrls: ['./listWork.scss'],
})
export class ListWorkComponent extends BaseController implements OnInit {
  listWorkType: any
  levels: any
  statuses: any
  constructor(private getTaskService: GetTaskService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "SAFVIET_frmWorks";
    this.initializeApp(route, httpClient, toastController);

  }

  declareListValue() {
    this.listWorkType = [
      {
        worktypeId: "1",
        worktypeName: "Nội dung công việc",
      },
      {
        worktypeId: "2",
        worktypeName: "Nhân viên",
      },
      {
        worktypeId: "3",
        worktypeName: "Nhóm nhân viên",
      }
    ]
    this.levels = [
      {
        levelId: "1",
        levelName: "High"
      },
      {
        levelId: "2",
        levelName: "Medium"
      },
      {
        levelId: "3",
        levelName: "Low"
      }
    ]
    this.statuses = [
      {
        statusId: "1",
        statusName: "Open"
      },
      {
        statusId: "2",
        statusName: "Processing"
      },
      {
        statusId: "3",
        statusName: "Finished"
      },
      {
        statusId: "4",
        statusName: "Cancel"
      }
    ]
  }
  ngOnInit(): void {
    this.declareListValue()
   
  }
  onSearch(){
      this.getTaskService.QueryGetTask(this.selectItem).subscribe(x=>{
        this.selectItem.ListWork = x.Data;
      })
  }
 async onDetail(item){
    const modal = await this.modalCtrl.create({
      component: GetTaskModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        Message: this.Message,
        CurrentItem: item,
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

  onFinishedData(WorkNo) {
    this.getTaskService.FinishedTask(WorkNo).subscribe(response => {
      if (response.Code == 200) {
        this.toastService.success(this.Message.GetTask.FinishedSuccessfully);
      }
    })
  }


  
}
