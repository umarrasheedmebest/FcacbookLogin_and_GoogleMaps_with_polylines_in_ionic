import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTrackingPage } from './user-tracking';

@NgModule({
  declarations: [
    UserTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTrackingPage),
  ],
})
export class UserTrackingPageModule {}
