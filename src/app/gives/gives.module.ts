import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GivesPage } from './gives.page';
import { GiveDetailsPage } from './give-details/give-details.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: GivesPage }])
  ],
  entryComponents: [
    GiveDetailsPage,
    // ChatDetailsPage
  ],
  declarations: [GivesPage, GiveDetailsPage]
})
export class GivesPageModule { }
