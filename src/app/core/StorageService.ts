import { Injectable } from "@angular/core";
import { CommonServiceModule } from "./common-service.module";

export namespace StorageService{
  export class Storage{
    static get(key:string){
         const oValue: string = localStorage.getItem(key);
         if (oValue === null || typeof oValue === "undefined" || oValue === "undefined") {
           return null;
         }
         else {
           return oValue;
         }
     }
     static  getObject(key:string){
         const oValue: any = this.get(key);
         try {
          var  data = JSON.parse(oValue);
         } catch (error) {
             data = null;
         }
         return data;
       }
       static   remove(key: string): void {
         localStorage.removeItem(key);
       }
       static   clear(): void {
         localStorage.clear();
       }
       static  set(key:string,value:string){
         localStorage.setItem(key, value);
       }
       static  setObject(key:string,value:any){
         localStorage.setItem(key,JSON.stringify(value));
       } 
  
 }
}
