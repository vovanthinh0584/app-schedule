import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { UserServiceModule } from 'src/app/providers/user/user-service.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      UserServiceModule,
      RouterModule.forChild(routes)
  ],
  declarations: [],
  entryComponents:[]
})
export class LoginPageModule {}
