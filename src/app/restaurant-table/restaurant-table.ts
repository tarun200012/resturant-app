import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

export class RestaurantTable implements OnInit {
  // Delete confirmation modal properties
  protected deleteDialogVisible = false;
  protected restaurantToDelete: RowData | null = null;

  // Table data
  protected rowData: RowData[] = [];
  protected loading = true;
  protected errorMessage = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  // Load restaurants from localStorage API
  private async loadRestaurants(): Promise<void> {
    try {
      this.loading = true;
      this.errorMessage = "";
      const restaurants = await getAllRestaurants();
      this.rowData = restaurants;
      console.log('Restaurants loaded successfully:', restaurants);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      this.errorMessage = 'Failed to load restaurants. Please try again.';
    } finally {
      this.loading = false;
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

  // Cancel delete operation
  protected cancelDelete(): void {
    this.deleteDialogVisible = false;
    this.restaurantToDelete = null;
  }

  // Confirm delete operation
  protected async confirmDelete(): Promise<void> {
    if (this.restaurantToDelete) {
      try {
        console.log('Deleting restaurant with ID:', this.restaurantToDelete.id);
        
        // Delete from localStorage API
        await deleteRestaurant(this.restaurantToDelete.id);
        
        // Remove from local array
        this.rowData = this.rowData.filter(restaurant => restaurant.id !== this.restaurantToDelete!.id);
        
        // Close the modal and reset
        this.deleteDialogVisible = false;
        this.restaurantToDelete = null;
        
        console.log('Restaurant deleted successfully');
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        this.errorMessage = 'Failed to delete restaurant. Please try again.';
      }
    }
  }

  // Refresh restaurants data
  protected async refreshData(): Promise<void> {
    await this.loadRestaurants();
  }
}
