import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatCocinaPage } from './chat-cocina';

@NgModule({
  declarations: [
    ChatCocinaPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatCocinaPage),
  ],
})
export class ChatCocinaPageModule {}
