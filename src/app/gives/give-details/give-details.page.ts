import { Component } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { Give } from '../../_models';
import { ViewController } from '@ionic/core';

@Component({
    selector: 'give-details',
    templateUrl: 'give-details.page.html',
    styleUrls: ['give-details.page.scss']
})
export class GiveDetailsPage {
    give: Give;
    isWish = false;
    isAvailable = true;
    constructor(private navParams: NavParams, public modalCtrl: ModalController) {
        this.give = navParams.get('give');
        this.isWish = navParams.get('isWish');
        this.isAvailable = this.give.status !== 'gived';
    }
}
