import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false,
})
export class HomePage {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  async login() {
    const { email, password } = this.loginData;

    if (!email || !password) {
      this.presentToast('Por favor, complete todos los campos.');
      return;
    }

    try {
      const res = await this.authService.login(this.loginData).toPromise();
      this.presentToast('Inicio de sesión exitoso.');
      this.router.navigate(['/principal']);
    } catch (error) {
      this.presentToast('Credenciales inválidas.');
    }
  }

  Register() {
    this.router.navigate(['/register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }
}
