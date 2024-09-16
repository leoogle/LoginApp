import { Component, OnInit } from '@angular/core';
import { FormGroup,
FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController,private toastController: ToastController, private router: Router) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'contrasena': new FormControl("",[Validators.required,Validators.email])

    })

   }

  ngOnInit() {
  }
  async loginToast() {
    const toast = await this.toastController.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000, 
      color: 'success', 
      position: 'bottom'
    });
    toast.present();
  }
  async ingresar(){
    let f = this.formularioLogin.value;
    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if(usuario.correo == f.correo && usuario.contrasena == f.contrasena){
      this.router.navigate(['/principal'],{ replaceUrl: true });   
      this.loginToast();
    }else{const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Datos incorrectos',
      message: 'Debes ingresar con usuario y contraseña validos',
      buttons: ['Aceptar']
    });
    await alert.present();

    }
  }

}
