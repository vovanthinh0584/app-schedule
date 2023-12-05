﻿import { Injectable, Component, Inject, ChangeDetectorRef } from '@angular/core';
import { ErrorDialogService } from './errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,

    HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap, timeout, retry, retryWhen } from 'rxjs/operators';
import { LoadingDialogService } from './loading-dialog.service';
import { AlertController, ActionSheetController, PopoverController, ModalController } from '@ionic/angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/observable/throw'; 
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';

import { StorageService } from './StorageService';

import { UserService } from '../services/user/user.service';
import { EventEmitterName } from './event-emitter-service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    eventEmitterService=EventEmitterName.EventEmitterService;
    constructor(public errorDialogService: ErrorDialogService, public loadingDialogService: LoadingDialogService, private userService: UserService,
        private popoverCtrl: PopoverController, private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController,
        public http: HttpClient, public dialog: AlertController, private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // debugger;
        if (request.headers.has('showSpinner') == false || request.headers.get('showSpinner') != 'false') {
            console.log('showSpinner')
            this.loadingDialogService.onStarted(request);
           
        }
      
  
        var user:any= StorageService.Storage.getObject('userInfo');
        var token="";
        if(user)
        {
            token =user.TOKEN;
        }
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8'), withCredentials: false });
        }
        else
        {
            // request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data')});
            //request = request.clone({ headers: request.headers.set('Accept','application/json') });
        }
         request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE') });

        console.log('HttpConfigInterceptor', request);
        this.eventEmitterService.changeStartLoading.emit({});
        return next.handle(request).pipe(
            timeout(150000),
            
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                   // debugger;
                    if (event.body) {
                        if (event.body.NewToken != null) {
                            console.log('NewToken');
                            StorageService.Storage.set('Token', event.body.NewToken);
                        } 
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('HttpConfigInterceptor catchError', error);
                if (error.status == 401) {

                    StorageService.Storage.remove('Token');
                    this.userService.logout();

                    this.router.navigate(['./login'], { replaceUrl: true });
                } else if (error.status == 409) {
                    this.loadingDialogService.dialog.getTop().then(v => v ? this.loadingDialogService.dialog.dismiss() : null);

                    this.errorDialogService.openDialogOK(error.error);
                }
                else {
                    this.loadingDialogService.dialog.getTop().then(v => v ? this.loadingDialogService.dialog.dismiss() : null);
                    
                    this.errorDialogService.openDialogOK('Có lỗi xảy ra!');
                }
               
                return throwError(error);
            }), 
        ).finally(() => { 
            this.eventEmitterService.changeFinishLoading.emit({result:false});
            console.log('[debug] funally'); this.loadingDialogService.onFinished(request);
           
        });
        
    }

}
