import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
  public productosFiltrados: producto[] = [];

  constructor(
    private readonly _productoService: ProductoService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  async presentActionSheet(producto: producto) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones del producto',
      buttons: [
        {
          text: 'Modificar producto',
          icon: 'create-outline',
          handler: () => {
            this.router.navigate(['/editar-producto'], {
              state: { producto },
            });
          }
        },
        {
          text: 'Eliminar producto',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.presentDeleteConfirm(producto);
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

  async presentDeleteConfirm(producto: producto) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: `¿Deseas eliminar <strong>${producto.nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this._productoService.deleteProducto(producto.id).subscribe({
              next: () => {
                this.getData(); // Recargar lista de productos
              },
              error: (err) => {
                console.error('Error al eliminar producto:', err);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  VerProducto(producto: any) {
    this.router.navigate(['/ver-producto'], {
      state: { producto },
    });
  }

  crearprod() {
    this.router.navigate(['/crear-producto']);
  }

  private getData() {
  this._productoService.getProductos().subscribe((productos: producto[]) => {
    this.productos = productos;
    this.productosFiltrados = productos;
  });
}

  public getImages(producto: producto): string | null {
    if (producto && producto.images && producto.images.length > 0) {
      return producto.images[0];
    }

    return null;
  }

  public filtrarProductos(event: any) {
  const query = event.target.value?.toLowerCase() || '';
  this.productosFiltrados = this.productos.filter(prod =>
    prod.nombre.toLowerCase().includes(query)
  );
}
}
