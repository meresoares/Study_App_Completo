import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TopicPage } from './topic.page';
import { TopicPageRoutingModule } from './topic-routing.module';
import { MessageComponentModule } from '../message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    TopicPageRoutingModule
  ],
  declarations: [TopicPage]
})
export class TopicPageModule {}
