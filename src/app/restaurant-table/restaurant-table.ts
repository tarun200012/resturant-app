import { Component, ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getAllRestaurants, deleteRestaurant, Restaurant } from '../../api/index';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { RestaurantDataService } from '../services/restaurant-data.service';


@Component({
  selector: 'app-restaurant-table',
  imports: [TableModule, IconFieldModule, ButtonModule, DialogModule, CommonModule, FormsModule, InputNumberModule],
  templateUrl: './restaurant-table.html',
  styleUrl: './restaurant-table.css'
})

export class RestaurantTable {
  // Delete confirmation modal properties
  protected deleteDialogVisible = false;
  protected restaurantToDelete: Restaurant | null = null;
  protected deleting = false;
  protected value1: number = 10;

  // Table data
  protected rowData: Restaurant[] = [];

  constructor(
    private router: Router, 
    private cd: ChangeDetectorRef,
    private restaurantDataService: RestaurantDataService
  ) {

  }

  ngOnInit() {
    getAllRestaurants()
      .then((res) => {
        this.rowData = res.map(({ location, ...rest }: any) => ({
          ...rest,
          ...location
        }));
        this.cd.detectChanges(); // trigger view update manually
      })
      .catch(console.log);
  }

  // Navigate to edit restaurant page
  protected editRestaurant(restaurant: Restaurant): void {
    // Store the restaurant data in the service
    this.restaurantDataService.setRestaurantData(restaurant);
    this.router.navigate(['/edit-restaurant', restaurant.id]);
  }

  // Open delete confirmation modal
  protected openDeleteDialog(restaurant: Restaurant): void {
    this.restaurantToDelete = restaurant;
    this.deleteDialogVisible = true;
  }

  protected cancelDelete(): void {
    this.deleteDialogVisible = false;
    this.restaurantToDelete = null;
    this.deleting = false;
  }

  protected confirmDelete(): void {
    if (this.restaurantToDelete) {
      this.deleting = true;
      deleteRestaurant(this.restaurantToDelete.id).then(() => {
        this.deleting = false;
        this.deleteDialogVisible = false;
        this.restaurantToDelete = null;
      }).finally(() => {
        getAllRestaurants()
          .then((res) => {
            this.rowData = res.map(({ location, ...rest }: any) => ({
              ...rest,
              ...location
            }));
            this.cd.detectChanges(); // trigger view update manually
          })
          .catch(console.log);

      });

    }
  }

}
