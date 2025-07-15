import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { getAllRestaurants, deleteRestaurant, Restaurant } from '../../api/index';

interface RowData extends Restaurant {
  // TODO: add edit and delete handlers
}

@Component({
  selector: 'app-restaurant-table',
  imports: [TableModule, IconFieldModule, ButtonModule, DialogModule, CommonModule],
  templateUrl: './restaurant-table.html',
  styleUrl: './restaurant-table.css'
})

export class RestaurantTable {
  // Delete confirmation modal properties
  protected deleteDialogVisible = false;
  protected restaurantToDelete: RowData | null = null;
  protected deleting = false;

  // Table data
  protected rowData: RowData[] = [];
  protected errorMessage = "";  

  constructor(private router: Router, private cd: ChangeDetectorRef) { }


  ngAfterViewInit(){
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
  protected editRestaurant(restaurant: RowData): void {
    this.router.navigate(['/edit-restaurant', restaurant.id]);
  }

  // Open delete confirmation modal
  protected openDeleteDialog(restaurant: RowData): void {
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
