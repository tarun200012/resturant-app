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
  protected loading = true;
  protected errorMessage = "";

  // Route subscription
  private routeSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadRestaurants();
    
    // Subscribe to route changes to refresh data when returning to home page
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // If we're navigating to the home page (root path), refresh the data
        if (event.url === '/' || event.url === '') {
          this.loadRestaurants();
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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
    this.deleting = false;
  }

  // Confirm delete operation
  protected async confirmDelete(): Promise<void> {
    if (this.restaurantToDelete) {
      try {
        this.deleting = true;
        console.log('Deleting restaurant with ID:', this.restaurantToDelete.id);
        
        // Delete from localStorage API
        await deleteRestaurant(this.restaurantToDelete.id);
        
        // Refresh the entire data to ensure consistency
        await this.loadRestaurants();
        
        // Close the modal and reset
        this.deleteDialogVisible = false;
        this.restaurantToDelete = null;
        
        console.log('Restaurant deleted successfully');
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        this.errorMessage = 'Failed to delete restaurant. Please try again.';
      } finally {
        this.deleting = false;
      }
    }
  }

  // Refresh restaurants data
  protected async refreshData(): Promise<void> {
    await this.loadRestaurants();
  }

  // Method to be called when returning from edit/add pages
  protected async onPageActivate(): Promise<void> {
    // Refresh data when component becomes active (e.g., returning from edit page)
    await this.loadRestaurants();
  }
}
