import { Component } from '@angular/core';

/**
 * Generated class for the MainHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-home',
  templateUrl: 'main-home.html'
})
export class MainHomeComponent {

  text: string;

  constructor() {
    console.log('Hello MainHomeComponent Component');
    this.text = 'Hello World';
  }

}
