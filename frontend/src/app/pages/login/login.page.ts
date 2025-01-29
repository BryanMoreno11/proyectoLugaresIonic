import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegmentButton, IonItem, IonLabel, IonButton,
  IonSegment, IonInput
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
    private router: Router // Router para redireccionar
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
        localStorage.setItem('token', response.token); // Guardar el token JWT en localStorage
        this.router.navigate(['/lugares']); // Redirigir al usuario a la página principal
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

  // Método para registrar un nuevo usuario
  registrarUsuario() {
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
