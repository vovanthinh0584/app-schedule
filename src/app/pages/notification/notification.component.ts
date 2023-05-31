import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { GetTaskModalComponent } from "src/app/components/get-task/getTaskModal.component";
import { BaseController } from "src/app/core/baseController";
import { GetTaskService } from "src/app/services/getTask/get-task.service";
import * as moment from "moment";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.scss'],
})
export class NotificationComponent extends BaseController implements OnInit {
  listWorkType: any
  levels: any
  statuses: any
  constructor(private getTaskService: GetTaskService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "SAFVIET_frmWorks";
    this.initializeApp(route, httpClient, toastController);

  }

  
  ngOnInit(): void {
   
   
  }
  onSearch(){
      this.getTaskService.QueryGetTask(this.selectItem).subscribe(x=>{
        this.selectItem.ListWork = x.Data;
      })
  }
}
