import { Injectable } from '@angular/core';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertController } from '@ionic/angular';

import { HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorDialogService {

    constructor(public _alert: AlertController, public http: HttpClient) { }
    async openDialog(data) {
        console.log("ErrorDialogService openDialog");
        const alert = await this._alert.create({
            //header: 'Alert',
            //subHeader: 'Subtitle',
            message: data,
            buttons: [
                {
                    text: 'Không',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Có',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        await alert.present();
        //dialogRef.afterClosed().subscribe(result => {
        //    console.log('The dialog was closed');
        //    let animal;
        //    animal = result;
        //});
    }

    async openDialogOK(data) {
        
        return new Promise(async (resolve) => {
            const confirm = await this._alert.create({
                message: data,
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                            return resolve(true);
                        },
                    },
                ],
            });

            await confirm.present();
        });
        //dialogRef.afterClosed().subscribe(result => {
        //    console.log('The dialog was closed');
        //    let animal;
        //    animal = result;
        //});
    }

    async warn(msg: string, title?: string) {
        return new Promise(async (resolve) => {
            const confirm = await this._alert.create({
                header: title,
                message: msg,
                buttons: [
                    {
                        text: 'Không',
                        role: 'cancel',
                        handler: () => {
                            return resolve(false);
                        },
                    },
                    {
                        text: 'Có',
                        handler: () => {
                            return resolve(true);
                        },
                    },
                ],
            });

            await confirm.present();
        });
    }

    async openDialogResponse(data) {
        return new Promise(async (resolve) => {
            if (data.Code == 200) {
                return resolve(true);
            } else {
                const confirm = await this._alert.create({
                    message: data.Message,
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                                return resolve(false);
                            },
                        },
                    ],
                });
                await confirm.present();
            }
        });
        
    }
}