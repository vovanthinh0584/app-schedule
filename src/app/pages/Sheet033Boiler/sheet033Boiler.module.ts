import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import { SharedModule } from "src/app/components/shared-module";
import { Sheet033BoilerService } from "src/app/services/sheet033Boiler/Sheet033Boiler.service";

import { Sheet033BoilerComponent } from "./Sheet033Boiler.component";

const routes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: '', component: Sheet033BoilerComponent }
]
@NgModule({
  exports: [],
  declarations: [
    Sheet033BoilerComponent ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    Ionic4DatepickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [Sheet033BoilerService],
  entryComponents:[Sheet033BoilerComponent]
})

export class Sheet033BoilerModule {
  constructor() {
  }

}
