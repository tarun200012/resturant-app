import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class RestaurantTable implements OnInit, OnDestroy {
  // Delete confirmation modal properties
  protected deleteDialogVisible = false;
  protected restaurantToDelete: RowData | null = null;
  protected deleting = false;

  // Table data
  protected rowData: RowData[] = [];
  protected errorMessage = "";

  // Route subscription
  private routeSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    // Subscribe to route changes to refresh data when returning to home page
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        
      });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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
      deleteRestaurant(this.restaurantToDelete.id);
      this.deleting = true;
      this.deleteDialogVisible = false;
      this.restaurantToDelete = null;
    }
  }

}
