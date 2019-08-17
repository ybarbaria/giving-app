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
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: '',
            maxZoom: 18
        }).addTo(this.map);
        // this.map.locate({
        //     setView: true,
        //     maxZoom: 10
        // }).on('locationfound', (e) => {
        //     console.log('found you');
        // });

        if (this.give.location) {
            const geojsonFeature = {
                type: 'Feature',
                properties: {
                    name: this.give.title,
                    popupContent: this.give.title
                },
                geometry: {
                    type: 'Point',
                    coordinates: this.give.location.coordinates
                }
            };
            const koalaIcon = icon({
                iconUrl: 'assets/koala.png',
                iconSize: [32, 32], // size of the icon
                iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
                popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
            });

            const markerLayer = geoJSON(geojsonFeature, {
                pointToLayer: (feature, latlng) => {
                    return marker(latlng, { icon: koalaIcon });
                },
                onEachFeature: (feature, layer) => {
                    if (feature.properties && feature.properties.popupContent) {
                        layer.bindPopup(feature.properties.popupContent);
                    }
                }
            }).addTo(this.map);
            this.map.fitBounds(markerLayer.getBounds());
            this.map.setZoom(16);
        }

        // TODO Fix throw error ERROR Error: Bounds are not valid.
        // at NewClass.fitBounds (leaflet-src.js:3286)
    }

    ionViewDidEnter() {
        this.showMapWithGive();
    }
}
