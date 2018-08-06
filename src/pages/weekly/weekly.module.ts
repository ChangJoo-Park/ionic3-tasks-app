import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeeklyPage } from './weekly';

@NgModule({
  declarations: [
    WeeklyPage,
  ],
  imports: [
    IonicPageModule.forChild(WeeklyPage),
  ],
})
export class WeeklyPageModule {}
