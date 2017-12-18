import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase } from "angularfire2/database";



@IonicPage()
@Component({
  selector: 'page-create-chatroom',
  templateUrl: 'create-chatroom.html',
})
export class CreateChatroomPage {

  name : string;
  chatsCreated;

  constructor(public navCtrl: NavController, public navParams: NavParams   , public db : AngularFireDatabase ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateChatroomPage');
  }

  createRoom(){
    this.db.object('/chatRooms/' + this.name).update({ name  : this.name});
    this.navCtrl.pop();
  }

}
