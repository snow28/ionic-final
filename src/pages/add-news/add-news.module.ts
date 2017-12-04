import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewsPage } from './add-news';

@NgModule({
  declarations: [
    AddNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewsPage),
  ],
})
export class AddNewsPageModule {}
