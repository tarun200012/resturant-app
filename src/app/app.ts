import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantTable } from './restaurant-table/restaurant-table';
import { ResturantForm } from './resturant-form/resturant-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RestaurantTable, ResturantForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resturant-app');
}
