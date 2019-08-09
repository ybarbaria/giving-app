import { Component, ViewChild } from '@angular/core';
import { MessagesService } from '../../_services/messages.service';
import { ModalController, IonContent } from '@ionic/angular';
import { AuthenticationService } from '../../_services/auth.service';
import { User, Message } from '../../_models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-chat-details',
    templateUrl: 'chat-details.page.html',
    styleUrls: ['chat-details.page.scss']
})
export class ChatDetailsPage {
    userId: string;
    currentUser: User;
    user: User;
    @ViewChild('messagesContent') messagesContent: IonContent;
    messages = [];

    constructor(private messagesService: MessagesService,
        private authService: AuthenticationService,
        private userService: UserService,
        public modalCtrl: ModalController,
        private route: ActivatedRoute,
        private location: Location) {

        this.route.queryParams.subscribe(params => {
            this.userId = params.idUser;
            this.userService.getUser(params.idUser).subscribe(userModal => {
                this.user = userModal;
            });

            this.messagesService.getNewMessages(this.userId).subscribe((give) => {
                this.messages.push(give);
            });

            this.messagesService.getUpdatedMessages(this.userId).subscribe((mess) => {
                this.messages.find((message) => message._id === mess._id).text = mess.text;
            });

            this.messagesService.getDeletedMessages(this.userId).subscribe((mess) => {
                // this.messages.remove((message) => message._id === mess._id).text = mess.text;
            });
        });
        // this.user = this.navParams.get('id');
        // this.messages = this.navParams.get('messages');
        this.currentUser = this.authService.currentUserValue;
    }

    goBack() {
        this.location.back();
    }
}
