import { Component, OnInit } from '@angular/core';
import { BaseController } from 'src/app/core/baseController';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseController implements OnInit {
    
    constructor() {
        super();
    }
    ngOnInit() {
        
    }
    login() {
       
    }
}
