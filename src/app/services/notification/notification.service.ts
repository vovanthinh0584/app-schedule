import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import api from '../../core/api';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpService } from '../../core/HttpService'
import { CommonServiceModule } from 'src/app/core/common-service.module';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: CommonServiceModule
})
export class NotificationService {
  api: any;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.api = api.api;
    HttpService.Client.http = httpClient;
  }

  GetTotalNotification(): Observable<any> {
    return HttpService.Client.post(`${api.api.url}${api.Notification.GetTotalNotification}`,null);
  }
  GetTotalNotificationNew(): Observable<any> {
    return HttpService.Client.post(`${api.api.url}${api.Notification.GetTotalNotificationNew}`,null);
  }
  GetListNotification(body: any): Observable<any> {
    return HttpService.Client.post(`${api.api.url}${api.Notification.GetListNotification}`, body);
  }
  UpdateNotification(body: any): Observable<any> {
    return HttpService.Client.post(`${api.api.url}${api.Notification.UpdateNotification}`, body);
  }
  
}
