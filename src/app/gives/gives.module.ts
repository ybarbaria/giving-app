import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GivesPage } from './gives.page';
import { GiveDetailsPage } from './give-details/give-details.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: GivesPage }])
  ],
  entryComponents: [
    GiveDetailsPage
  ],
  declarations: [GivesPage, GiveDetailsPage]
})
export class GivesPageModule { }
