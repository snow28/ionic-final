import { Component , Input } from '@angular/core';
import { NavController   } from 'ionic-angular';
import {AngularFireDatabase } from "angularfire2/database";
import {ChatPage} from "../../pages/chat/chat";


import { CreateChatroomPage } from "../../pages/create-chatroom/create-chatroom";



@Component({
  selector: 'chat-rooms',
  templateUrl: 'chat-rooms.html'
})
export class ChatRoomsComponent {

  text: string;
  chatsCreated;
  userInfo;

  constructor(public navCtrl: NavController , public db : AngularFireDatabase ) {
    this.db.list('/chatRooms').valueChanges().subscribe(data => {
      this.chatsCreated = data;
    });
  }
  //recieving user data from home.ts file
  @Input()
  set userAccountInfo(input) {
    this.userInfo = input;
  }

  openChat(name){
    this.navCtrl.push(ChatPage, {name : name , userInfo : this.userInfo});
  }

  createRoomRedirect(){
    this.navCtrl.push(CreateChatroomPage);
  }
}
