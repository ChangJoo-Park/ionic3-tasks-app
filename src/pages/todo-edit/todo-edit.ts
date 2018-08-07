import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

/**
 * Generated class for the TodoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TodoEditPage'
})
@Component({
  selector: 'page-todo-edit',
  templateUrl: 'todo-edit.html',
})
export class TodoEditPage {
  item: Object;
  dueDate: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afStore: AngularFirestore
  ) {
    this.item = this.navParams.get('item')
    if (!this.item) {
      this.navCtrl.goToRoot({});
    }
  }

  ionViewDidLoad() {
    if (this.item['dueDate']) {
      if (this.item['dueDate'] == 0) {
        this.dueDate = null;
      } else {
        this.dueDate = new Date(this.item['dueDate']).toISOString();
      }
    }
  }

  ionViewWillLeave() {
    this.updateItem();
  }

  async updateItem() {
    const taskRef = this.afStore.collection('tasks').doc(this.item['$key'])
    this.item['updatedAt'] = (new Date()).getTime();
    const { title, note, userId, done, createdAt } = this.item;
    const targetDueDate = (this.dueDate === '' || !this.dueDate) ? 0 : (new Date(this.dueDate)).getTime()
    const updateItem = {
      title, note, userId, dueDate: targetDueDate, done, createdAt, updatedAt: (new Date()).getTime()
    }
    await taskRef.set(updateItem)
  }
  resetDueDate() {
    this.dueDate = null;
  }

  done() {
    this.item['done'] = true;
    this.updateItem();
    this.navCtrl.pop();
  }
}
