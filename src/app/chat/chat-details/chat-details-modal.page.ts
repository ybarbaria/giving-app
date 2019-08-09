import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { MessagesService } from '../../_services/messages.service';
import { AuthenticationService } from '../../_services/auth.service';
import { User, Message } from '../../_models';

@Component({
  selector: 'app-chat-details-modal',
  templateUrl: './chat-details-modal.page.html',
  styleUrls: ['./chat-details-modal.page.scss'],
})
export class ChatDetailsModalPage implements OnInit {
  currentUser: User;
  user: User;
  messages: Message[];
  message: Message = new Message();
  text: string;

  constructor(private _socket: Socket,
    private _navParams: NavParams,
    private _messagesService: MessagesService,
    private _authService: AuthenticationService,
    public modalCtrl: ModalController) {

    this.user = this._navParams.get('user');
    this.messages = this._navParams.get('messages');
    this._socket = this._socket;
    this.currentUser = this._authService.currentUserValue;
  }

  ngOnInit() {
  }

  closeItself() {
    this.modalCtrl.dismiss();
  }
}
