import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListNewPage } from './list-new';

@NgModule({
  declarations: [
    ListNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListNewPage),
  ],
})
export class ListNewPageModule {}
