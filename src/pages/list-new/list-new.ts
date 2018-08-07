import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

/**
 * Generated class for the ListNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface IList {
  title: string;
  users: string[];
  owner: string;
  tasks: string[];
  createdAt: number;
  updatedAt: number;
}

@IonicPage({
  name: 'ListNewPage'
})
@Component({
  selector: 'page-list-new',
  templateUrl: 'list-new.html',
})
export class ListNewPage {
  newListTitle: string;
  userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListNewPage');
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    })
  }

  addNewList() {
    const newList: IList = {
      title: this.newListTitle,
      owner: this.userId,
      users: [this.userId],
      tasks: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.afStore
      .collection('list')
      .add(newList)
      .then(_ => { this.navCtrl.pop(); })
  }
}
