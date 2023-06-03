import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import * as moment from "moment";
import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { BaseController } from "src/app/core/baseController";
import { ListShiftService } from "src/app/services/listShift/list-shift.service";


@Component({
  selector: 'app-list-shift',
  templateUrl: './listShift.component.html',
  styleUrls: ['./listShift.scss'],
})
export class ListShiftComponent extends BaseController implements OnInit {

  expanded = {};
  timeout: any;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  selectedName: string = "";

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
  searchData: any = [];
  InputDate: any;
  listShift: any = [];
  constructor(private service: ListShiftService, private route: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, public httpClient: HttpClient, toastController: ToastController) {
    super();
    this.fromName = "SAFVIET_frmTruyVanDSDica";
    this.initializeApp(route, httpClient, toastController);
    this.InputDate = moment(new Date()).format('MM/DD/YYYY');

  }
  onSearch() {
    this.selectItem.Date = this.InputDate;
    this.service.SearchShift(this.selectItem).subscribe(x => {
      this.searchData = x.Data;
    })
  }
  ngOnInit() {
    this.getShifts();
  }
  getShifts() {
    this.service.getListShift().subscribe(x => {
      this.listShift = x.Data;
    })

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
