import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { GetTaskComponent } from "./getTask.component";

const InputRequestRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: GetTaskComponent }
]
@NgModule({
  exports: [],
  declarations: [
    GetTaskComponent,
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
