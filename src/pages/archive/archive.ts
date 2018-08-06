import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

/**
 * Generated class for the ArchivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ArchivePage'
})
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {
  archive: Observable<Object[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchivePage');
    this.fetchItemsByUserId()
  }

  fetchItemsByUserId() {
    try {
      this.afAuth.authState
        .subscribe(user => {
          this.archive = this.afStore
            .collection('tasks', ref => ref
              .where('userId', '==', user.uid)
              .where('dueDate', '==', 0)
              .where('done', '==', false)
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
