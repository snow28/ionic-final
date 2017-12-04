import { Component , Input} from '@angular/core';
import { NavController  } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import { AddNewsPage } from '../../pages/add-news/add-news';

@Component({
  selector: 'main-home',
  templateUrl: 'main-home.html'
})

export class MainHomeComponent {
  userInfo =  {
    email : '',
    name : '',
    profilePicture : ''
  }
  subscription;
  Notes;

  constructor(public navCtrl: NavController , public db : AngularFireDatabase) {
    this.subscription = this.db.list('/notes').valueChanges().subscribe(data =>{
      this.Notes = data;
      console.log(data);
      //console.log("Length _ >>> "  + this.Notes);
    });

  }
  //recieving user data from home.ts file
  @Input()
  set userAccountInfo(input) {
    console.log(input);
    this.userInfo.email = input.email;
    this.userInfo.name = input.name;
    this.userInfo.profilePicture = input.profilePicture;
  }


  pushTo_addnews(){
    this.navCtrl.push(AddNewsPage,this.userInfo);
  }

}
