import { Component } from '@angular/core';
import { NavParams, LoadingController } from '@ionic/angular';
import { Give } from '../../_models';
import { ViewController } from '@ionic/core';

@Component({
    selector: 'give-details',
    templateUrl: 'give-details.page.html'
})
export class GiveDetailsPage {
    public give: Give;

    constructor(public navParams: NavParams, private loadingCtrl: LoadingController) {
        this.give = navParams.get('give');
    }

    share() {
        const loader = this.loadingCtrl.create({
            // content: 'Sharing....',
            showBackdrop: true,
            duration: 200
        });
        loader.then((page) => page.present());
    }
}
