import { Component } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { Give } from '../../_models';
// import { ViewController } from '@ionic/core';
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
    give: Give;
    isWish = false;
    isAvailable = true;
    constructor(private navParams: NavParams,
        public modalCtrl: ModalController,
        private givesService: GivesService,
        private authService: AuthenticationService,
        private userService: UserService) {
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

    // async openMessageModal() {
    //     const modal = await this.modalCtrl.create({
    //         component: GiveDetailsPage,
    //         componentProps: { give: giveModal, isWish: wish }
    //     });
    //     return await modal.present();
    // }

    async openMessageModal() {
        this.userService.getUser(this.give.user).subscribe(async userModal => {
            const modal = await this.modalCtrl.create({
                component: ChatDetailsPage,
                componentProps: { user: userModal, messages: [] }
            });
            return await modal.present();
        });
        // userModal.newMessage = null;
        // let mess = _.forEach(this.messages, (m) =>
        //     m.receiver === userModal._id || m.sender === userModal._id
        // );
        // mess = _.orderBy(mess, 'createdDate');
    }
}
