import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MenuItemComponent } from "src/app/components/menu-item/menu-item.component";
import { GetTaskComponent } from "../getTask/getTask.component";
import { InputDeviceParameterComponent } from "../inputDeviceParameter/inputDeviceParameter.component";
import { InputRequestComponent } from "../inputRequest/inputRequest.component";
import { MainComponent } from "./main.component";

export const mainRoutes: Routes = [
  {
    //localhost:4200/main
    path: '', component: MainComponent, children: [
      //localhost:4200/main
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'input-request', loadChildren: () => import('../inputRequest/inputRequest.module').then( m => m.InputRequestModule)},
      { path: 'get-task', loadChildren: () => import('../getTask/getTask.module').then( m => m.InputRequestModule)},
      { path: 'input-device-parameter', loadChildren: () => import('../inputDeviceParameter/inputDeviceParameter.module').then( m => m.InputDeviceParameterModule)},
    ]
  }

]
@NgModule({
  exports: [],
  declarations: [
     MainComponent,
     InputRequestComponent
     
  ],
  imports: [CommonModule, FormsModule,IonicModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: []
})

export class MainModule {
  constructor() {
  }
 
}
