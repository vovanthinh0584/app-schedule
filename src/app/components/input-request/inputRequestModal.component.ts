import { InputRequestService } from './../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
@Component({
  selector: 'app-input-request-modal',
  templateUrl: './inputRequestModal.component.html',
  styleUrls: ['./inputRequestModal.component.css'],
})
export class InputRequestModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;

  Locations: [];
  WorkShops: [];

  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: InputRequestService) {
    console.log("InputRequestModalComponent Constructor", this.Language)
    this.Language = {
      Exit: "Thoát",
      LocationId: "Vị trí",
      Reason: "Lý do",
      RequestedContent: "Nội dung yêu cầu",
      Save: "Lưu",
      WorkerName: "Tên nhân viên",
      WorkshopId: "Xưởng",
    }
  }
  ngOnInit() {
    console.log("InputRequestModalComponent ngOnInit", this.Language)

    this.service.queryLocations().subscribe(response => {
      console.log(response)
      this.Locations = response;
    });

    this.service.queryWorkshops().subscribe(response => {
      console.log(response)
      this.WorkShops = response;
    });
  }
  save() {
    let body: any = {};
    body.WorkshopId       = this.selectItem.WorkshopId;
    body.LocationId       = this.selectItem.LocationId;
    body.WorkerName       = this.selectItem.WorkerName;
    body.RequestedContent = this.selectItem.RequestedContent;
    body.Reason           = this.selectItem.Reason;

    this.service.createInputRequest(body).subscribe(response => {
      if (response.code == 200) {
        this.toastService.success(response.data);
        
        this.selectItem.WorkshopId=null;
        this.selectItem.LocationId=null;
        this.selectItem.WorkerName=null;
        this.selectItem.RequestedContent=null;
        this.selectItem.Reason=null;
      }
    }, (e) => { });
  }
  close() {
    this.modalCtrl.dismiss();
  }
}