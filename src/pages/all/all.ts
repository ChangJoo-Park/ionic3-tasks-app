import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';
/**
 * Generated class for the AllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AllPage'
})
@Component({
  selector: 'page-all',
  templateUrl: 'all.html',
})
export class AllPage {
  items: Observable<Object[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllPage');
    this.fetchItemsByUserId();
  }

  fetchItemsByUserId() {
    try {
      this.afAuth.authState
        .subscribe(user => {
          const archiveCollection = this.afStore
            .collection('tasks', ref => ref
              .where('userId', '==', user.uid)
              .where('done', '==', false)
              .orderBy('createdAt', 'asc')
            )
          this.items = archiveCollection.snapshotChanges().pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))))
        })
    } catch (error) {
      console.error(error)
    }
  }

  itemSelected(item) {
    this.navCtrl.push('TodoEditPage', { item })
  }

  formatDueDate(dueDate: number) {
    return moment(dueDate).fromNow();
  }
}
