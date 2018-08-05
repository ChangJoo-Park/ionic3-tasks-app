import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Task } from '../../models/Task';

/**
 * Generated class for the TodoNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TodoNewPage'
})
@Component({
  selector: 'page-todo-new',
  templateUrl: 'todo-new.html',
})
export class TodoNewPage {
  title: string;
  note: string;
  userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoNewPage');
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    })
  }

  save() {
    try {
      const newTask = new Task(this.title, this.note, this.userId)
      this.afStore.collection('tasks')
        .add(newTask.toJSON())
        .then(_ => this.navCtrl.pop());
    } catch (error) {
      console.error(error)
    } finally {
      console.log('ended')
    }
  }
}
