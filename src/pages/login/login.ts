import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { SignUpPage } from '../sign-up/sign-up';
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
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad')
  }

  async login() {
    try {
      const user = await this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.email, this.password)
      this.navCtrl.push(TabsPage, {}, { animate: true });
    } catch (error) {
      console.error(error)
    }
  }

  signUp() {
    this.navCtrl.push('SignUpPage')
  }
}
