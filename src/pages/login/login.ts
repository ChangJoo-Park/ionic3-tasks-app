import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { auth } from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth
  ) {
  }

  ionViewDidLoad() {
    this.checkAlreadyLoggedIn();
  }

  checkAlreadyLoggedIn() {

    const loader = this.loadingCtrl.create();
    loader.present();
    this.afAuth.auth.onAuthStateChanged((user) => {
      loader.dismiss();
      if (user) {

      } else {

      }
    })
  }
}
