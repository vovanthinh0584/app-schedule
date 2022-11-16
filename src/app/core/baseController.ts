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
          Title: 'Input Request',
          Url: '/main/input-request',
          Icon: 'person',
          Code: 'MB001'
      },
      {
          Title: 'Get Task',
          Url: '/main/get-task',
          Icon: 'person',
          Code: 'MB002'
      },
      {
         Title: 'Input Device Parameter',
         Url: '/main/input-device-parameter',
         Icon: 'person',
         Code: 'MB003'
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
         this.selectItem.UserID=this.user.UserID;
         this.selectItem.BUID=this.user.BusinessUnitID;
         this.selectItem.Language=this.user.Language;
         if(this.user.Permissions!=null)
         {
            for(var permison of this.user.Permissions)
            {
       
              var page=this.pages.find(x=>x["Code"]==permison);
              this.Permissions.push(page);
       
            }
         }
         
   
      }
      this.setMessage();
      this.setCaptionLanguage();
   }
   setMessage(){
   
      this.Message=this.selectItem.Language==="vi-VN"?MessageVN:MessageUS;
   }
   setCaptionLanguage(){
      this.getCaptionLanguage(this.fromName,this.selectItem.Language).subscribe((response)=>{
         this.handleLanguage(response);
      });
   }
   handleLanguage(response){
        for(var caption of response.Data)
        {
             this.Language[caption["Caption"]]=caption["Field"];
        }
   }
   getCaptionLanguage(formName:string,language:string):Observable<any>{
      return this.httpService.get(`${api.api.url}${api.Account.CaptionLanguage}?formName=${formName}&lang=${language}`);
  }
   
}