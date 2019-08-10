import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatDetailsModalPage } from './chat-details-modal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forChild([{ path: '', component: ChatDetailsModalPage }])
    ],
    exports: [
        ChatDetailsModalPage
    ],
    declarations: [ChatDetailsModalPage]
})
export class ChatDetailsModalModule { }
