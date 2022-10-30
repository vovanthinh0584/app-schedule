import { Injectable } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { CommonServiceModule } from './common-service.module';
@Injectable({
    providedIn: CommonServiceModule
})
export class ToastService {
    constructor(private nav: NavController, private modalCtrl: ModalController,
        public toastController: ToastController){
    }
     async success(msg: string, duration: number=1000,position:string="top") {
       const toast = await this.toastController.create({
           message: msg,
           duration: duration,
           position: 'top',
           cssClass:"success-toast"
       });
       toast.present();
    }
    async error(msg: string, duration: number=1000,position:string="top") {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position: 'top',
            cssClass:"error-toast"
        });
        toast.present();
     }
     async warn(msg: string, duration: number=1000,position:string="top") {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position: 'top',
            cssClass:"warn-toast"
        });
        toast.present();
     }
 
}