import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GivesPage } from './gives.page';
import { MatCardModule } from '@angular/material/card';
import { GiveDetailsPage } from './give-details/give-details.page';
import { ChatDetailsPage } from '../chat/chat-details/chat-details.page';
import { ChatPageModule } from '../chat/chat.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: GivesPage }])
  ],
  entryComponents: [
    GiveDetailsPage
  ],
  declarations: [GivesPage, GiveDetailsPage]
})
export class GivesPageModule { }
