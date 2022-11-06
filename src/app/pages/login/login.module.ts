import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { UserService } from 'src/app/services/user/user.service';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  entryComponents:[],
  providers: [
    UserService 
  ]
})
export class LoginPageModule {}
