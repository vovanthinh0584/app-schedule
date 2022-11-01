import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseController } from 'src/app/core/baseController';
import { User } from 'src/app/models/user';
import {UserService} from 'src/app/services/user/user.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseController implements OnInit {
    listLanguage:any=[{Lang:"en-US",Name:"English"},{Lang:"vi-VN",Name:"Việt Nam"}]
    _toastService:any;
    constructor(private router: Router,private userService:UserService,public httpClient:HttpClient ) {
        super();
        this.selectItem.Language="vi-VN";
        this.fromName="frmLogin";
        this.init(httpClient);
      
    }
    ngOnInit() {
        this.setCaptionLanguage();
        this.userService.getListBussiness().subscribe((response:any)=>{
            debugger;
            this.selectItem.listBusiness=response.data;
        });
    }
    // setCaptionLanguage(){
    //     this.userService.getCaptionLanguage(this.fromName,this.selectItem.Language).subscribe((response:any)=>{
    //         debugger;
    //         this.Language=response.data;
    //     });
    // }
    login() {
         var user=new User();
         user.UserID="MOBILE_01";//this.selectItem.UserID;
         user.Password="SAFVIET";//this.selectItem.Password;
         user.BusinessUnitID=this.selectItem.BusinessUnitID;
         user.Language=this.selectItem.Language;
         this.userService.login(user).subscribe((response:any)=>{
            if(response.code==200)
            {
                debugger;
                this.toastService.success(response.data.message);
                this.storageService.setObject("userInfo",response.data);
                this.router.navigate([`/main`], { replaceUrl: true });

            } debugger;
         })

    }
    onChangeLanguage(event)
    {
        debugger;
        this.selectItem.Language=event;
        this.setCaptionLanguage();
    }
}
