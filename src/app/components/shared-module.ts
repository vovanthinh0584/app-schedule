import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
    imports: [CommonModule, IonicModule ],
 
    exports: [CommonModule, FormsModule]
})
export class SharedModule { }