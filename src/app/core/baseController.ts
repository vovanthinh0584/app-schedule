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
import { EventEmitterName } from './event-emitter-service';


export class BaseController
{
   eventEmitterService=EventEmitterName.EventEmitterService;
   selectKey:any="";
   fromState:string;
   selectItem:any={};
   Language:any={Title:""};
   fromName:any;
   toastService = ToastService.Toast;
   storageService = StorageService.Storage;
   httpService = HttpService.Client;
   isLoading=true;
   user:User;
   private _route: Router;
   Message:any={};
   pages:any= [
      {
          Title: 'Input Request',
          Url: '/main/input-request',
          Icon: 'aperture-outline',
          Code: 'MB001',
          Title_VN:"Nhập yêu cầu",
          Title_US:"Input Request",
      },
      {
          Title: 'Get Task',
          Url: '/main/get-task',
          Icon: 'nutrition-outline',
          Code: 'MB002',
          Title_VN:"Nhận phân công",
          Title_US:"Get Task",
      },
      {
         Title: 'Input Device Parameter',
         Url: '/main/input-device-parameter',
         Icon: 'file-tray-full-outline',
         Code: 'MB003',
         Title_VN:"Nhập thiết bị tham số",
         Title_US:"Input Device Parameter",
      },
      {
         Title: 'Sheet 033 Boiler',
         Url: '/main/sheet033-boiler',
         Icon: 'file-tray-full-outline',
         Code: 'MB004',
         Title_VN:"Sheet 033 Boiler",
         Title_US:"Sheet 033 Boiler",
      }
      ,
      {
         Title: 'Shift',
         Url: '/main/shift',
         Icon: 'file-tray-full-outline',
         Code: 'MB005',
         Title_VN:"Danh sách ca trực",
         Title_US:"List Shift",
      },
      {
         Title: 'Work Permision',
         Url: '/main/work-permision',
         Icon: 'file-tray-full-outline',
         Code: 'MB006',
         Title_VN:"Work Permision",
         Title_US:"Work Permision",
      }
    ]
  Permissions:any;
   constructor(){
     debugger
     this.user=this.storageService.getObject("userInfo");
     this.Permissions=[]
     this.selectItem.listLanguage=[{Lang:"en-US",Name:"English"},{Lang:"vi-VN",Name:"Việt Nam"}]
   }
   initializeApp(route:Router,httpClient:HttpClient,toastController:ToastController)
   {
      debugger;
      this._route=route;
      this.httpService.http=httpClient;
      this.toastService.toastController=toastController;
      this.eventEmitterService.changeStartLoading.emit({});
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
              page.Title=this.selectItem.Language=='vi-VN'?page.Title_VN:page.Title_US;
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
        
      this.eventEmitterService.changeTitle.emit(this.Language["Title"]);
   }
   getCaptionLanguage(formName:string,language:string):Observable<any>{
      return this.httpService.get(`${api.api.url}${api.Account.CaptionLanguage}?formName=${formName}&lang=${language}`);
  }
   
}