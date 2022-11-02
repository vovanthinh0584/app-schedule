import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonFab } from '@ionic/angular';

@Component({
  selector: 'app-menu',

  templateUrl: './menu.component.html',


  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FabMenuComponent implements OnInit {

  @Input() params: any;


  constructor(private router: Router) { }

  ngOnInit() { }
  
  
}
