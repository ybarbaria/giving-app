import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatChannelComponent } from './chat-channel/chat-channel.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AutocompleteLocationComponent } from './autocomplete-location/autocomplete-location.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  declarations: [ChatChannelComponent, AutocompleteLocationComponent],
  exports: [ChatChannelComponent, AutocompleteLocationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ComponentsModule { }
