import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  usuario: any = {};

  constructor(
    private toastController: ToastController, 
    private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/user/" +id)
    .then(result => {
      if (result.data.success == true) {
        if(result.data.usuario != null) {
          this.usuario = result.data.usuario;
        } else {
          this.usuario = {};
        }
      } else {
        console.log(result.data.error)
      }
    }).catch(error => {
      console.log(error.message)
    })
  }

  ionViewWillEnter(): void {
    // Verifica si el usuario eta logueado
    let token = localStorage.getItem("token");
    if (token) {
      this.router.navigate(["/home"]);
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  loginUser() {
    console.log("usuario", this.usuario);
    var data = {
      email: this.usuario.email,
      password: this.usuario.password
    };

    // Url del postman
    axios.post("http://localhost:3000/user/login", data)
    .then(async (result) => {
      if (result.data.success == true) {
        this.presentToast("Usuario logueado");
        localStorage.setItem("token", result.data.token);

        this.router.navigate(["/home"]);
  
      } else {
        this.presentToast(result.data.error);
      }
    }).catch(error => {
      this.presentToast(error.message);
    })
  }

  /* deleteUser() {
    console.log("usuario", this.usuario);
    var data = {
      id : this.usuario.id, 
      name: this.usuario.name,
      last_name: this.usuario.last_name,
      email: this.usuario.email,
      password: this.usuario.password
    };

    // Url del postman
    axios.delete("http://localhost:3000/users/delete/${data.id}")
    .then(async (result) => {
      if (result.status == 200) {
        this.presentToast("Usuario eliminado correctamente");
        this.router.navigate(["/home"]);
  
      } else {
        this.presentToast("Error al eliminar el usuario");
      }
    }).catch(error => {
      this.presentToast("Error de conexión: " + error.message);
    })
  } */

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();

  }
}
