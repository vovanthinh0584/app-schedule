import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import api from './api';
import { HttpService } from './HttpService';
import { StorageService } from './StorageService';
import { ToastService } from './ToastService';

export class BaseController {
   selectKey: any = "";
   fromState: string;
   selectItem: any = {};
   Language: any = {};
   formName: any;
   toastService = ToastService.Toast;
   storageService = StorageService.Storage;
   httpService = HttpService.Client;
   user: User;
   private _route: Router;
   pages: any = [
      {
         title: 'Input Request',
         url: '/main/input-request',
         icon: 'person',
         code: 'MB001'
      },
      {
         title: 'Get Task',
         url: '/main/get-task',
         icon: 'person',
         code: 'MB002'
      },
      {
         title: 'Input Device Parameter',
         url: '/main/input-device-parameter',
         icon: 'person',
         code: 'MB003'
      }
   ]
   Permissions: any;
   constructor() {

      this.user = this.storageService.getObject("userInfo");
      this.Permissions = []
      this.selectItem.listLanguage = [{ Lang: "en-US", Name: "English" }, { Lang: "vi-VN", Name: "Việt Nam" }]

      //this.selectItem.Language=this.user.Language;
   }
   initializeApp(route: Router, httpClient: HttpClient, toastController: ToastController, ) {
      console.log('formName', this.formName);
      this._route = route;
      this.httpService.http = httpClient;
      this.toastService.toastController = toastController;
      if (this.user == null) {

         this._route.navigate([`/login`], { replaceUrl: true });
      }
      else {
         this.selectItem.UserID = this.user.userID;
         this.selectItem.BUID = this.user.businessUnitID;
         this.selectItem.Language = this.user.language;
         for (var permison of this.user.permissions) {

            var page = this.pages.find(x => x["code"] == permison);
            this.Permissions.push(page);

         }

      }
      this.setCaptionLanguage();
   }
   setCaptionLanguage() {

      this.getCaptionLanguage(this.formName, this.selectItem.Language).subscribe((response) => {
         this.handleLanguage(response);
      });
   }
   handleLanguage(response) {
      console.log("handleLanguage", response)
      for (var caption of response.data) {
         this.Language[caption["Caption"]] = caption["Field"];
      }
      console.log("Language",this.Language)
   }
   getCaptionLanguage(formName: string, language: string): Observable<any> {
      return this.httpService.get(`${api.api.url}${api.Account.CaptionLanguage}?formName=${formName}&lang=${language}`);
   }

}