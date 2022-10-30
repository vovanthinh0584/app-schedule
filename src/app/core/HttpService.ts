import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(public http: HttpClient) { }
    get(url:string):Observable<any>{
      return this.http.get<any>(url);
    }
    post(url:string,T:any):Observable<any>{
        return this.http.post<any>(url,T);
    }
    delete(url:string,T:any):Observable<any>{
      return this.http.delete(url,T);
    }
}