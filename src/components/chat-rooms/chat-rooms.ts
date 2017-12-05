import { Component } from '@angular/core';

/**
 * Generated class for the ChatRoomsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-rooms',
  templateUrl: 'chat-rooms.html'
})
export class ChatRoomsComponent {

  text: string;

  constructor() {
    console.log('Hello ChatRoomsComponent Component');
    this.text = 'Hello World';
  }

}
