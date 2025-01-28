import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/Comentario';
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { 

  }
  urlBase= 'http://localhost:3000/api'

  getComentariosByLugar(lugar:number):Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.urlBase}/comentarios/lugar/${lugar}`);

  }

  insertarComentario(comentario: Comentario): Observable<unknown> {
    return this.http.post<Comentario>(`${this.urlBase}/comentario`, comentario);
  }

  eliminarComentario(comentario_codigo: number): Observable<unknown> {
    return this.http.delete<Comentario>(`${this.urlBase}/comentario/${comentario_codigo}`);
  }

  actualizarComentario(comentario: Comentario): Observable<unknown> {
    return this.http.put<Comentario>(`${this.urlBase}/comentario/${comentario.comentario_codigo}`, comentario);
  }

}

