import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessagesService } from '../../_services/messages.service';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { AuthenticationService } from '../../_services/auth.service';
import { User, Message } from '../../_models';

@Component({
    selector: 'app-chat-details',
    templateUrl: 'chat-details.page.html',
    styleUrls: ['chat-details.page.scss']
})
export class ChatDetailsPage implements AfterViewInit {
    currentUser: User;
    user: User;
    messages: Message[];
    message: Message = new Message();
    text: string;
    @ViewChild('messagesContent') messagesContent: IonContent;

    constructor(private navParams: NavParams,
        private socket: Socket,
        private messagesService: MessagesService,
        private authService: AuthenticationService,
        public modalCtrl: ModalController) {
        this.user = navParams.get('user');
        this.messages = navParams.get('messages');
        this.socket = socket;
        this.currentUser = this.authService.currentUserValue;

        this.messagesService.getNewMessages(this.user._id).subscribe((give) => {
            this.messages.push(give);
            this.messagesContent.scrollToBottom();
        });

        this.messagesService.getUpdatedMessages(this.user._id).subscribe((mess) => {
            this.messages.find((message) => message._id === mess._id).text = mess.text;
        });

        this.messagesService.getDeletedMessages(this.user._id).subscribe((mess) => {
            // this.messages.remove((message) => message._id === mess._id).text = mess.text;
        });
    }

    ngAfterViewInit(): void {
        this.messagesContent.scrollToBottom();
    }

    sendMessage() {
        this.messagesContent.scrollToBottom();
        this.message.text = this.text;
        this.message.sender = this.currentUser._id;
        this.message.receiver = this.user._id;
        this.messagesService.sendMessage(this.message).subscribe();
        this.message = new Message();
        this.text = '';
    }
}
