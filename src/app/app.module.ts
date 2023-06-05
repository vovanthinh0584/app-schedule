import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginPageModule } from './pages/login/login.module';
import { HttpService } from './core/HttpService';
import { CommonServiceModule } from './core/common-service.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastService } from './core/ToastService';
import { MainComponent } from './pages/main/main.component';
import { IndexComponent } from './pages/index/index.component';
import { StorageService } from './core/StorageService';
import { BaseController } from './core/baseController';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { HttpConfigInterceptor } from './core/httpconfig.interceptor';
import { IonicGestureConfig } from './core/ionic-gesture-config';
import { UserServiceModule } from './services/user/user-service.module';
import { ErrorDialogService } from './core/errordialog.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/camera/ngx';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,MenuItemComponent],
  imports: [FormsModule,BrowserAnimationsModule,HttpClientModule,BrowserModule, IonicModule.forRoot({
    backButtonText: '',
  }), AppRoutingModule,LoginPageModule,CommonServiceModule,UserServiceModule],
  providers: [Camera,ErrorDialogService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 
})
export class AppModule {}
