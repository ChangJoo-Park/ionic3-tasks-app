import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';

declare var require: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list: Observable<Object[]>;
  currentUser: firebase.User;
  avatar: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad')
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.navCtrl.goToRoot({});
      }
      this.currentUser = user
      const userId = user.uid;
      const listCollection = this.afStore.collection('list', ref => ref.where('users', 'array-contains', userId))
      this.list = listCollection.snapshotChanges().pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))))
      // TODO: using real avatar when user changes
      const Avatar = require('avatar-initials');
      new Avatar(document.getElementById('avatar'), {
        useGravatar: true,
        size: 32,
        email: this.currentUser.email
      });

    })
  }

  newTodo() {
    this.navCtrl.push('TodoNewPage')
  }

  setting() {
    this.navCtrl.push('SettingPage')
  }

  search() {
    this.navCtrl.push('SearchPage')
  }

  newList() {
    this.navCtrl.push('ListNewPage')
  }

  itemSelected(item) {
    const taskModal = this.modalCtrl.create('TodoEditPage', { item });
    taskModal.present()
  }

  listSelected(l) {
    console.log(l);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  goArchive() {
    this.navCtrl.push('ArchivePage')
  }

  goWeekly() {
    this.navCtrl.push('WeeklyPage')
  }
}
