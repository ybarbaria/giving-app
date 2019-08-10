import { Component, ViewChild, Input } from '@angular/core';
import { User, Message } from 'src/app/_models';
import { IonContent } from '@ionic/angular';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-chat-channel-cmp',
  templateUrl: './chat-channel.component.html',
  styleUrls: ['./chat-channel.component.scss'],
})
export class ChatChannelComponent {
  @ViewChild(IonContent) content: IonContent;

  @Input()
  set currentUser(value) {
    this._currentUser = value;
    if (value) {
      this.messagesService.getNewMessages(value._id).subscribe((message) => {
        this.messages.push(message);
        this.content.scrollToBottom();
      });
    }
  }
  get currentUser(): User {
    return this._currentUser;
  }
  private _currentUser: User;

  messages: Message[];
  message: Message = new Message();
  text: string;

  @Input()
  set user(value) {
    this._user = value;
    if (value) {
      this.messagesService.getMessagesBetweenUsers(this._currentUser._id, value._id).subscribe(
        (messages) => {
          this.messages = messages;
          this.content.scrollToBottom();
        }
      );
    }
  }
  get user(): User {
    return this._user;
  }
  private _user: User;

  constructor(private messagesService: MessagesService) {
  }

  sendMessage() {
    this.message.text = this.text;
    this.message.sender = this._currentUser._id;
    this.message.receiver = this._user._id;
    this.messagesService.sendMessage(this.message).subscribe();
    this.message = new Message();
    this.text = '';
  }
}
