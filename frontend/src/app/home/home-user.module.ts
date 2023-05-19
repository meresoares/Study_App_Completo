import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomeUserPage } from './home-user.page';
import { HomeUserPageRoutingModule } from './home-user-routing.module';
import { MessageComponentModule } from '../message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    HomeUserPageRoutingModule
  ],
  declarations: [HomeUserPage]
})
export class HomeUserPageModule {}
