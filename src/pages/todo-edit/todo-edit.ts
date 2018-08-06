import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('item :)')
    this.item = this.navParams.get('item')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoEditPage');
  }

  close() {
    this.navCtrl.pop()
  }
}
