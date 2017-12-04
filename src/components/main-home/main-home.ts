import { Component , Input} from '@angular/core';
import { NavController  } from 'ionic-angular';
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

  constructor(public navCtrl: NavController) {
    console.log('Hello MainHomeComponent');
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
    this.navCtrl.push(AddNewsPage);
  }

}
