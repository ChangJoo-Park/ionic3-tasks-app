import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
            .collection('items', ref => ref.where('userId', '==', user.uid).orderBy('createdAt', 'desc'))
            .valueChanges()
        )
    } catch (error) {
      console.error(error)
    }
  }

  newTodo() {
    console.log('hello')
    this.navCtrl.push('TodoNewPage')
  }
}
