import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  email: string = '';
  password: string = '';
  displayName: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  async signUp() {
    const loader = this.loadingCtrl.create()
    loader.present()
    try {
      console.log(this.displayName)
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      await credential.user.updateProfile({
        displayName: this.displayName,
        photoURL: credential.user.photoURL
      })
      this.navCtrl.popToRoot();
    } catch (error) {
      console.error(error)
    } finally {
      loader.dismiss()
    }
  }
}
