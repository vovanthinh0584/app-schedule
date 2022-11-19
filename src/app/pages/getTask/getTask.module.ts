import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MomentModule } from 'ngx-moment';
import { GetTaskComponent } from "./getTask.component";
import { GetTaskService } from "src/app/services/getTask/get-task.service";
import { GetTaskModalComponent } from "src/app/components/get-task/getTaskModal.component";

const routes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: GetTaskComponent }
]
@NgModule({
  exports: [],
  declarations: [
    GetTaskComponent,GetTaskModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    Ionic4DatepickerModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  providers: [GetTaskService],
})

export class InputRequestModule {
  constructor() {
  }

}
