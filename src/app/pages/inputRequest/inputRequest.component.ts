import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseController } from "src/app/core/baseController";


@Component({
  selector: 'app-input-request',
  templateUrl: './inputRequest.component.html'
})
export class InputRequestComponent extends BaseController {
  constructor(private _route: Router, private activatedRoute: ActivatedRoute) {
    super();
  }
  ngOnInit() {
  }

}
