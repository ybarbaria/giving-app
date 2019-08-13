import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavParams, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Map, tileLayer, icon, marker, geoJSON, latLng, latLngBounds } from 'leaflet';

import { Give } from '../../_models';
import { GivesService } from '../../_services/gives.service';
import { AuthenticationService } from '../../_services/auth.service';
import { ChatDetailsPage } from '../../chat/chat-details/chat-details.page';
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'give-details',
    templateUrl: 'give-details.page.html',
    styleUrls: ['give-details.page.scss']
})
export class GiveDetailsPage {
    map: Map;
    give: Give;
    isWish = false;
    isAvailable = true;
    constructor(private navParams: NavParams,
        public modalCtrl: ModalController,
        private givesService: GivesService,
        private authService: AuthenticationService,
        private userService: UserService,
        private navCtrl: NavController) {
        this.give = navParams.get('give');
        this.isWish = navParams.get('isWish');
        this.isAvailable = this.give.status !== 'gived';
    }

    addToWishList(give: Give) {
        this.givesService.addToWish(give._id, this.authService.currentUserValue._id).subscribe();
    }

    removeFromWishList(give: Give) {
        this.givesService.unwish(give._id, this.authService.currentUserValue._id).subscribe();
    }

    async openChatDetailsPage() {
        this.modalCtrl.dismiss().then(
            () => {
                const navigationExtras: NavigationExtras = {
                    queryParams: {
                        idUser: this.give.user
                    }
                };
                this.navCtrl.navigateForward('/tabs/chat/details', navigationExtras);
            }
        );
    }

    showMapWithGive() {
        this.map = new Map('map', { attributionControl: false });
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: '',
            maxZoom: 18
        }).addTo(this.map);
        // this.map.locate({
        //     setView: true,
        //     maxZoom: 10
        // }).on('locationfound', (e) => {
        //     console.log('found you');
        // });

        const geojsonFeature = {
            type: 'Feature',
            properties: {
                name: this.give.title,
                popupContent: this.give.title
            },
            geometry: this.give.address
        };

        const koalaIcon = icon({
            iconUrl: 'assets/koala.png',
            iconSize: [64, 64], // size of the icon
            iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
            popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
        });

        const markerLayer = geoJSON(geojsonFeature, {
            pointToLayer: (feature, latlng) => {
                return marker(latlng, { icon: koalaIcon });
            },
            onEachFeature: (feature, layer) => {
                // does this feature have a property named popupContent?
                if (feature.properties && feature.properties.popupContent) {
                    layer.bindPopup(feature.properties.popupContent);
                }
            }
        }).addTo(this.map);

        this.map.fitBounds(markerLayer.getBounds());
        this.map.setZoom(16);

        // const markerBounds = latLngBounds(138.5980224609375,
        //     -34.92478600243492);
        // this.map.fitBounds(markerBounds);

        // marker([-104.99404, 39.75621], { icon: koalaMarker }).addTo(this.map);

        // geoJSON(geojsonFeature).addTo(this.map);
    }

    ionViewDidEnter() {
        this.showMapWithGive();
    }
}
