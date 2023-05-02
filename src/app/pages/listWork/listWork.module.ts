import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";

import { MatExpansionModule } from "@angular/material/expansion";
import { MomentModule } from 'ngx-moment';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListWorkComponent } from "./listWork.component";
import { GetTaskModalComponent } from "src/app/components/get-task/getTaskModal.component";
import { GetTaskService } from "src/app/services/getTask/get-task.service";
import { AssignerWorkModalComponent } from "src/app/components/assigner-work/assignerWorkModal.component";
import { IonicSelectableModule } from 'ionic-selectable';
const routes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: ListWorkComponent }
]
@NgModule({
  exports: [],
  declarations: [
    ListWorkComponent, GetTaskModalComponent,AssignerWorkModalComponent
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
  ],
  providers: [GetTaskService],
  entryComponents: [ListWorkComponent, GetTaskModalComponent,AssignerWorkModalComponent]
})

export class ListWorkModule {
  constructor() {
  }

}

