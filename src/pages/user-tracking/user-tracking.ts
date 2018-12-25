import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the UserTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-user-tracking',
  templateUrl: 'user-tracking.html',
})
export class UserTrackingPage {
  map: any;
  @ViewChild('map') mapElement: ElementRef;
  lat: any;
  lng: any;
  cords = [];
  constructor(private platform: Platform, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTrackingPage');
    this.loadMap();
  }

  //installd the geolocation plugin and getting the user location and drawing map right after view loaded in ionic
  // also added the marker 
  loadMap() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
        console.log(position);
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        let latLng = new google.maps.LatLng(this.lat, this.lng);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let marker = new google.maps.Marker({
          map: this.map,
          position: this.map.getCenter(),
          animation: google.maps.Animation.DROP,
          optimized: false,
        });
        this.grawPolylines(marker);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  //wathcing the user movement and setting marker position at there and drawing polylines at accordingly
  grawPolylines(marker) {
    setTimeout(() => {
      let watch = this.geolocation.watchPosition();
      watch.subscribe((position) => {
        this.cords.push({ lat: position.coords.latitude, lng: position.coords.longitude })
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        let latLng = { lat: this.lat, lng: this.lng }
        setInterval(() => {
          this.map.panTo(latLng);
          marker.setPosition(latLng);
          var poly = new google.maps.Polyline({
            map: this.map,
            path: this.cords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
        }, 5000);
      });
    }, 2000);
  }
}
