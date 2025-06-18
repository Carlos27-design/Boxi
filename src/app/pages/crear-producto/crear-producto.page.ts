import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NavController, ToastController } from '@ionic/angular';
import { producto } from 'src/app/models/producto.models';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
  standalone: false,
})
export class CrearProductoPage {
  public imageFileList: FileList | undefined = undefined;
  public tempImages: string[] = [];

  private readonly router = inject(Router);
  private readonly toastController = inject(ToastController);
  private readonly _productoService = inject(ProductoService);
  private readonly _formBuilder = inject(FormBuilder);

  public productForm = this._formBuilder.group({
    codigo: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    stock: [0, [Validators.required]],
    precio: [0, [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(3)]],
    images: [[]],
  });

  public crearProducto() {
    const product = this.productForm.value as producto;

    this._productoService
      .createProducto(product, this.imageFileList)
      .subscribe(() => {
        this.toastController.create({
          message: 'Producto creado correctamente',
          duration: 2000,
        });

        this.router.navigate(['/principal']);
      });
  }

  public home() {
    this.router.navigate(['/principal']);
  }

  public onFilesChanged(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;

    this.imageFileList = fileList ?? undefined;

    const imagesUrls = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.tempImages = imagesUrls;
  }
}
