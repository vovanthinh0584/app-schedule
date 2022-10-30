import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { InputRequestComponent } from "../inputRequest/inputRequest.component";
import { MainComponent } from "./main.component";

export const mainRoutes: Routes = [
  {
    //localhost:4200/main
    path: '', component: MainComponent, children: [
      //localhost:4200/main
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {path:'inputRequest',component:InputRequestComponent}
      
      
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
