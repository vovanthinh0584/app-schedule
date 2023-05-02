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
import * as _ from 'lodash';   
import { nextSortDir } from '@swimlane/ngx-datatable';

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
          Title: 'Request',
          Url: '/main/request',
          Icon: 'aperture-outline',
          Code: 'MB001',
          Title_VN:"Yêu cầu",
          Title_US:"Request",
      },
      {
         Title: 'Device Parameter',
         Url: '/main/input-device-parameter',
         Icon: 'file-tray-full-outline',
         Code: 'MB002',
         Title_VN:"Thiết bị tham số",
         Title_US:"Device Parameter",
      },
      {
         Title: 'Shift',
         Url: '/main/list-shift',
         Icon: 'file-tray-full-outline',
         Code: 'MB003',
         Title_VN:"Danh sách đi ca",
         Title_US:"List Shift",
      },
      {
         Title: 'List work',
         Url: '/main/list-work',
         Icon: 'nutrition-outline',
         Code: 'MB004',
         Title_VN:"Danh sách công việc",
         Title_US:"List work",
     },
      {
         Title: 'Work Permision',
         Url: '/main/work-permit',
         Icon: 'file-tray-full-outline',
         Code: 'MB005',
         Title_VN:"Giấy phép làm việc",
         Title_US:"Work Permit",
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
            var distinctPermissions=_.uniq(this.user.Permissions);
            for(var permison of distinctPermissions)
            {
              var page=this.pages.find(x=>x["Code"]==permison);
              if(page==undefined)
               {
                  continue;
               }
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