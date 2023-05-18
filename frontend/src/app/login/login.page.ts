import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  login() {
    // Realizar la solicitud HTTP para verificar el inicio de sesión
    axios.post("http://localhost:3000/login", this.usuario)
      .then(async (response) => {
        const data = response.data;
        if (data.success) {
          // Inicio de sesión exitoso
          this.presentToast('Inicio de sesión exitoso');
          // Redirigir al componente deseado después del inicio de sesión
          this.router.navigate(['/home']);
        } else {
          // Error en el inicio de sesión
          this.presentToast('Credenciales inválidas');
        }
      })
      .catch((error) => {
        console.log(error);
        // Error en la solicitud HTTP
        this.presentToast('Ocurrió un error. Inténtalo nuevamente');
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
