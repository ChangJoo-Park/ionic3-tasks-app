import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {
  private archive: Observable<Object[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
    console.log('Hello StoreProvider Provider');
  }

  fetchItemsByUserId(user) {
    const archiveCollection = this.afStore
      .collection('tasks', ref => ref
        .where('userId', '==', user.uid)
        // TODO: If list not found -> archive
        .where('done', '==', false)
        .orderBy('createdAt', 'asc')
      )
    return archiveCollection
      .snapshotChanges()
      .pipe(
        map(
          actions =>
            actions.map(action => ({
              $key: action.payload.doc.id, ...action.payload.doc.data()
            }))
        )
      )
  }

  fetchWeeklyByUser(user) {
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const todayMidnightTimestamp = todayMidnight.getTime()
    const nextWeekTimeStamp = todayMidnightTimestamp + (8 * (1000 * 60 * 60 * 24))

    const itemCollection = this.afStore
      .collection('tasks', ref => ref
        .where('userId', '==', user.uid)
        .where('dueDate', '>', todayMidnightTimestamp)
        .where('dueDate', '<', nextWeekTimeStamp)
        .where('done', '==', false)
        .orderBy('dueDate', 'asc')
        .orderBy('createdAt', 'asc')
      )
    return itemCollection
      .snapshotChanges()
      .pipe(
        map(
          actions => actions.map(
            action => ({
              $key: action.payload.doc.id, ...action.payload.doc.data()
            })
          )
        )
      )
  }
  fetchListByUser(user) {
    const listCollection = this.afStore
      .collection('list', ref => ref.where('users', 'array-contains', user.uid))
    return listCollection.snapshotChanges().pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))))
  }

  get archivedTasks() {
    return this.archive
  }
}
