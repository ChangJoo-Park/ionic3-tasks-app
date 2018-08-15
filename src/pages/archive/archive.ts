import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Task } from '../../models/Task';

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
  newTaskTitle: string;
  userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchivePage');
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    })
    this.fetchItemsByUserId();
    moment.locale('ko');
  }

  fetchItemsByUserId() {
    try {
      this.afAuth.authState
        .subscribe(user => {
          const archiveCollection = this.afStore
            .collection('tasks', ref => ref
              .where('userId', '==', user.uid)
              .where('listId', '==', '')
              // TODO: If list not found -> archive
              .where('done', '==', false)
              .orderBy('createdAt', 'asc')
            )
          this.archive = archiveCollection.snapshotChanges().pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))))
        })
    } catch (error) {
      console.error(error)
    }
  }

  addNewTask() {
    console.log("hello world");
    try {
      const newTask = (new Task(this.newTaskTitle, '', this.userId, '')).toJSON()
      newTask['listId'] = '';
      this.newTaskTitle = '';
      window.blur();
      this.afStore.collection('tasks')
        .add(newTask)
        .then(_ => { console.log('created'); });
    } catch (error) {
      console.error(error)
    } finally {
      console.log('ended')
    }
  }

  itemSelected(item) {
    this.navCtrl.push('TodoEditPage', { item })
  }

  formatDueDate(dueDate: number) {
    return moment(dueDate).fromNow();
  }
}
