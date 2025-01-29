import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lugares',
    pathMatch: 'full',
  },
  {
    path: 'lugares',
    loadComponent: () => import('./pages/lugares/lugares.page').then( m => m.LugaresPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregarlugar',
    loadComponent: () => import('./pages/agregarlugar/agregarlugar.page').then( m => m.AgregarlugarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'modificarlugar/:id',
    loadComponent: () => import('./pages/modificarlugar/modificarlugar.page').then( m => m.ModificarlugarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'detallelugar/:id',
    loadComponent: () => import('./pages/detallelugar/detallelugar.page').then( m => m.DetallelugarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
