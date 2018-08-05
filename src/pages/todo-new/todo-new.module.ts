import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoNewPage } from './todo-new';

@NgModule({
  declarations: [
    TodoNewPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoNewPage),
  ],
})
export class TodoNewPageModule {}
