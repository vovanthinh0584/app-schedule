import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MomentModule } from 'ngx-moment';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NotificationComponent } from "./notification.component";
import { IonicSelectableModule } from 'ionic-selectable';
import { NotificationService } from "src/app/services/notification/notification.service";
import { SharedModule } from "src/app/components/shared-module";
const routes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: NotificationComponent }
]
@NgModule({
  exports: [],
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    Ionic4DatepickerModule,
    MomentModule,
    IonicSelectableModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    SharedModule
  ],
  providers: [NotificationService],
  entryComponents: [NotificationComponent]
})

export class NotificationModule {
  constructor() {
  }

}

