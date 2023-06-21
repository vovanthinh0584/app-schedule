import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import { MomentModule } from "ngx-moment";
import { CameraImageModalComponent } from "src/app/components/camera-image/cameraImageModal.component";
import { InformationRequestModalComponent } from "src/app/components/information-request/informationRequestModal.component";
import { SendWorkPermitModalComponent } from "src/app/components/send-work-permit/sendWorkPermitModal.component";
import { WorkPermitModalComponent } from "src/app/components/work-permit/workPermitModal.component";
import { WorkPermitService } from "src/app/services/workPermit/work-permit.service";
import { WorkPermitComponent } from "./workPermit.component";
import { PinchZoomModule } from 'ngx-pinch-zoom';
// import { PinchZoomModule } from 'ngx-pinch-zoom';
import { MatMenuModule  } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from "src/app/components/shared-module";
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: WorkPermitComponent }
]
@NgModule({
  exports: [],
  declarations: [
    WorkPermitComponent,
    WorkPermitModalComponent,
    InformationRequestModalComponent,
    SendWorkPermitModalComponent,
    CameraImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    MatExpansionModule,
    Ionic4DatepickerModule,
    PinchZoomModule,
    MatMenuModule,
    MatButtonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [WorkPermitService], 
  entryComponents:[WorkPermitComponent,WorkPermitModalComponent,SendWorkPermitModalComponent,CameraImageModalComponent]
})

export class WorkPermitModule {
  constructor() {
  }

}
