import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  usuario: Usuario = {} as Usuario;

  async canActivate(): Promise<boolean> {
    try {
      const usuario = await this.usuarioService.getUsuarioActual().toPromise();
      if (usuario && usuario.tipo === 'admin') {
        return true; // Permite el acceso
      } else {
        this.router.navigate(['/login']); 
        return false; // Deniega el acceso
      }
    } catch (error) {
      this.router.navigate(['/login']); 
      return false; 
    }
  }
}