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
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad')
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

  goArchive() {
    this.navCtrl.push('ArchivePage')
  }

  goWeekly() {
    this.navCtrl.push('WeeklyPage')
  }
}
