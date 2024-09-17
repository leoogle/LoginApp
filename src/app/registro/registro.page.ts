import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroUsuario: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private toastController: ToastController, private router: Router) {

    this.registroUsuario = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'correo': new FormControl("",[Validators.required, Validators.email]),
      'contrasena': new FormControl("",Validators.required),
      'contrasenaConfirmacion': new FormControl("",Validators.required)

    })
   }

  ngOnInit() {
  }
  async registroToast() {
    const toast = await this.toastController.create({
      message: 'Cuenta creada con exito',
      duration: 2000, 
      color: 'success', 
      position: 'bottom'
    });
    toast.present();
  }

  async guardar(){
    let f = this.registroUsuario.value;

    if(this.registroUsuario.invalid){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Datos incompletos',
        message: 'Debes completas todos los campos para poder registrarte',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }else{
      this.registroToast();
      this.router.navigate(['/login'],{ replaceUrl: true });   
      let usuario = {
        nombre: f.nombre,
        apellido: f.apellido,
        correo: f.correo,
        contrasena: f.contrasena,
        contrasenaConfirmacion: f.contrasenaConfirmacion
      }
  
      localStorage.setItem('usuario',JSON.stringify(usuario))

    }
    

  }
    

}
