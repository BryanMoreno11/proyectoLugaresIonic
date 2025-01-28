import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFabButton, IonGrid, IonRow, IonCol, IonCardHeader, IonCard, IonCardTitle, IonFab, IonItem, IonList, IonAvatar, IonImg, IonLabel,
  IonInput
 } from '@ionic/angular/standalone';
import { Lugar } from 'src/app/models/Lugar';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LugaresService } from 'src/app/service/lugares.service';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular/standalone';
import { addOutline, airplane, cogSharp, globe } from 'ionicons/icons';
import { AgregarlugarPage } from '../agregarlugar/agregarlugar.page';
import { LoadingComponent } from 'src/app/Componentes/loading/loading.component';
@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonContent, IonHeader, IonTitle,IonGrid, IonCard,IonCardHeader,IonCardTitle,IonRow,IonCol,IonToolbar,IonButtons,IonButton ,CommonModule, FormsModule, IonList, IonItem, IonInput,
    LoadingComponent
  ]
})
export class LugaresPage implements OnInit 
{

  lugares: Lugar[] = [];
  private lugarSubscription?: Subscription;
  lugaresAux: Lugar[] = [];
  lugarBuscado:string="";
  isLoading = true;



  constructor( private route: ActivatedRoute,private router: Router, private lugaresService: LugaresService ,private modalCtrl: ModalController)
   {
       addIcons({airplane,globe,addOutline});
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadData();
      });
    }

  
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: AgregarlugarPage
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.lugaresService.addLugar(data.data).subscribe(
          (res:any) => {
            this.loadData();
          }
        );
     
      }
    });

    return await modal.present();

  }
  verDetalle(id: number) {
    this.router.navigate(['/detallelugar',id]);
    
  }
  ngOnDestroy() {
    this.lugarSubscription?.unsubscribe();
  }

  buscarLugar() {
    console.log("El lugar buscado es ",this.lugarBuscado);
    this.lugaresAux = this.lugares.filter(lugar => lugar.nombre.toLowerCase().includes(this.lugarBuscado.toLowerCase()));
    if(this.lugaresAux.length == 0){
      this.lugaresAux = this.lugares;
    }
  }
  private loadData() {
    this.isLoading=true
    this.lugaresService.getLugares().subscribe(
      (lugares: Lugar[]) => {
        this.lugares = lugares;
        this.lugaresAux = [...lugares];
        console.log("Los lugares son ",this.lugares);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los lugares', error);
        this.isLoading = false;
      }
    );

  }

}
