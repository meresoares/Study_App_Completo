import { Component, Injectable, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
@Injectable()
export class TopicPage implements OnInit {  
  
  topicos: any = [];

  constructor(private data: DataService) {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics() {
    axios.get("http://localhost:3000/topics/list")
      .then(result => {
        if (result.data.success == true) {
          this.topicos = result.data.topics;
        } else {
          console.log(result.data.error);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}