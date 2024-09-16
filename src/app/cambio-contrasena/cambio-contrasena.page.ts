import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {

  cambioContrasena: FormGroup;
  usuario: any;
  constructor(public fb: FormBuilder, public alertController: AlertController, private toastController: ToastController, private router: Router) {

    this.cambioContrasena = this.fb.group({
      
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      nuevaContrasena: ['', Validators.required],
      nuevaContrasenaConfirmacion: ['', Validators.required]

    })
    

   }

  ngOnInit() {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData);

      
      this.cambioContrasena.patchValue({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        correo: this.usuario.correo
      });
    }
    
  }
  async cambiarContrasena() {
    const contrasenaActual = this.cambioContrasena.get('contrasena')?.value;
    const nuevaContrasena = this.cambioContrasena.get('nuevaContrasena')?.value;
    const nuevaContrasenaConfirmacion = this.cambioContrasena.get('nuevaContrasenaConfirmacion')?.value;

    if (!nuevaContrasena || !nuevaContrasenaConfirmacion) {
      this.presentToast('Los campos de nueva contraseña y su confirmación no pueden estar vacíos', 'danger');
      return;
    }
    
    if (contrasenaActual !== this.usuario.contrasena) {
      this.presentToast('La contraseña actual no es correcta', 'danger');
      return;
    }

    
    if (nuevaContrasena === contrasenaActual) {
      this.presentToast('La nueva contraseña no puede ser igual a la actual', 'danger');
      return;
    }

    
    if (nuevaContrasena !== nuevaContrasenaConfirmacion) {
      this.presentToast('Las nuevas contraseñas no coinciden', 'danger');
      return;
    }

    
    this.usuario.contrasena = nuevaContrasena;
    localStorage.setItem('usuario', JSON.stringify(this.usuario));

    this.presentToast('Contraseña actualizada exitosamente', 'success');
    this.router.navigate(['/login'], { replaceUrl: true }); 
  }

  async presentToast(mensaje: string, tipo: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: tipo, 
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

}
