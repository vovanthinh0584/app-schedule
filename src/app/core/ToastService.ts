import { Injectable } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { CommonServiceModule } from './common-service.module';

export namespace ToastService {
export class Toast {
    static toastController: any;
    constructor(private nav: NavController,
        public toastController: ToastController){
    }
    static async success(msg: string, duration: number=1000,position:string="top") {
       const toast = await this.toastController.create({
           message: msg,
           duration: duration,
           position: 'top',
           cssClass:"success-toast"
       });
       toast.present();
    }
    static async error(msg: string, duration: number=1000,position:string="top") {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position: 'top',
            cssClass:"error-toast"
        });
        toast.present();
     }
     static   async warn(msg: string, duration: number=1000,position:string="top") {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position: 'top',
            cssClass:"warn-toast"
        });
        toast.present();
     }
 
}
}