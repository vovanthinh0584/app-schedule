import { Injectable } from "@angular/core";
import { CommonServiceModule } from "./common-service.module";

@Injectable({
  providedIn: CommonServiceModule
})
export class StorageService{
   get(key:string){
        const oValue: string = localStorage.getItem(key);
        if (oValue === null || typeof oValue === "undefined" || oValue === "undefined") {
          return null;
        }
        else {
          return oValue;
        }
    }
     getObject(key:string){
        const oValue: any = this.get(key);
        try {
         var  data = JSON.parse(oValue);
        } catch (error) {
            data = null;
        }
        return data;
      }
     remove(key: string): void {
        localStorage.removeItem(key);
      }
      clear(): void {
        localStorage.clear();
      }
      set(key:string,value:string){
        localStorage.setItem(key, value);
      }
      setObject(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value));
      } 
 
}