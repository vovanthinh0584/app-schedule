import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { InputDeviceParameterModalComponent } from "src/app/components/input-device-parameter/inputDeviceParameterModal.component";
import { SharedModule } from "src/app/components/shared-module";
import { InputDeviceParameterService } from "src/app/services/inputDeviceParameter/input-device-parameter.service";
import { InputDeviceParameterComponent } from "./inputDeviceParameter.component";

const routes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: InputDeviceParameterComponent }
]
@NgModule({
  exports: [],
  declarations: [
    InputDeviceParameterComponent,InputDeviceParameterModalComponent ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [InputDeviceParameterService],
  entryComponents:[InputDeviceParameterComponent,InputDeviceParameterModalComponent]
})

export class InputDeviceParameterModule {
  constructor() {
  }

}
