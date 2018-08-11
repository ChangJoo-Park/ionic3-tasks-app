import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';
import { StoreProvider } from '../../providers/store/store';

declare var require: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list: Observable<Object[]>;
  archived: Observable<Object[]>;
  weekly: Observable<Object[]>;
  currentUser: firebase.User;
  avatar: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public storeProvider: StoreProvider
  ) { }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.navCtrl.goToRoot({});
      }
      this.currentUser = user
      this.archived = this.storeProvider.fetchItemsByUserId(user)
      this.list = this.storeProvider.fetchListByUser(user)
      this.weekly = this.storeProvider.fetchWeeklyByUser(user)
      this.drawAvatar();
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

  goArchive() {
    this.navCtrl.push('ArchivePage')
  }

  goWeekly() {
    this.navCtrl.push('WeeklyPage')
  }

  drawAvatar() {
    // TODO: using real avatar when user changes
    const Avatar = require('avatar-initials');
    new Avatar(document.getElementById('avatar'), {
      useGravatar: true,
      size: 32,
      email: this.currentUser.email
    });
  }
}
