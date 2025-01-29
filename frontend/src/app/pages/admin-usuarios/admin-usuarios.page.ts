import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButtons, IonList, IonButton, IonIcon, IonFab, IonFabButton, ModalController } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { UsuarioModalPage } from '../usuario-modal/usuario-modal.page';
import { addIcons } from 'ionicons';
import { logOut, add } from 'ionicons/icons';
@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonLabel, IonButtons, IonList, IonIcon, IonFab, IonFabButton
  ]
})
export class AdminUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  usuarioActual: Usuario = {} as Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    addIcons({ logOut, add });

  }

  ngOnInit() {
    this.cargarUsuarios();
    this.usuarioService.getUsuarioActual().subscribe(
      (usuario: Usuario) => {
        this.usuarioActual = usuario;
      }
    );
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      }
    );
  }

  async editarUsuario(usuario: Usuario) {
    const modal = await this.modalCtrl.create({
      component: UsuarioModalPage,
      componentProps: {
        usuario: { ...usuario },
        esEdicion: true
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.actualizado) {
        this.cargarUsuarios();
      }
    });

    await modal.present();
  }

  async agregarUsuario() {
    const modal = await this.modalCtrl.create({
      component: UsuarioModalPage,
      componentProps: {
        usuario: {} as Usuario,
        esEdicion: false
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.agregado) {
        this.cargarUsuarios();
      }
    });

    await modal.present();
  }

  eliminarUsuario(usuario: Usuario) {
    this.usuarioService.deleteUsuario(usuario.usuario_codigo).subscribe(
      () => {
        this.cargarUsuarios();
      }
    );
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}