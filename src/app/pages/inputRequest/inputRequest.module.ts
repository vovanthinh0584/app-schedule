import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
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
  ],
  imports: [CommonModule, FormsModule,
    RouterModule.forChild(InputRequestRoutes)
  ],
  providers: []
})

export class InputRequestModule {
  constructor() {
  }

}
