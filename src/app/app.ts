import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { RestaurantTable } from './restaurant-table/restaurant-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RestaurantTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resturant-app');

  constructor(private router: Router) {}
}
