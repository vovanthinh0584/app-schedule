import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginPageModule } from './pages/login/login.module';
import { HttpService } from './core/HttpService';
import { CommonServiceModule } from './core/common-service.module';
import {HttpClientModule} from '@angular/common/http';
import { ToastService } from './core/ToastService';
import { MainComponent } from './pages/main/main.component';
import { StorageService } from './core/StorageService';
import { BaseController } from './core/baseController';

@NgModule({
  declarations: [AppComponent,MainComponent],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,LoginPageModule,CommonServiceModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
 
})
export class AppModule {}
