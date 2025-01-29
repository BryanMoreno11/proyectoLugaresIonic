import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, ModalController, AlertController } from '@ionic/angular/standalone';
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
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarUsuario() {
    if (this.esEdicion  && this.validacionesUsuario()) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.modalCtrl.dismiss({ usuario: this.usuario, actualizado: true });
      });
    } else if (!this.esEdicion && this.validacionesUsuario()) {
      this.usuarioService.registrarUsuario(this.usuario).subscribe(() => {
        this.modalCtrl.dismiss({ usuario: this.usuario, agregado: true });
      });
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  validacionesUsuario(){

    if(!this.usuario.nombre || this.usuario.nombre.trim() == ''){
      this.presentAlert('Error', 'Ingrese un nombre valido');
      return false;
    }

    if(!this.usuario.correo || this.usuario.correo.trim() == ''){
      this.presentAlert('Error', 'Ingrese un correo valido');
      return false;
    }
    if(!this.usuario.contrasenia || this.usuario.contrasenia.trim() == ''){
      this.presentAlert('Error', 'Ingrese una contraseña valida');
      return false;
    }

    if(!this.usuario.tipo || this.usuario.tipo.trim() == ''){
      this.presentAlert('Error', 'Ingrese un tipo de usuario valido');
      return false;
    }

    console.log("El usuario tipo es ", this.usuario.tipo);

    

    return true;

  }

}
