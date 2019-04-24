import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';

var config={
  apiKey: "AIzaSyAKvezvDrEK1HYnbtiQza0DH8mw42VSqTY",
  authDomain: "konobar-d81aa.firebaseapp.com",
  databaseURL: "https://konobar-d81aa.firebaseio.com",
  projectId: "konobar-d81aa",
  storageBucket: "konobar-d81aa.appspot.com",
  messagingSenderId: "296382343681"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#F8F8F8');
      //splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
