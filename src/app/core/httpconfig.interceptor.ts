import { Injectable, Component, Inject } from '@angular/core';
//import { ErrorDialogService } from './errordialog.service';
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
import { ToastService } from './ToastService';
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
import { UserService }  from '../services/user/user.service'
import { StorageService }  from '../core/StorageService'
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public toastService: ToastService, private userService: UserService,
        private popoverCtrl: PopoverController, private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController,
        public dialog: AlertController, private router: Router,public storageService:StorageService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has('showSpinner') == false || request.headers.get('showSpinner') != 'false') {
            console.log('showSpinner')
            this.toastService.success("123");
        }

        const token: string = this.storageService.get('Token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8'), withCredentials: false });
        }
        //request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        //request = request.clone({ headers: request.headers.set('Access-Control-Max-Age', '3600') });

       // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
       // request = request.clone({ headers: request.headers.set('OPTIONS', 'Access-Control-Max-Age') });

        console.log('HttpConfigInterceptor', request);
        return next.handle(request).pipe(
            timeout(150000),
            //retry(2),
            //retryWhen(error => {
            //    return error
            //        .mergeMap((error: any) => {
            //            console.log(error)
            //            if (error.status === 401) {
            //                //localStorage.removeItem('Token');
            //                //this.userService.logout();
            //               // this.router.navigate(['./login'], { replaceUrl: true });
            //                return Observable.throw({ error: 'No retry', status: 401 });
            //            }
            //            return Observable.of(error.status).delay(1000)
            //        })
            //        .take(2)
            //        .concat(Observable.throw({ error: 'Sorry, there was an error (after 2 retries)' }));
            //}),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    if (event.body) {
                        if (event.body.NewToken != null) {
                            console.log('NewToken');
                            this.storageService.set('Token', event.body.NewToken);
                        } 
                    }
                    // this.errorDialogService.openDialog(event);
                    //this.loadingDialogService.dialog.getTop().then(v => v ? this.loadingDialogService.dialog.dismiss() : null);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('HttpConfigInterceptor catchError', error);
                if (error.status == 401) {

                    localStorage.removeItem('Token');
                    this.userService.logout();

                    this.router.navigate(['./login'], { replaceUrl: true });
                } else if (error.status == 409) {
                    this.toastService.error("123");

                    //@@@ this.errorDialogService.openDialogOK(error.error);
                }
                else {
                    this.toastService.error("123");
                    
                    //@@@ this.errorDialogService.openDialogOK('Có lỗi xảy ra!');
                }
                //this.loadingDialogService.dialog.getTop().then(v => v ? this.loadingDialogService.dialog.dismiss() : null);
                
                //let data = {};
                //data = {
                //    reason: error && error.message,
                //    status: error.name
                //};
                //this.errorDialogService.openDialog(error.message);
               
                // break out of function since they hit cancel.
                //if (!this.callDialog()) {
                //    return this.http.request(request);
                //}
                //this.errorDialogService.warn().then(value => {
                //    console.log(value);
                //})
                return throwError(error);
            }), 
        )
        // .finally(() => { console.log('[debug] funally');
        //       var k=111;  
        // //@@@ this.loadingDialogService.onFinished(request);
        //  });
        
    }

}
