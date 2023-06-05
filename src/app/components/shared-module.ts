import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BackbuttonComponent } from './backbutton-component/backbutton-component.component';


@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [BackbuttonComponent ],
    exports: [CommonModule, FormsModule,BackbuttonComponent]
})
export class SharedModule { }