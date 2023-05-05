import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
@Component({
  selector: 'app-input-device-parameter-modal',
  templateUrl: './inputDeviceParameterModal.component.html',
  styleUrls: ['./inputDeviceParameterModal.component.css']
})
export class InputDeviceParameterModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem: any;
  @Input() Message;
  @Input() CurrentItem: any;
  @Input() toastService: any;

  datePickerConfig: any = {
    //inputDate: new Date("2018-12-01");
    showTodayButton: false, // default true
    closeOnSelect: true, // default false
    setLabel: 'Set',  // default 'Set'
    todayLabel: 'Hôm nay', // default 'Today'
    closeLabel: 'Đóng', // default 'Close'
    titleLabel: 'Select a Date', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'MM/DD/YYYY', // default DD MMM YYYY
    clearButton: false, // default true
  };
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private inputDeviceParameterService: InputDeviceParameterService) {

    console.log(this.CurrentItem)

  }
  ngOnInit() {

    this.CurrentItem.Date = moment(this.CurrentItem.Date).format('MM/DD/YYYY');
  }
  ValidForm() {
    if (!this.CurrentItem.StandardValue) {
      this.toastService.warn(this.Message.InputDeviceParameter.StandardValue);
      return false;
    }
    if (!this.CurrentItem.Value) {
      this.toastService.warn(this.Message.InputDeviceParameter.Value);
      return false;
    }
    if (!this.CurrentItem.Confirm) {
      this.toastService.warn(this.Message.InputDeviceParameter.Confirm);
      return false;
    }
    return true;
  }
  save() {

    if (!this.ValidForm()) return;
    var body: any = {};
    body.BUID = this.selectItem.BUID;
    body.USERID = this.selectItem.UserID;
    body.Zone = this.CurrentItem.Zone;
    body.Shift = this.CurrentItem.Shift;
    body.Date = this.CurrentItem.Date;
    body.ChecklistID = this.CurrentItem.ChecklistID;
    body.StandardValue = this.CurrentItem.StandardValue;
    body.Value = this.CurrentItem.Value;
    body.Confirm = this.CurrentItem.Confirm;
    body.Time = this.CurrentItem.Time;
    body.Device = this.CurrentItem.Device;
    body.Id = this.CurrentItem.Id;

    this.inputDeviceParameterService.createInputDeviceParameter(body).subscribe(response => {

      var result = response;
      this.close(true);
    });
  }
  close(trangthai) {
    this.modalCtrl.dismiss(trangthai);
  }
}
