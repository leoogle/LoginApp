import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ClaseDetalleComponent } from '../components/clase-detalle/clase-detalle.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: any;
  clases: any[] = [];
  claseSeleccionada: any = null;
  popoverEvent: any;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController 
  ) {}

  ngOnInit() {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData);
    }

    this.clases = [
      { nombre: 'Matemáticas', horario: 'Lunes 10:00 AM', imagen: 'assets/img/matematicas.jpeg', profesor: 'Arthur Ovalle', descripcion: 'Clase avanzada de matemáticas', sala: '2204' },
      { nombre: 'Física', horario: 'Martes 11:00 AM', imagen: 'assets/img/fisica.jpeg', profesor: 'Claudio Casillas', descripcion: 'Clase de física experimental', sala: '2208' },
      { nombre: 'Química', horario: 'Miércoles 12:00 PM', imagen: 'assets/img/quimica.jpeg', profesor: 'Pedro Navas', descripcion: 'Clase de química orgánica', sala: '3301' },
      { nombre: 'Historia', horario: 'Jueves 09:00 AM', imagen: 'assets/img/historia.jpeg', profesor: 'Orlando Padilla', descripcion: 'Historia mundial', sala: '1203' },
      { nombre: 'Geografía', horario: 'Viernes 08:00 AM', imagen: 'assets/img/geografia.jpeg', profesor: 'Pablo Mandel', descripcion: 'Geografía física y política', sala: '2209' },
      { nombre: 'Arte', horario: 'Sábado 02:00 PM', imagen: 'assets/img/arte.jpeg', profesor: 'Ignacio Vicuña', descripcion: 'Historia del arte clásico', sala: '2104' },
    ];
  }

  async verDetalles(clase: any) {
    const modal = await this.modalController.create({
      component: ClaseDetalleComponent,
      componentProps: {
        clase: clase
      }
    });
    await modal.present();
  }


  
  async abrirMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent, 
      event: ev,
      translucent: true,
    });
    await popover.present();
  }
  
  
}