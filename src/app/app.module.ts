import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';





import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { AddNewsPage } from '../pages/add-news/add-news';

import { UsersOnlineComponent } from '../components/users-online/users-online';
import { MainHomeComponent } from '../components/main-home/main-home';


var config = {
  apiKey: "AIzaSyC7qktsZdsGmEIToEPe7UIRkal_Bug6GlY",
  authDomain: "finalproject-adbcc.firebaseapp.com",
  databaseURL: "https://finalproject-adbcc.firebaseio.com",
  projectId: "finalproject-adbcc",
  storageBucket: "finalproject-adbcc.appspot.com",
  messagingSenderId: "661546577690"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    UsersOnlineComponent,
    MainHomeComponent,
    AddNewsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    AddNewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
