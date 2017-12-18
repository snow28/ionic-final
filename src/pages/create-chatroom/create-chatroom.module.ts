import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateChatroomPage } from './create-chatroom';

@NgModule({
  declarations: [
    CreateChatroomPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateChatroomPage),
  ],
})
export class CreateChatroomPageModule {}
