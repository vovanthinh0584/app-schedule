import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BaseController } from 'src/app/core/baseController';
import { User } from 'src/app/models/user';
import {UserService} from 'src/app/services/user/user.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseController implements OnInit {
    _toastService:any;
    constructor(private router: Router,private userService:UserService,public httpClient:HttpClient,toastController: ToastController) {
        super();
        this.fromName="frmLogin";
        this.selectItem.Language="vi-VN";
        this.initializeApp(router,httpClient,toastController);
        this.selectItem.UserId="MOBILE_01";
        this.selectItem.Password="SAFVIET";
    }
    ngOnInit() {
        this.userService.getListBussiness().subscribe((response:any)=>{
            this.selectItem.BusinessUnitID="SAFVIET";
            this.selectItem.listBusiness=response.data;
        });
    }
    ValidForm(){
        debugger;
        if(!this.selectItem.UserId)
        {
            this.toastService.warn(this.Message.Login.UserId);
            return false;
        }
        if(!this.selectItem.Password)
        {
            this.toastService.warn(this.Message.Login.Password);
            return false;
        }
        if(!this.selectItem.BusinessUnitID)
        {
            this.toastService.warn(this.Message.Login.BusinessUnitID);
            return false;
        }
        if(!this.selectItem.Language)
        {
            this.toastService.warn(this.Message.Login.Language);
            return false;
        }
        return true;
    }
    login() {
        debugger;
        if(this.ValidForm()==false) return;
         var user=new User();
         user.userID=this.selectItem.UserId;
         user.Password=this.selectItem.Password;
         user.businessUnitID=this.selectItem.BusinessUnitID;
         user.language=this.selectItem.Language;

         this.userService.login(user).subscribe((response:any)=>{
            if(response.code==200)
            {
        
                this.toastService.success(response.data.message);
                this.storageService.setObject("userInfo",response.data);
                this.router.navigate([`/main`], { replaceUrl: true });

            } 
         })

    }
    onChangeLanguage(event)
    {
        this.selectItem.Language=event;
        this.setCaptionLanguage();
        this.setMessage();
    }
}
