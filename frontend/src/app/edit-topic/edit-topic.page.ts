import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.page.html',
  styleUrls: ['./edit-topic.page.scss'],
})
export class EditTopicPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  topico: any = {};

  constructor(
    private toastController: ToastController, 
    private router: Router) {}

    ngOnInit() {
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
      axios.get("http://localhost:3000/topics/" + id)
        .then(result => {
          if (result.data.success == true) {
            if (result.data.topico != null) {
              this.topico = result.data.topico;
            } else {
              this.topico = {};
            }
          } else {
            console.log(result.data.error);
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
    

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  saveTopic() {
    console.log("topico", this.topico);
    var data = {
      id : this.topico.id, 
      create_date: this.topico.create_date,
      name: this.topico.name,
      order: this.topico.order,
      priority: this.topico.priority,
      color: this.topico.color,
      // Falta topic id y owner_user_id
    };

    // Url del postman
    axios.post("http://localhost:3000/topics/update", data)
    .then(async (result) => {
      if (result.data.success == true) {
        this.presentToast("Topico guardardo");

        // Ruta donde va despues de guardar
        this.router.navigate(["/topic"]);
  
      } else {
        this.presentToast(result.data.error);
      }
    }).catch(error => {
      this.presentToast(error.message);
    })
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
