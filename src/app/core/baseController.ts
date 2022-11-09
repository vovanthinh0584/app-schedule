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
import {MessageUS} from './message.us'
import {MessageVN} from './message.vn'
export class BaseController
{
   selectKey:any="";
   fromState:string;
   selectItem:any={};
   Language:any={};
   fromName:any;
   toastService = ToastService.Toast;
   storageService = StorageService.Storage;
   httpService = HttpService.Client;
   user:User;
   private _route: Router;
   Message:any={};
   pages:any= [
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
  Permissions:any;
   constructor(){
     
     this.user=this.storageService.getObject("userInfo");
     this.Permissions=[]
     this.selectItem.listLanguage=[{Lang:"en-US",Name:"English"},{Lang:"vi-VN",Name:"Việt Nam"}]
   }
   initializeApp(route:Router,httpClient:HttpClient,toastController:ToastController)
   {
      this._route=route;
      this.httpService.http=httpClient;
      this.toastService.toastController=toastController;
      if(this.user==null)
      {
         this._route.navigate([`/login`], { replaceUrl: true });
         this.user=new User();
         this.user=this.selectItem.Language;
      }
      else
      {
         this.selectItem.UserID=this.user.userID;
         this.selectItem.BUID=this.user.businessUnitID;
         this.selectItem.Language=this.user.language;
         if(this.user.permissions!=null)
         {
            for(var permison of this.user.permissions)
            {
              var page=this.pages.find(x=>x["code"]==permison);
              this.Permissions.push(page);
       
            }
         }
         
   
      }
      this.setMessage();
      this.setCaptionLanguage();
   }
   setMessage(){
      debugger;
      this.Message=this.selectItem.Language==="vi-VN"?MessageVN:MessageUS;
   }
   setCaptionLanguage(){
      this.getCaptionLanguage(this.fromName,this.selectItem.Language).subscribe((response)=>{
         this.handleLanguage(response);
      });
   }
   handleLanguage(response){
        for(var caption of response.data)
        {
             this.Language[caption["Caption"]]=caption["Field"];
        }
   }
   getCaptionLanguage(formName:string,language:string):Observable<any>{
      return this.httpService.get(`${api.api.url}${api.Account.CaptionLanguage}?formName=${formName}&lang=${language}`);
  }
   
}