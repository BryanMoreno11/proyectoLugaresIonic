import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegmentButton, IonItem, IonLabel, IonButton,
  IonSegment, IonInput, AlertController

 } from '@ionic/angular/standalone';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';







@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonSegmentButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonSegment, IonInput
  ]
})
export class LoginPage implements OnInit {
  constructor(
    private usuarioService: UsuarioService, // Servicio para manejar usuarios
    private router: Router,// Router para redireccionar
    private alertController:AlertController 
  ) {}


  ngOnInit() {
  }
  segment: 'login' | 'register' = 'login'; // Segmento activo (login o registro)

  // Datos para el inicio de sesión
  loginData = {
    correo: '',
    contrasenia: ''
  };

  // Datos para el registro
  registerData: Usuario = {
    usuario_codigo: 0,
    nombre: '',
    correo: '',
    contrasenia: '',
    fecha_creacion: new Date(),
    imagen: '',
    tipo: 'cliente'
  };

  
  // Método para iniciar sesión
  iniciarSesion() {
    this.usuarioService.iniciarSesion(this.loginData.correo, this.loginData.contrasenia).subscribe(
      (response: any) => {
        this.presentAlert('Inicio de sesión exitoso', '¡Bienvenido!');
        localStorage.setItem('token', response.token); // Guardar el token JWT en localStorage
        this.router.navigate(['/lugares']); // Redirigir al usuario a la página principal
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.presentAlert('Error de inicio de sesión', 'Correo o contraseña incorrectos');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  // Método para registrar un nuevo usuario
  registrarUsuario() {

    if(this.validarUsuario()){
      this.usuarioService.registrarUsuario(this.registerData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.segment = 'login'; // Cambiar al segmento de inicio de sesión después del registro
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
    
  }

  validarUsuario(){
    if (this.registerData.correo === '') {
      this.presentAlert('Error', 'Ingrese un correo valido');
      return false;
    }

    if(this.registerData.contrasenia === ''){
      this.presentAlert('Error', 'Ingrese una contraseña valida');
      return false;
    }

    if(this.registerData.nombre === ''){
      this.presentAlert('Error', 'Ingrese un nombre valido');
      return false;
    }
   return true;
  }

}
