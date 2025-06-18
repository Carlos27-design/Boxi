import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) { }  // Inject Router into the constructor

  // Define the goToPrincipal method inside the HomePage component class
  goToPrincipal() {
    this.router.navigate(['/principal']);  // Navigate to the 'principal' route
  }

  Register() {
    this.router.navigate(['/register']);  // Navigate to the 'principal' route
  }

}
