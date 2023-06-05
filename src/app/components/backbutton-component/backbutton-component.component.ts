import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backbutton-component',
  templateUrl: './backbutton-component.component.html',
  styleUrls: ['./backbutton-component.component.scss'],
})
export class BackbuttonComponent implements OnInit {

    constructor(private ionRouterOutlet: IonRouterOutlet, private router: Router, private nav: NavController) { }

    ngOnInit() {
        //khong xai nua
    }

    async goBack() {
        //if (this.ionRouterOutlet.canGoBack()) {
        //    if (this.router.url.indexOf('tabs') == -1) {
        //        await this.ionRouterOutlet.pop().then(
        //            res => {
        //                console.log('goBack() res', res);
        //            }, rej => {
        //                console.log('goBack() rej', rej);
        //            }
        //        ).catch(
        //            err => {
        //                console.log('goBack() err', err);
        //            }
        //        );;
        //    }
        //    console.log(this.ionRouterOutlet);
        //}
        setTimeout(() => {
            if (this.ionRouterOutlet.canGoBack()) {
                this.ionRouterOutlet.pop().then(
                    res => {
                        if (!res) {
                            console.log('goBack() res', res);
                            this.nav.back();
                        }
                        
                    }, rej => {
                        console.log('goBack() rej', rej);
                    }
                )
                    .catch(
                        err => {
                            console.log('goBack() err', err);
                        }
                    );;
            } else {
                console.log('cantGoBack()');
                this.router.navigate([`/main`], { replaceUrl: true});
                //this.nav.back();
            }
        },100);
        //this.navCtrl.pop()
        //    .then(
        //        res => {
        //            console.log('goBack() res', res);
        //        }, rej => {
        //            console.log('goBack() rej', rej);
        //        }
        //    )
        //    .catch(
        //        err => {
        //            console.log('goBack() err', err);
        //        }
        //    );
    }
}
