import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonFab } from '@ionic/angular';

@Component({
  selector: 'app-fab-menu',
  // templateUrl: './fab-menu.component.html',       // TODO dkqn, qthp
  // templateUrl: './fab-menu-dkpd.component.html',       // TODO dkpd
  templateUrl: './fab-menu-dkhp.component.html',  // TODO dkhp, vinhbao
  // templateUrl: './fab-menu-sndn.component.html',  // TODO sndn
  // templateUrl: './fab-menu-105.component.html', // TODO 105, yhctdn

  styleUrls: ['./fab-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FabMenuComponent implements OnInit {
  @ViewChild('fab') fab: IonFab;
  @Input() params: any;
  classFab = 'fab-off';

  constructor(private router: Router) { }

  ngOnInit() { }
  menuClick(route) {
    console.log(this.params);
    this.router.navigate([
      `ho-so-benh-an/${this.params.BenhAn_Id}/${this.params.BenhNhan_Id}/${route}`,
    ]);
  }
  fabClick($event) {
    if (this.fab.activated) {
      this.classFab = 'fab-off';
    } else {
      this.classFab = 'fab-on';
    }
    //this.commonService.onFabOpen.emit(this.fab.activated);
  }
}
