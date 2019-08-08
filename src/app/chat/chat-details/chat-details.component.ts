import { Component, ViewChild, Input, NgZone } from '@angular/core';
import { Message, User } from 'src/app/_models';
import { MessagesService } from 'src/app/_services/messages.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-details-cmp',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss']
})
export class ChatDetailsComponent {
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
