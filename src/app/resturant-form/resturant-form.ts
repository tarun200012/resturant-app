import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeParseReturnType, z } from 'zod';
import { Router, ActivatedRoute } from '@angular/router';
import { insertRestaurant, updateRestaurant, getRestaurantById, CreateRestaurantData } from '../../api/index';
import { RestaurantDataService } from '../services/restaurant-data.service';

@Component({
  selector: 'app-resturant-form',
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './resturant-form.html',
  styleUrl: './resturant-form.css'
})
export class ResturantForm implements OnInit {
  protected restaurantId: number | null = null;

  // Zod validation schema
  private restaurantSchema = z.object({
    name: z.string().min(1, "Restaurant name is required").trim(),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    mobile: z.string()
      .min(1, "Mobile number is required")
      .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid mobile number")
      .transform(val => val.replace(/\s/g, '')),
    city: z.string().min(1, "City is required").trim(),
    state: z.string().min(1, "State is required").trim(),
    country: z.string().min(1, "Country is required").trim(),
    address: z.string().min(1, "Address is required").trim(),
    description: z.string().optional().default("")
  });

  // Form data properties
  protected nameInput = "";
  protected emailInput = "";
  protected mobileInput = "";
  protected cityInput = "";
  protected stateInput = "";
  protected countryInput = "";
  protected addressInput = "";
  protected descriptionInput = "";

  // Messages
  protected successMessage = "";
  protected errorMessage = "";
  
  // Field-specific error messages
  protected fieldErrors: { [key: string]: string } = {};

  // Loading states
  protected loading = false;
  protected loadingData = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private restaurantDataService: RestaurantDataService
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode by looking for an ID parameter
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.restaurantId = +id;
      } else {
        this.restaurantId = null;
      }
    });
  }

  ngAfterViewInit() {
    if (this.restaurantId) {
      // Try to get data from service first (for edit mode)
      const restaurantData = this.restaurantDataService.getRestaurantData();
      
      if (restaurantData) {
        // Use data from service (no API call needed)
        this.nameInput = restaurantData.name;
        this.emailInput = restaurantData.email;
        this.mobileInput = restaurantData.mobile;
        this.cityInput = restaurantData.city;
        this.stateInput = restaurantData.state;
        this.countryInput = restaurantData.country;
        this.addressInput = restaurantData.address;
        this.descriptionInput = restaurantData.description;
        
        // Clear the service data after using it
        this.restaurantDataService.clearRestaurantData();
      }
    }
  }

  // Form validation method using Zod
  protected validateForm(): SafeParseReturnType<z.infer<typeof this.restaurantSchema>, z.infer<typeof this.restaurantSchema>> {
    const formData = {
      name: this.nameInput,
      email: this.emailInput,
      mobile: this.mobileInput,
      city: this.cityInput,
      state: this.stateInput,
      country: this.countryInput,
      address: this.addressInput,
      description: this.descriptionInput
    };

    const result = this.restaurantSchema.safeParse(formData);
    
    // Clear previous field errors
    this.fieldErrors = {};
    
    // If validation failed, map errors to specific fields
    if (!result.success) {
      result.error.errors.forEach(error => {
        const fieldName = error.path[0] as string;
        this.fieldErrors[fieldName] = error.message;
      });
    }
    
    return result;
  }

  // Get error message for a specific field
  protected getFieldError(fieldName: string): string {
    return this.fieldErrors[fieldName] || "";
  }

  // Check if a field has an error
  protected hasFieldError(fieldName: string): boolean {
    return !!this.fieldErrors[fieldName];
  }

  // Add or update restaurant method
  protected async addRestaurant(): Promise<void> {
    this.clearMessages();
    const {success, data} = this.validateForm();
    
    if (success) {
      try {
        this.loading = true;
        
        if (this.restaurantId) {
          // Update existing restaurant
          const updateData: CreateRestaurantData = {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            city: data.city,
            state: data.state,
            country: data.country,
            address: data.address,
            description: data.description
          };
          
          const updatedRestaurant = await updateRestaurant(this.restaurantId, updateData);
          console.log('Restaurant updated successfully:', updatedRestaurant);
          this.successMessage = "Restaurant updated successfully!";
          
          // Navigate back to table after a short delay
          setTimeout(() => {
            this.goBack();
          }, 1500);
        } else {
          // Insert new restaurant
          const insertData: CreateRestaurantData = {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            city: data.city,
            state: data.state,
            country: data.country,
            address: data.address,
            description: data.description
          };
          
          const newRestaurant = await insertRestaurant(insertData);
          console.log('Restaurant added successfully:', newRestaurant);
          this.successMessage = "Restaurant added successfully!";
          
          // Navigate back to table after a short delay
          setTimeout(() => {
            this.goBack();
          }, 1500);
        }
        
        // Clear form after successful operation
        this.clearForm();
        
      } catch (error) {
        console.error('Error saving restaurant:', error);
      } finally {
        this.loading = false;
      }
    } else {
      this.errorMessage = "Please fix the validation errors below.";
    }
  }

  // Clear form method
  protected clearForm(): void {
    this.nameInput = "";
    this.emailInput = "";
    this.mobileInput = "";
    this.cityInput = "";
    this.stateInput = "";
    this.countryInput = "";
    this.addressInput = "";
    this.descriptionInput = "";
    this.clearMessages();
  }

  // Clear messages method
  private clearMessages(): void {
    this.successMessage = "";
    this.errorMessage = "";
    this.fieldErrors = {};
  }

  // Navigate back to main page
  protected goBack(): void {
    this.router.navigate(['/']);
  }
}
