import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    loading.dismiss();
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: 19.266142,//rta.coords.latitude,
      lng: -103.698502//rta.coords.longitude
    };
    console.log(myLatLng);

    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    const map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event
      .addListenerOnce(map, 'idle', () => {
        // loaded
      });

    const marker = new google.maps.Marker({
      position: {
        lat: myLatLng.lat,
        lng: myLatLng.lng
      },
      zoom: 8,
      map: map,
      title: 'Estas aqui'
    });
  }

}





//https://www.youtube.com/watch?v=g9zteFgnenk

//https://blog.ng-classroom.com/blog/ionic2/google-maps-js-and-ionic/
