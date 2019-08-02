import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessagesService } from '../_services/messages.service';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../_services/auth.service';
import { User, Message } from '../_models';
import { GivesService } from '../_services/gives.service';
import { UserService } from '../_services/user.service';

import * as _ from 'lodash';
import { ChatDetailsPage } from './chat-details/chat-details.page';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {
  currentUser: User;
  socket: Socket;
  messages: Message[];
  message: Message = new Message();
  text: string;
  usersId: string[] = [];
  users: UserMessage[] = [];

  constructor(socket: Socket,
    private usersService: UserService,
    private messagesService: MessagesService,
    private modalCtrl: ModalController,
    private authService: AuthenticationService) {
    this.socket = socket;
    this.currentUser = this.authService.currentUserValue;

    // all object available 
    this.messagesService.getMessages(this.currentUser._id).subscribe((messages) => {
      this.messages = messages;
      if (this.messages.length) {
        this.messages.forEach(m => {
          this.usersId.push(m.receiver);
          this.usersId.push(m.sender);
        });
      }

      _.uniq(this.usersId).forEach(id => {
        if (id !== this.currentUser._id) {
          this.usersService.getUser(id).subscribe((user) => {
            this.users.push(new UserMessage(user));
          });
        }
      });
    });

    this.messagesService.getNewMessages(this.currentUser._id).subscribe((mess) => {
      (_.find(this.users, (u) => u._id === mess.sender)).newMessage++;
      this.messages.push(mess);

    });

    this.messagesService.getUpdatedMessages(this.currentUser._id).subscribe((mess) => {
      this.messages.find((message) => message._id === mess._id).text = mess.text;
    });

    this.messagesService.getDeletedMessages(this.currentUser._id).subscribe((mess) => {
      // this.messages.remove((message) => message._id === mess._id).text = mess.text;
    });
  }

  async openDetailModal(userModal: UserMessage) {
    userModal.newMessage = null;
    let mess = _.forEach(this.messages, (m) =>
      m.receiver === userModal._id || m.sender === userModal._id
    );
    mess = _.orderBy(mess, 'createdDate');

    const modal = await this.modalCtrl.create({
      component: ChatDetailsPage,
      componentProps: { user: userModal, messages: mess }
    });
    return await modal.present();
  }
}

class UserMessage extends User {
  newMessage: number;
  constructor(user: User) {
    super();
    this._id = user._id;
    this.username = user.username;
    this.newMessage = null;
  }
}


