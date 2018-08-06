import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('ionViewWillLeave')
    console.log('update task')
  }

  resetDueDate() {
    this.dueDate = null;
  }
}
