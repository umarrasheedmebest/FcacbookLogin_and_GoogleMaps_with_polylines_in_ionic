import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserTrackingPage } from '../user-tracking/user-tracking';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public facebook: Facebook, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // created the app in developer.console.facebook, got app_id  from there and installed the 
  //facebook plugin using that app id
  facebookLogin() {
    this.facebook.login(["email", "public_profile"])
      .then(response => {
        this.navCtrl.setRoot(UserTrackingPage);
      }).catch((error) => { console.log(error) });
  } 
}
