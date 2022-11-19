import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { GetTaskModalComponent } from "src/app/components/get-task/getTaskModal.component";
import { BaseController } from "src/app/core/baseController";
import { GetTaskService } from "src/app/services/getTask/get-task.service";

@Component({
  selector: 'app-get-task',
  templateUrl: './getTask.component.html',
  styleUrls: ['./get-Task.scss'],
})
export class GetTaskComponent extends BaseController implements OnInit {
  worktypes: any
  levels: any
  statuses: any
  constructor(private getTaskService: GetTaskService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "frminputDeviceParameter";
    this.initializeApp(route, httpClient, toastController);

  }
  declareListValue() {
    this.worktypes = [
      {
        worktypeId: "01",
        worktypeName: "Xử lý đột xuất",
      },
      {
        worktypeId: "02",
        worktypeName: "Bảo trì định kỳ",
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
    this.loadData();
  }

  loadData(): void {
    this.getTaskService.QueryGetTask().subscribe((response) => {
      console.log("response", response)
      this.selectItem.GetTasks = []

      response.Data.forEach(element => {
        let getTaskObject = {
          Level: element.Level,
          LevelName: this.levels.find(x => x.levelId == element.Level).levelName,
          Reason: element.Reason,
          RequestOrPlanNo: element.RequestOrPlanNo,
          RequestedContent: element.RequestedContent,
          Status: element.Status,
          StatusName: this.statuses.find(x => x.statusId == element.Status).statusName,
          WorkNo: element.WorkNo,
          WorkType: element.WorkType,
          WorkTypeName: this.worktypes.find(x => x.worktypeId == element.WorkType).worktypeName
        }
        this.selectItem.GetTasks.push(getTaskObject)
      }
      );
    })

  }

  onSelectdData(data) {
    this.openInputDeviceParameterModal(data);
  }
  async openInputDeviceParameterModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: GetTaskModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        Message: this.Message,
        CurrentItem: item,
        toastService: this.toastService,
        worktypes: this.worktypes,
        levels: this.levels,
        statuses: this.statuses
      }
    });
    modal.onDidDismiss().then((data: any) => {
      debugger;
      if (data.data == true) {
        this.loadData();
      }
    });
    await modal.present();
  }
}
