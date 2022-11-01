import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export namespace HttpService {
export class Client{
  public static http:HttpClient;

  constructor() { 
    
  }
  public static get(url:string):Observable<any>{
 
      return this.http.get(url);
    }
    public  static post(url:string,T:any):Observable<any>{

        return this.http.post(url,T);
    }
    public static delete(url:string,T:any):Observable<any>{
    
      return this.http.delete(url,T);
    }
}
}