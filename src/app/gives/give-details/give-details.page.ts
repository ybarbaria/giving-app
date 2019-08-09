import { Component } from '@angular/core';
import { NavParams, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Give } from '../../_models';
// import { ViewController } from '@ionic/core';
import { GivesService } from '../../_services/gives.service';
import { AuthenticationService } from '../../_services/auth.service';
import { ChatDetailsPage } from '../../chat/chat-details/chat-details.page';
import { UserService } from '../../_services/user.service';
import { NavigationExtras } from '@angular/router';

@Component({
    selector: 'give-details',
    templateUrl: 'give-details.page.html',
    styleUrls: ['give-details.page.scss']
})
export class GiveDetailsPage {
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
}
