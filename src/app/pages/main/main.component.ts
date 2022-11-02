import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent{
  constructor(private _route: Router, private activatedRoute: ActivatedRoute) {
    //super();
  }
  ngOnInit() {
    this._route.navigate([`/main/getTask`], { replaceUrl: true });
  }

}
