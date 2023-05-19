import { Component, Injectable, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
@Injectable()
export class TopicPage implements OnInit {  
  private activatedRoute = inject(ActivatedRoute);

  topicos: any = [];

  constructor(private data: DataService,
    private toastController: ToastController,
    private router: Router) {}

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

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

deleteTopic(id: string) {
  axios.delete(`http://localhost:3000/topics/delete/` + id)
    .then(result => {
      if (result.data.success) {
        this.presentToast("Tópico eliminado");
        this.getTopics(); // Vuelve a cargar los tópicos después de eliminar uno
      } else {
        this.presentToast(result.data.error);
      }
    })
    .catch(error => {
      this.presentToast(error.message);
    });
}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: 'bottom'
  });
  await toast.present();
}

}