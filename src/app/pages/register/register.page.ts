import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage {
  registerData = {
    fullName: '',
    email: '',
    password: '',
  };

  confirmPassword: string = '';
  termsAccepted: boolean = false;
  private readonly router = inject(Router);
  constructor(private authService: AuthService, private toastCtrl: ToastController) {}

  async crearUsuario() {
    const { fullName, email, password } = this.registerData;

    if (!fullName || !email || !password || !this.confirmPassword) {
      this.presentToast('Todos los campos son obligatorios.');
      return;
    }

    if (password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }

    if (!this.termsAccepted) {
      this.presentToast('Debe aceptar los términos.');
      return;
    }

    try {
      await this.authService.register(this.registerData).toPromise();
      this.presentToast('Usuario creado exitosamente.');
    } catch (error) {
      this.presentToast('Error al crear usuario.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }

  public home() {
    this.router.navigate(['/home']);
  }
  
}
