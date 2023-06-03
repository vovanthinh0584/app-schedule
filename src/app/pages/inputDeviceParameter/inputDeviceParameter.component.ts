import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import * as moment from "moment";
import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { BaseController } from "src/app/core/baseController";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-input-device-parameter',
  templateUrl: './inputDeviceParameter.component.html',
  styleUrls: ['./input-device-parameter.scss'],
})
export class InputDeviceParameterComponent extends BaseController implements OnInit {

  expanded = {};
  timeout: any;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  selectedName: string = "";

  // datePickerConfig: any = {
  //   showTodayButton: false, // default true
  //   closeOnSelect: true, // default false
  //   setLabel: 'Set',  // default 'Set'
  //   todayLabel: 'Hôm nay', // default 'Today'
  //   closeLabel: 'Đóng', // default 'Close'
  //   titleLabel: 'Select a Date', // default null
  //   monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
  //   weeksList: ["S", "M", "T", "W", "T", "F", "S"],
  //   dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
  //   clearButton: false, // default true
  // };

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

  InputDate: any;
  constructor(private inputDeviceParameterService: InputDeviceParameterService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "frminputDeviceParameter";
    this.initializeApp(route, httpClient, toastController);
    this.InputDate = moment(new Date()).format('MM/DD/YYYY');
  }


  getInformationInputDeviceParameter() {
    this.inputDeviceParameterService.getInformation().subscribe((response) => {

      var result = response.data;
      // this.selectItem.listAsset = response.Data.listAsset;
      // this.selectItem.listOperating = response.Data.listOperating;
      // this.selectItem.listUM = response.Data.listUM;
      //this.selectItem.Device = response.Data.devices[0].DeviceId;

      this.selectItem.zones = response.Data.zones;
      this.selectItem.shifts = response.Data.shifts;
      this.selectItem.devices = response.Data.devices;
      this.selectItem.times = response.Data.times;

      this.onSearch();
    })
  }
  getParameter() {
    let params = {
      BUID: this.selectItem.BUID,
      LANG: this.selectItem.Language,
      USERID: this.selectItem.UserID,
      Device: this.selectItem.Device != null ? this.selectItem.Device.DeviceId : null,
      InputDate: this.selectItem.InputDate,
      Zone: this.selectItem.Zone,
      Shift: this.selectItem.Shift,
      Time: this.selectItem.Time,
    }

    this.inputDeviceParameterService.getParameter(params).subscribe((response) => {

      this.selectItem.ListAssetOperation = response.Data.map((x) => {
        x.DeviceName = this.selectItem.devices.find(y => y.DeviceId === x.Device).DeviceName
        console.log(x);
        return x;
      })
    })
  }

  async getListSheet() {
    await this.inputDeviceParameterService.GetShiftsAttime({ BUID: this.selectItem.BUID, ShiftID: this.selectItem.Shift }).subscribe(rs => {

      this.selectItem.listSheetAtime = rs.Data
    });
  }

  onShiftChange(e) {
    this.getListSheet();
  }

  onSearch() {
    this.selectItem.InputDate = this.InputDate;
    this.getParameter();
  }

  onEndInput() {
    let params = {
      BUID: this.selectItem.BUID,
      LANG: this.selectItem.Language,
      USERID: this.selectItem.UserID,
      Device: this.selectItem.Device != null ? this.selectItem.Device.DeviceId : null
    }

    this.inputDeviceParameterService.closeInput(params).subscribe((response) => {
      console.log(response);
    })
  }


  ngOnInit() {
    this.getInformationInputDeviceParameter();
  }
  onSelectdData(data) {
    this.openInputDeviceParameterModal(data);
  }
  async openInputDeviceParameterModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: InputDeviceParameterModalComponent,
      componentProps: {
        Language: this.Language,
        selectItem: this.selectItem,
        Message: this.Message,
        CurrentItem: item,
        toastService: this.toastService
      }
    });
    modal.onDidDismiss().then((data: any) => {

      if (data.TRANGTHAI == true) {
        this.onSearch();
      }
    });
    await modal.present();
  }
  ngAfterContentChecked() {
    if (this.routeUrl !== '/main/index/page') {
      this.eventEmitterService.changeVisibleNotification.emit({ result: false });
    }
    else {
      this.eventEmitterService.changeVisibleNotification.emit({ result: true });
    }
  }
}
