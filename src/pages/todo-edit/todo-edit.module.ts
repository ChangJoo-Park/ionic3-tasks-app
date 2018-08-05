import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoEditPage } from './todo-edit';

@NgModule({
  declarations: [
    TodoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoEditPage),
  ],
})
export class TodoEditPageModule {}
