import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MainComponent } from "./main.component";

export const mainRoutes: Routes = [
  {
    //localhost:4200/main
    path: '', component: MainComponent, children: [
      //localhost:4200/main
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'request', loadChildren: () => import('../inputRequest/inputRequest.module').then( m => m.InputRequestModule)},
      { path: 'list-work', loadChildren: () => import('../listWork/listWork.module').then( m => m.ListWorkModule)},
      { path: 'input-device-parameter', loadChildren: () => import('../inputDeviceParameter/inputDeviceParameter.module').then( m => m.InputDeviceParameterModule)},
      { path: 'work-permit', loadChildren: () => import('../workPermit/workPermit.module').then( m => m.WorkPermitModule)},
      { path: 'list-shift', loadChildren: () => import('../listShift/listShift.module').then( m => m.ListShiftModule)},
    ]
  }

]
@NgModule({
  exports: [],
  declarations: [
     MainComponent
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
