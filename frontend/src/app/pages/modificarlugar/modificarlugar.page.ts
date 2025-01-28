import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonInput,
  AlertController
 } from '@ionic/angular/standalone';
import {  Lugar } from 'src/app/models/Lugar';
import { Comentario } from 'src/app/models/Comentario';
import { ActivatedRoute, Router } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { ComentariosService } from 'src/app/service/comentarios.service';

@Component({
  selector: 'app-modificarlugar',
  templateUrl: './modificarlugar.page.html',
  styleUrls: ['./modificarlugar.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,IonInput ,CommonModule, FormsModule,
    
  ]
})
export class ModificarlugarPage implements OnInit {

  lugar?: Lugar;
  comentariosEditando: Comentario[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private comentariosService: ComentariosService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lugarIdParam = this.route.snapshot.paramMap.get('id');
      if (lugarIdParam !== null) {
        const lugarId = +lugarIdParam;
        this.lugaresService.getLugar(lugarId).subscribe(lugar => {
          this.lugar = lugar;
          this.obtenerComentarios(lugar.lugar_codigo!);
        });
      } else {
        console.error('El parámetro ID es nulo');
      }
    });
   
  }

  guardarCambios() {
    if (this.lugar) {
      console.log('Antes de actualizar:', this.comentariosEditando);
      this.lugaresService.updateLugar(this.lugar, this.lugar.lugar_codigo! ).subscribe(
        (res) => {
          this.router.navigate(['/detallelugar', this.lugar?.lugar_codigo]);
        },
        (error) => {
          console.error('Error al actualizar el lugar:', error);
        }
      );
    }
  }
  
  eliminarComentario(index: number) {
    this.comentariosService.eliminarComentario(this.comentariosEditando[index].comentario_codigo!).subscribe(
      () => {
        this.obtenerComentarios(this.lugar!.lugar_codigo!);
        this.presentAlert('Comentario eliminado', 'El comentario ha sido eliminado correctamente.');
      },
      (error) => {
        console.error('Error al eliminar el comentario:', error);
      }
    );
  }

  obtenerComentarios(lugar:number) {
   this.comentariosService.getComentariosByLugar(lugar).subscribe(
      (comentarios) => {
        this.comentariosEditando = comentarios;
      },
      (error) => {
        console.error('Error al obtener los comentarios:', error);
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

  modificarComentario(comentario: Comentario) {
    if (comentario.comentario.trim() !== "") {
      this.comentariosService.actualizarComentario(comentario).subscribe(
        async (res) => {
          this.obtenerComentarios(this.lugar!.lugar_codigo!);
          await this.presentAlert("Éxito", "El comanterio se actualizo correctamente"); 
        },
        (error) => {
          console.error('Error al actualizar el comentario:', error);
        }
      );
    } else {
      this.obtenerComentarios(this.lugar!.lugar_codigo!);
    }
  }
  

 
}
