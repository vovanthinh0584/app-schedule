import { Injectable, EventEmitter, ChangeDetectorRef } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoadingController } from '@ionic/angular';
import { HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoadingDialogService {
    constructor(public dialog: LoadingController) {
        this._dialog = dialog;
       // this._chRef=chRef;
    }
    _dialog;
    _chRef;
    onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Stores all currently active requests
     */
    private requests: HttpRequest<any>[] = [];
    async openDialog() {
        console.log('LoadingDialogService openDialog');
        const loading = await this._dialog.create({
            message: 'Đang tải...',
            duration: 15000
        });
        await loading.present();
        console.log('[debug] showed');
    }

    /**
     * Adds request to the storage and notifies observers
     */
    onStarted(req: HttpRequest<any>): void {
        this.requests.push(req);
        this.notify();
    }

    /**
     * Removes request from the storage and notifies observers
     */
    onFinished(req: HttpRequest<any>): void {

        const clone = this.requests.slice();
        for (let i = 0; i < clone.length; i++) {
            if (clone[i].url === req.url) {
                this.requests.splice(i, 1);
            }
        }
        this.notify();
    }

    /**
     * Notifies observers about whether there are any requests on fly
     */
    private notify(): void {

        this.onLoadingChanged.emit(this.requests.length !== 0);
       // this.chRef.detectChanges();
    }
}
