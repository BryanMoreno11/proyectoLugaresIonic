import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput,IonContent, IonHeader, IonTitle, IonToolbar, ModalController, IonButtons, IonButton, IonLabel, IonItem } from '@ionic/angular/standalone';


@Component({
  selector: 'app-agregarlugar',
  templateUrl: './agregarlugar.page.html',
  styleUrls: ['./agregarlugar.page.scss'],
  standalone: true,
  imports: [IonInput,IonLabel, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonItem,IonToolbar,IonButton ,IonButtons,CommonModule, FormsModule,ReactiveFormsModule]
})
export class AgregarlugarPage implements OnInit {

  lugarForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.lugarForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveLugar() {
    if (this.lugarForm.valid) {
      this.modalCtrl.dismiss(this.lugarForm.value);
    }
  }

  ngOnInit() {
    console.log("holi");
  }
}
