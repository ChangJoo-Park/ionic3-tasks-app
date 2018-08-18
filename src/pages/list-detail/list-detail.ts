import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../../models/Task';

/**
 * Generated class for the ListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ListDetailPage'
})
@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {
  list: Object;
  tasks: Observable<Object[]>;
  newTaskTitle: string;
  userId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
    this.list = this.navParams.get('list')
    console.log('this.list => ', this.list)
    if (this.list === undefined) {
      console.log('this list is undefined')
      this.navCtrl.popAll();
    }
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
      const archiveCollection = this.afStore
        .collection('tasks', ref => ref
          .where('userId', '==', user.uid)
          .where('listId', '==', this.list['$key'])
          // TODO: If list not found -> archive
          .where('done', '==', false)
          .orderBy('createdAt', 'asc')
        )
      this.tasks = archiveCollection
        .snapshotChanges()
        .pipe(
          map(
            actions =>
              actions.map(action => ({
                $key: action.payload.doc.id, ...action.payload.doc.data()
              }))
          )
        )

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailPage');
  }

  addNewTask() {
    try {
      const newTask = (new Task(this.newTaskTitle, '', this.userId, '')).toJSON()
      newTask['listId'] = this.list['$key']
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
}
