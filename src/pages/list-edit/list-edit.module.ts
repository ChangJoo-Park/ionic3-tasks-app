import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEditPage } from './list-edit';

@NgModule({
  declarations: [
    ListEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEditPage),
  ],
})
export class ListEditPageModule {}
