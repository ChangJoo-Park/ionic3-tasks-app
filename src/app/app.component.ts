import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoadingController, Platform } from 'ionic-angular';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  showRoot = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
  ) {
    platform.ready().then((res) => {
      console.log('platform ready => ', res)
      const loader = loadingCtrl.create();
      loader.present();
      this.afAuth.auth.onAuthStateChanged((user) => {
        loader.dismiss();
        this.rootPage = user ? HomePage : LoginPage;
        statusBar.styleDefault();
        splashScreen.hide();
      })
    });
  }
}
