import { Injectable } from '@angular/core';
import { Restaurant } from '../../api/index';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDataService {
  private restaurantData: Restaurant | null = null;

  setRestaurantData(restaurant: Restaurant): void {
    this.restaurantData = restaurant;
  }

  getRestaurantData(): Restaurant | null {
    return this.restaurantData;
  }

  clearRestaurantData(): void {
    this.restaurantData = null;
  }
} 