import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Content } from 'ionic-angular';
import {AngularFireDatabase } from "angularfire2/database";




@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {


  chatName;
  userName;   // i will recieve this value from cookie
  userInfo;
  message;   // ngModel with input field on the bottom
  Messages; // i will use this variable to store all messages from DB

  //function to recieve one value from cookie
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  constructor(public navCtrl: NavController, public navParams: NavParams , private db : AngularFireDatabase) {
    this.userInfo = navParams.get('userInfo');
    this.chatName = navParams.get('name');
    this.userName = this.getCookie('username');
    this.db.list('/chats/' + this.chatName).valueChanges().subscribe(data =>{
      this.Messages = data;
    })
    console.log(this.userInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  Content;
  sendMsg(){
    this.db.list('/chats/' + this.chatName).push({
      msg  : this.message,
      name : this.userName
    });
    this.message = '';
  }

}
