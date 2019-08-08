import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatDetailsPage } from './chat-details.page';
import { ChatDetailsComponent } from './chat-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ChatDetailsPage }])
  ],
  declarations: [ChatDetailsPage, ChatDetailsComponent],
  entryComponents: [ChatDetailsComponent]
})
export class ChatDetailsPageModule { }
