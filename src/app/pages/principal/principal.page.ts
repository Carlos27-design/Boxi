import { Component, OnInit } from '@angular/core';
import { IonHeader } from '@ionic/angular/standalone';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { producto } from 'src/app/models/producto.models';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: false,
})
export class PrincipalPage implements OnInit {
  public productos: producto[] = [];
  constructor(
    private readonly _productoService: ProductoService,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones del producto',
      buttons: [
        {
          text: 'Modificar producto',
          icon: 'create-outline',
          handler: () => {
            console.log('Modificar producto');
          },
        },
        {
          text: 'Eliminar producto',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            console.log('Eliminar producto');
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  // Define the goToPrincipal method inside the HomePage component class
  VerProducto(producto: any) {
    this.router.navigate(['/ver-producto'], {
      state: { producto }, // Esto pasa el objeto como estado
    });
  }

  crearprod() {
    this.router.navigate(['/crear-producto']); // Navigate to the 'principal' route
  }
  private getData() {
    this._productoService.getProductos().subscribe((productos: producto[]) => {
      this.productos = productos;
    });
  }

  public getImages(producto: producto): string | null {
    if (producto && producto.images && producto.images.length > 0) {
      return producto.images[0];
    }

    return null;
  }
}
