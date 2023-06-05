import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import { MomentModule } from "ngx-moment";
import { InformationRequestModalComponent } from "src/app/components/information-request/informationRequestModal.component";
import { InputRequestModalComponent } from "src/app/components/input-request/inputRequestModal.component";
import { NoApprovalRequestModalComponent } from "src/app/components/no-approval-request/noApprovalRequestModal.component";
import { SharedModule } from "src/app/components/shared-module";
import { InputRequestService } from "src/app/services/inputRequest/input-request.service";
import { InputRequestComponent } from "./inputRequest.component";

const InputRequestRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: InputRequestComponent }
]
@NgModule({
  exports: [],
  declarations: [
    InputRequestComponent,
    InputRequestModalComponent,
    InformationRequestModalComponent,
    NoApprovalRequestModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    MatExpansionModule,
    Ionic4DatepickerModule,
    SharedModule,
    RouterModule.forChild(InputRequestRoutes)
  ],
  providers: [InputRequestService], 
  entryComponents:[InputRequestComponent,InputRequestModalComponent,NoApprovalRequestModalComponent]
})

export class InputRequestModule {
  constructor() {
  }

}
