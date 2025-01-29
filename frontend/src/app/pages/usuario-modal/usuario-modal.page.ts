import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, ModalController } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.page.html',
  styleUrls: ['./usuario-modal.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption
  ]
})
export class UsuarioModalPage  {

  @Input() usuario: Usuario = {} as Usuario;
  @Input() esEdicion: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService
  ) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarUsuario() {
    if (this.esEdicion) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.modalCtrl.dismiss({ usuario: this.usuario, actualizado: true });
      });
    } else {
      this.usuarioService.registrarUsuario(this.usuario).subscribe(() => {
        this.modalCtrl.dismiss({ usuario: this.usuario, agregado: true });
      });
    }
  }

}
