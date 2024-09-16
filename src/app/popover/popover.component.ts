import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  usuario: any;
  constructor(private router: Router, private popoverController: PopoverController) {}

  ngOnInit(){
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData);
    }
  }
  
  // Método para navegar a la página de cambio de contraseña
  cambiarContrasena() {
    this.popoverController.dismiss();
    this.router.navigate(['/cambio-contrasena'], { replaceUrl: true });
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.popoverController.dismiss();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}