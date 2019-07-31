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
    public give: Give;

    constructor(public navParams: NavParams, public modalCtrl: ModalController) {
        this.give = navParams.get('give');
    }

    // share() {
    //     const loader = this.loadingCtrl.create({
    //         // content: 'Sharing....',
    //         showBackdrop: true,
    //         duration: 200
    //     });
    //     loader.then((page) => page.present());
    // }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss();
    }
}
