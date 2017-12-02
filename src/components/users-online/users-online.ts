import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the UsersOnlineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'users-online',
  templateUrl: 'users-online.html'
})
export class UsersOnlineComponent {

  text: string;
  subscription;
  myInput;
  usersOnline = [
  ];

  constructor( private db : AngularFireDatabase) {
    this.subscription = this.db.list("/usersOnline").valueChanges().subscribe(data =>{
      this.usersOnline = data;
      console.log(this.usersOnline);
    })
    console.log('Users-online component works!');
    this.text = 'Users online component';
  }

  addInfo(){
    this.db.list("/usersOnline").push({
      name: "Dmytro Kachailo",
      email: "snow28@ukr.net" ,
      ID : 123123123
    });

  }
}
