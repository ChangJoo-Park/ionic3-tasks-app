import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad')
    this.fetchItemsByUserId()
  }

  fetchItemsByUserId() {
    try {
      this.afAuth.authState
        .subscribe(user =>
          this.items = this.afStore
            .collection('tasks', ref => ref.where('userId', '==', user.uid).orderBy('createdAt', 'asc'))
            .valueChanges()
        )
    } catch (error) {
      console.error(error)
    }
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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
