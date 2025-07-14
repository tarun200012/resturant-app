import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resturant-app');

  constructor(private router: Router) {}

  protected navigateToForm(): void {
    this.router.navigate(['/add-restaurant']);
  }
}
