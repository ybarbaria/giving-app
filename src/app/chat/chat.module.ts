import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';
import { ChatDetailsPage } from './chat-details/chat-details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ChatPage }])
  ],
  entryComponents: [
    ChatDetailsPage
  ],
  declarations: [ChatPage, ChatDetailsPage]
})
export class ChatPageModule { }
