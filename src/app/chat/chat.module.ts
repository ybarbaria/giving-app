import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';
import { ChatDetailsModalPage } from './chat-details/chat-details-modal.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: ChatPage }])
  ],
  entryComponents: [ChatDetailsModalPage],
  declarations: [ChatPage, ChatDetailsModalPage]
})
export class ChatPageModule { }
