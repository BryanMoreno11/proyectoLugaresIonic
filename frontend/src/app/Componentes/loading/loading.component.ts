import { Component, OnInit } from '@angular/core';
import { IonSpinner, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonText, CommonModule]

})
export class LoadingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
