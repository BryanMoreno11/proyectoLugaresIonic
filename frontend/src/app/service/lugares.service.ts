import { Injectable } from '@angular/core';
import {  Lugar } from '../models/Lugar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  
  //atributos
   urlBase= 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getLugares():Observable<Lugar[]> {
    return this.http.get<Lugar[]>(`${this.urlBase}/lugares`);
  }

  getLugar(id: number):Observable<Lugar> {
    return this.http.get<Lugar>(`${this.urlBase}/lugar/${id}`);
  }
 


  
  addLugar(lugar: {nombre: string, imagen: string}): Observable<unknown>
   {
    const newLugar: Lugar = {
      nombre: lugar.nombre,
      imagen: lugar.imagen,
    };
    
    return this.http.post<Lugar>(`${this.urlBase}/lugar`, newLugar);
  }
  updateLugar(lugarActualizado: Lugar,id:number ): Observable<unknown> {
    return this.http.put<Lugar>(`${this.urlBase}/lugar/${id}`, lugarActualizado);
    }

    deleteLugar(id: number):Observable<unknown> {
      return this.http.delete<Lugar>(`${this.urlBase}/lugar/${id}`);
     }



  }
  // addComentario(lugarId: number, comentario: Comentario) {
  //   const lugar = this.lugares.find(l => l.id === lugarId);
  //   if (lugar) {
  //     lugar.comentarios?.push(comentario);
  //     this.lugarActualizado.next(lugar);
  //   } else {
  //     throw new Error('Lugar no encontrado');
  //   }
  // }

  // deleteComentario(lugarId: number, comentarioIndex: number) {
  //   const lugar = this.lugares.find(l => l.id === lugarId);
  //   if (lugar) {
  //     lugar.comentarios.splice(comentarioIndex, 1);
  //     this.lugarActualizado.next(lugar);
  //   } else {
  //     throw new Error('Lugar no encontrado');
  //   }
  // }

  



