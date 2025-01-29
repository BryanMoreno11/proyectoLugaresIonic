import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,AlertController, IonItem, IonCardTitle, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import {  Lugar } from 'src/app/models/Lugar';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { addIcons } from 'ionicons';
import { chatbubblesOutline, closeCircleOutline, pencilOutline } from 'ionicons/icons';
import { IonAvatar, IonGrid, IonRow , IonCol} from '@ionic/angular/standalone';
import { ComentariosService } from 'src/app/service/comentarios.service';
import { Comentario } from 'src/app/models/Comentario';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-detallelugar',
  templateUrl: './detallelugar.page.html',
  styleUrls: ['./detallelugar.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonButton, IonIcon, IonFabButton, IonFab, IonLabel, IonCardTitle, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink,
    IonAvatar
  ]
})
export class DetallelugarPage implements OnInit {

  lugar?: Lugar;
  comentario: Comentario = {  comentario: '',
    usuario_codigo: 0,
    lugar_codigo: 0,
    usuario_nombre: '',
    usuario_imagen: '',
   };
  comentarios: Comentario[] = [];
  usuario:Usuario= {} as Usuario;


  private lugarSubscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private alertController: AlertController,
    private  comentariosService:ComentariosService,
    private usuariosService:UsuarioService
    
  ) {
    addIcons({pencilOutline,closeCircleOutline,chatbubblesOutline});
  }

  ngOnInit() {
    this.usuariosService.getUsuarioActual().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        console.log('Usuario actual:', this.usuario);
      }
    );
    this.route.paramMap.subscribe(params => {
      const lugarIdParam = params.get('id');
      if (lugarIdParam !== null && this.usuario) {
        const lugarId = +lugarIdParam;
        this.lugaresService.getLugar(lugarId).subscribe(lugar => {
          this.lugar = lugar;
          this.comentario.lugar_codigo = this.lugar.lugar_codigo!;
          this.comentario.usuario_codigo = this.usuario.usuario_codigo;
          console.log("el comentario es ", this.comentario);
        }, error => {
          this.router.navigate(['/lugares']);
        });

        this.obtenerComentarios(lugarId);
      } else {
        console.error('El parámetro ID es nulo');
      }
    });
  }
  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }


obtenerComentarios(lugar:number):void{
  this.comentariosService.getComentariosByLugar(lugar).subscribe(comentarios => {
    this.comentarios = comentarios;
  });
}




  async mostrarFormularioComentario() {
    const alert = await this.alertController.create({
      header: 'Agregar Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          placeholder: 'Comentario'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            this.comentario.comentario = data.comentario;
            this.comentario.usuario_codigo = this.usuario.usuario_codigo;
            this.agregarComentario(this.comentario);
          }
        }
      ]
    });

    await alert.present();
  }
  agregarComentario(comentario: Comentario) {
    if (this.lugar  && comentario) {
      this.comentariosService.insertarComentario(comentario).subscribe(
        (res) => {
          this.obtenerComentarios(this.lugar?.lugar_codigo!);
        },
        (error) => {
          console.error('Error al agregar el comentario:', error);
        }
      );
    }
  }
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarLugar();
          }
        }
      ]
    });

    await alert.present();
  }
  eliminarLugar() {
    if (this.lugar) {
    this.lugaresService.deleteLugar(this.lugar.lugar_codigo!).subscribe(
        (res) => {
          this.router.navigate(['/lugares']);
        },
        (error) => {
          console.error('Error al eliminar el lugar:', error);
        }
      );
     
    }
  }
  

}
