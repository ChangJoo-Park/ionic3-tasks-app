import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';
import { map } from 'rxjs/operators/map';

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
    public afStore: AngularFirestore
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeeklyPage');
    this.fetchItemsByUserId()
  }

  fetchItemsByUserId() {
    try {
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      const todayMidnightTimestamp = todayMidnight.getTime()
      const nextWeekTimeStamp = todayMidnightTimestamp + (8 * (1000 * 60 * 60 * 24))

      this.afAuth.authState
        .subscribe(user => {
          const itemCollection = this.afStore
            .collection('tasks', ref => ref
              .where('userId', '==', user.uid)
              .where('dueDate', '>', todayMidnightTimestamp)
              .where('dueDate', '<', nextWeekTimeStamp)
              .where('done', '==', false)
              .orderBy('dueDate', 'asc')
              .orderBy('createdAt', 'asc')
            )
          this.items = itemCollection.snapshotChanges().pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))))
        }
        )
    } catch (error) {
      console.error(error)
    }
  }

}