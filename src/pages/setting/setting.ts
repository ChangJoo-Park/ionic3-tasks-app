import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SettingPage'
})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  currentUser: firebase.User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.currentUser = this.afAuth.auth.currentUser
  }

  async signOut() {
    const loader = this.loadingCtrl.create()
    loader.present()
    try {
      await this.afAuth.auth.signOut()
    } catch (error) {
      console.error('signout error => ', error)
    } finally {
      loader.dismiss()
    }
  }

  updateDisplayName() {
    const user = this.afAuth.auth.currentUser

    const displayNameConfirm = this.alertCtrl.create({
      title: '이름 변경',
      inputs: [
        { name: 'displayName', value: user['displayName'] || '' }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '확인',
          handler: data => {
            user.updateProfile({
              displayName: data['displayName'],
              photoURL: user['photoURL']
            }).then(_ => {
              // TODO: Toast
              console.log('success')
            }).catch(_ => {
              // TODO: Toast
              console.error('error')
            })
          }
        }
      ]
    })
    displayNameConfirm.present();
    console.log('display name');
  }
}
