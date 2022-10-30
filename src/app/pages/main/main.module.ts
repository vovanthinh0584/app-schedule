import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { GetTaskComponent } from "../getTask/getTask.component";
import { InputDeviceParameterComponent } from "../inputDeviceParameter/inputDeviceParameter.component";
import { InputRequestComponent } from "../inputRequest/inputRequest.component";
import { MainComponent } from "./main.component";

export const mainRoutes: Routes = [
  {
    //localhost:4200/main
    path: '', component: MainComponent, children: [
      //localhost:4200/main
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {path:'inputRequest',component:InputRequestComponent},
      {path:'getTask',component:GetTaskComponent},
      {path:'inputDeviceParameter',component:InputDeviceParameterComponent}
      
      
    ]
  }

]
@NgModule({
  exports: [],
  declarations: [
     MainComponent,
     InputRequestComponent
  ],
  imports: [CommonModule, FormsModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: []
})

export class MainModule {
  constructor() {
  }

}
