// src/app/services/usuario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'http://localhost:3000/api'; // Asegúrate de que esta URL coincida con tu backend

  constructor(private http: HttpClient) { }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.urlBase}/usuario`, usuario);
  }

  // Iniciar sesión
  iniciarSesion(correo: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.urlBase}/usuario/iniciar-sesion`, { correo, contrasenia });
  }

  // Obtener información del usuario actual (usando JWT)
  getUsuarioActual(): Observable<Usuario> {
    const token = localStorage.getItem('token');
    console.log("el token es ", token);

    return this.http.get<Usuario>(`${this.urlBase}/usuario-actual`, {
      headers: { Authorization: `${token}` }
  });  

}

getUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.urlBase}/usuarios`);
}

updateUsuario(usuario: Usuario): Observable<any> {
  return this.http.put(`${this.urlBase}/usuario/${usuario.usuario_codigo}`, usuario);
}

deleteUsuario(usuario_codigo: number): Observable<any> {
  return this.http.delete(`${this.urlBase}/usuario/${usuario_codigo}`);
}

cerrarSesion(): void {
  localStorage.removeItem('token');
}


}