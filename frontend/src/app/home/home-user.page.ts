import { Component, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';


@Component({
  selector: 'app-user',
  templateUrl: 'home-user.page.html',
  styleUrls: ['home-user.page.scss'],
})
export class HomeUserPage implements OnInit {
  private data = inject(DataService);
  
  usuarios : any = [];

  constructor(
    private router: Router
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
     // Verifica si el usuario eta logueado
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");
    if (token) {
      this.router.navigate(["/login"]);
      return;
    }

      this.getUsers();
  }
  ngOnInit(): void {
    this.getUsers();
  }

  // Recuperar info del backend
  getUsers () {
    let token = localStorage.getItem("token");
    let config = {
      headers : {
      "Authorization" : token
    }
  }

    axios.get("http://localhost:3000/users/list", config)
    .then(result => {
      if (result.data.success == true) {
        this.usuarios = result.data.usuarios;
      } else {
        console.log(result.data.error)
      }
    }).catch(error => {
      console.log(error.message)
    })
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
}
