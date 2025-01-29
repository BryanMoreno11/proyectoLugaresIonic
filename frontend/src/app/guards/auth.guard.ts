import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  usuario: Usuario | null = null;

  constructor(private router: Router,
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convertir a segundos

        if (decodedToken.exp > currentTime) {
          return true; // El token es válido
        } else {
          // El token ha expirado
          localStorage.removeItem('token'); // Opcional: eliminar el token expirado
          this.router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }


}



