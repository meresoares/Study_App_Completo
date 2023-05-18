import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.page.html',
  styleUrls: ['./edit-topic.page.scss'],
})
export class EditTopicPage implements OnInit {
  topico: any = {};

  constructor(
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getTopicById(id);
  }

  getTopicById(id: string) {
    axios.get(`http://localhost:3000/topics/${id}`)
      .then(result => {
        console.log(result.data); // Agregar esta línea para verificar la respuesta del servidor
        if (result.data.success) {
          this.topico = result.data.topics || {}; // Actualizar la asignación de this.topico según la estructura de la respuesta del servidor
        } else {
          console.log(result.data.error);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  
  

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveTopic() {
    axios.post("http://localhost:3000/topics/update", this.topico)
      .then(result => {
        if (result.data.success) {
          this.presentToast("Tópico guardado");
          this.router.navigate(["/topic"]);
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
