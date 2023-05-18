import { Component, Injectable, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})

@Injectable()
export class TopicPage implements OnInit {  
  topicos : any = [];

  constructor(
    private data: DataService
  ) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  // Actualizar luego de modificar
  ionViewWillEnter(): void {
   // this.getTopics();
  }
  ngOnInit(): void {
    this.getTopics();
  }

  // Recuperar info del backend
  getTopics () {
    axios.get("http://localhost:3000/topics/list")
    .then(result => {
      if (result.data.success == true) {
        this.topicos = result.data.topicos;
      } else {
        console.log(result.data.error)
      }
    }).catch(error => {
      console.log(error.message)
    })
  }
}
