import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

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
      const nextWeekTimeStamp = todayMidnightTimestamp + (7 * (1000 * 60 * 60 * 24))

      this.afAuth.authState
        .subscribe(user => {
          this.items = this.afStore
            .collection('tasks', ref => ref
              .where('userId', '==', user.uid)
              .where('dueDate', '>', todayMidnightTimestamp)
              .where('dueDate', '<', nextWeekTimeStamp)
              .where('done', '==', false)
              .orderBy('dueDate', 'asc')
              .orderBy('createdAt', 'asc')
            )
            .valueChanges()
        }
        )
    } catch (error) {
      console.error(error)
    }
  }

}
