import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { BaseController } from 'src/app/core/baseController';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service'
import api from '../../core/api';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseController implements OnInit {
    _toastService: any;
    clickedImage: string;
    version:any;

    constructor(private navCtlr: NavController, private router: Router, private userService: UserService, public httpClient: HttpClient, toastController: ToastController) {
        super();
        this.fromName = "frmLogin";
        this.initializeApp(router, httpClient, toastController);
        this.selectItem.Language = "vi-VN";
        // this.selectItem.UserId="MOBILE_01";
        // this.selectItem.Password="SAFVIET";
        this.onChangeLanguage(this.selectItem.Language);
        this.version="Version "+api.version;
        // this.userService.getVersion().subscribe((response: any) => {
        //     this.version = response.Data[0].VersionMobile;
        // });
    }

    ngOnInit() {

        this.userService.getListBussiness().subscribe((response: any) => {
            this.selectItem.BusinessUnitID = "SAFVIET";
            this.selectItem.listBusiness = response.Data;
        });       

    }
    ValidForm() {

        if (!this.selectItem.UserId) {
            this.toastService.warn(this.Message.Login.UserId);
            return false;
        }
        if (!this.selectItem.Password) {
            this.toastService.warn(this.Message.Login.Password);
            return false;
        }
        if (!this.selectItem.BusinessUnitID) {
            this.toastService.warn(this.Message.Login.BusinessUnitID);
            return false;
        }
        if (!this.selectItem.Language) {
            this.toastService.warn(this.Message.Login.Language);
            return false;
        }
        return true;
    }
    login() {

        if (this.ValidForm() == false) return;
        var user = new User();
        user.UserID = this.selectItem.UserId;
        user.Password = this.selectItem.Password;
        user.BusinessUnitID = this.selectItem.BusinessUnitID;
        user.Language = this.selectItem.Language;

        this.userService.login(user).subscribe((response: any) => {
            if (response.Code == 200) {

                this.toastService.success(response.Data.Message);
                this.storageService.remove("userInfo");
                response.Data.UserID = response.Data.UserID.toUpperCase();
                this.storageService.setObject("userInfo", response.Data);
                //this.router.navigateByUrl("main");
                this.navCtlr.navigateRoot(`/main`);

            }
            else {
                this.toastService.warn(response["Message"]);
            }
        })

    }
    onChangeLanguage(event) {
        this.selectItem.Language = event;
        this.setCaptionLanguage();
        this.setMessage();
    }

}
