import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlinePage } from './online';

@NgModule({
  declarations: [
    OnlinePage,
  ],
  imports: [
    IonicPageModule.forChild(OnlinePage),
  ],
})
export class OnlinePageModule {}
