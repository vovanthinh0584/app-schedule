import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { InputRequestModalComponent } from "src/app/components/input-request/inputRequestModal.component";
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
    InputRequestModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(InputRequestRoutes)
  ],
  providers: [InputRequestService], 
  entryComponents:[InputRequestComponent,InputRequestModalComponent]
})

export class InputRequestModule {
  constructor() {
  }

}
