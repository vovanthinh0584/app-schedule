import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { IndexComponent } from "./index.component";
import { InputRequestComponent } from "../inputRequest/inputRequest.component";

const routes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: 'page', component: IndexComponent, pathMatch: 'full' },
]


@NgModule({
  exports: [],
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  entryComponents:[IndexComponent]
})


export class IndexModule {
  constructor() {
  }

}
