import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lugares',
    pathMatch: 'full',
  },
  {
    path: 'lugares',
    loadComponent: () => import('./pages/lugares/lugares.page').then( m => m.LugaresPage)
  },
  {
    path: 'agregarlugar',
    loadComponent: () => import('./pages/agregarlugar/agregarlugar.page').then( m => m.AgregarlugarPage)
  },
  {
    path: 'modificarlugar/:id',
    loadComponent: () => import('./pages/modificarlugar/modificarlugar.page').then( m => m.ModificarlugarPage)
  },
  {
    path: 'detallelugar/:id',
    loadComponent: () => import('./pages/detallelugar/detallelugar.page').then( m => m.DetallelugarPage)
  },
];
