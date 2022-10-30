import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { InputDeviceParameterComponent } from "./inputDeviceParameter.component";

const InputRequestRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: InputDeviceParameterComponent }
]
@NgModule({
  exports: [],
  declarations: [
    InputDeviceParameterComponent  ],
  imports: [CommonModule, FormsModule,
    RouterModule.forChild(InputRequestRoutes)
  ],
  providers: []
})

export class InputDeviceParameterModule {
  constructor() {
  }

}
