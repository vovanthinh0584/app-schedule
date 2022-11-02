import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import api from './api';
import { CommonServiceModule } from './common-service.module';
import { HttpService } from './HttpService';
import { StorageService } from './StorageService';
import { ToastService } from './ToastService';

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
  
   constructor(){
      debugger;
     this.user=this.storageService.getObject("userInfo");
     this.selectItem.Language=this.user.Language;
   }
   init(httpClient:HttpClient)
   {

      this.httpService.http=httpClient;
      
      this.setCaptionLanguage();
   }
   setCaptionLanguage(){
   
      this.getCaptionLanguage(this.fromName,this.selectItem.Language).subscribe((response)=>{
         debugger;
         this.handleLanguage(response);
      });
   }
   handleLanguage(response){
        for(var caption of response.data)
        {
             debugger;
             this.Language[caption["Caption"]]=caption["Field"];
        }
   }
   getCaptionLanguage(formName:string,language:string):Observable<any>{
      return this.httpService.get(`${api.api.url}${api.Account.CaptionLanguage}?formName=${formName}&lang=${language}`);
  }
   
}