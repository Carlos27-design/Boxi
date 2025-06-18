import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
  standalone:false,
})
export class VerProductoPage {
  producto: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.producto = nav?.extras.state?.['producto'];
  }

  goBack() {
    this.router.navigate(['/principal']);
  }
}
