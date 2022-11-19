import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { GetTaskService } from "src/app/services/getTask/get-task.service";

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
  @Input() statuses: any;
  @Input() levels: any;
  @Input() worktypes: any;
  originalItem: any;
  isVerifierInformationDisabled: boolean = false;
  isReasonDisabled: boolean = false;

  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private getTaskService: GetTaskService) {

  }
  ngOnInit() {
    this.originalItem = { ...this.CurrentItem }
    console.log("originalItem", this.originalItem)

    if (this.CurrentItem.Status !== '3') {
      this.CurrentItem.VerifierInformation = '';
      this.isVerifierInformationDisabled = true;
    }
    else {
      this.isVerifierInformationDisabled = false;
    }
    if (this.CurrentItem.Status !== '4') {
      this.CurrentItem.Reason = '';
      this.isReasonDisabled = true;
    }
    else {
      this.isReasonDisabled = false;
    }
  }
  ValidForm() {
    if (!this.CurrentItem.Status) {
      this.toastService.warn(this.Message.GetTask.Status);
      return false;
    }
    if (parseInt(this.originalItem.Status) > parseInt(this.CurrentItem.Status)) {
      this.toastService.warn(this.Message.GetTask.SmallStatus);
      return false;
    }
    return true
  }
  save() {
    let body: any = {};
    body.WorkNo = this.CurrentItem.WorkNo;
    body.Status = this.CurrentItem.Status;
    body.VerifierInformation = this.CurrentItem.VerifierInformation;
    body.Reason = this.CurrentItem.Reason;

    if (this.ValidForm()) {
      this.getTaskService.CreateGetTask(body).subscribe(response => {
        if (response.Code == 200) {
          this.toastService.success(this.Message.GetTask.CreateSuccessfully);
          this.CurrentItem = {}
          this.close(true)
        }
      })
    }
  }

  close(trangthai) {
    this.modalCtrl.dismiss(trangthai);
  }

  handleSelectStatus(e) {
    if (parseInt(this.originalItem.Status) > parseInt(e.target.value)) {
      this.toastService.warn(this.Message.GetTask.SmallStatus);
      e.target.value = this.originalItem.Status;
    }
    if (e.target.value !== '3') {
      this.CurrentItem.VerifierInformation = '';
      this.isVerifierInformationDisabled = true;
    }
    else {
      this.isVerifierInformationDisabled = false;
    }

    if (e.target.value !== '4') {
      this.CurrentItem.Reason = '';
      this.isReasonDisabled = true;
    }
    else {
      this.isReasonDisabled = false;
    }
  }
}
