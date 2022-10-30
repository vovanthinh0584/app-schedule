import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseController } from "src/app/core/baseController";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseController {
  constructor(private _route: Router, private activatedRoute: ActivatedRoute) {
    super();
  }
  ngOnInit() {
    this._route.navigate([`/main/inputRequest`], { replaceUrl: true });
  }

}
