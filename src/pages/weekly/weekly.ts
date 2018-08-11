import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';
import { StoreProvider } from '../../providers/store/store';

/**
 * Generated class for the WeeklyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'WeeklyPage'
})
@Component({
  selector: 'page-weekly',
  templateUrl: 'weekly.html',
})
export class WeeklyPage {
  items: Observable<Object[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public storeProvider: StoreProvider
  ) { }

  ionViewDidLoad() {
    this.fetchItemsByUserId()
  }

  fetchItemsByUserId() {
    this.afAuth.authState.subscribe(user => {
      this.items = this.storeProvider.fetchWeeklyByUser(user)
    })
  }
}
