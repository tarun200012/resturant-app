import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeParseReturnType, z } from 'zod';
import { Router, ActivatedRoute } from '@angular/router';

// Mock data interface
interface RestaurantData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  address: string;
  description: string;
}

@Component({
  selector: 'app-resturant-form',
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './resturant-form.html',
  styleUrl: './resturant-form.css'
})
export class ResturantForm implements OnInit {
  protected isEditMode = false;
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

  // Mock data for all restaurants
  private mockRestaurants: RestaurantData[] = [
    {
      id: 1,
      name: "Pizza Palace",
      description: "Authentic Italian pizza with fresh ingredients",
      mobile: "+1-555-0123",
      email: "info@pizzapalace.com",
      city: "New York",
      state: "NY",
      country: "USA",
      address: "123 Broadway St, Manhattan"
    },
    {
      id: 2,
      name: "Sushi Express",
      description: "Fresh sushi and Japanese cuisine",
      mobile: "+1-555-0456",
      email: "contact@sushiexpress.com",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      address: "456 Sunset Blvd, Hollywood"
    },
    {
      id: 3,
      name: "Burger House",
      description: "Gourmet burgers and comfort food",
      mobile: "+1-555-0789",
      email: "hello@burgerhouse.com",
      city: "Chicago",
      state: "IL",
      country: "USA",
      address: "789 Michigan Ave, Downtown"
    },
    {
      id: 4,
      name: "Taco Fiesta",
      description: "Authentic Mexican street food",
      mobile: "+1-555-0321",
      email: "orders@tacofiesta.com",
      city: "Miami",
      state: "FL",
      country: "USA",
      address: "321 Ocean Dr, South Beach"
    },
    {
      id: 5,
      name: "Pasta Corner",
      description: "Traditional Italian pasta dishes",
      mobile: "+1-555-0654",
      email: "reservations@pastacorner.com",
      city: "Boston",
      state: "MA",
      country: "USA",
      address: "654 Beacon St, Back Bay"
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode by looking for an ID parameter
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.restaurantId = +id;
        this.loadRestaurantData(this.restaurantId);
      } else {
        this.isEditMode = false;
        this.restaurantId = null;
      }
    });
  }

  // Load restaurant data for editing
  private loadRestaurantData(id: number): void {
    const restaurant = this.mockRestaurants.find(r => r.id === id);
    if (restaurant) {
      this.nameInput = restaurant.name;
      this.emailInput = restaurant.email;
      this.mobileInput = restaurant.mobile;
      this.cityInput = restaurant.city;
      this.stateInput = restaurant.state;
      this.countryInput = restaurant.country;
      this.addressInput = restaurant.address;
      this.descriptionInput = restaurant.description;
      console.log('Loaded restaurant data for editing:', restaurant);
    } else {
      console.error('Restaurant not found with ID:', id);
      this.errorMessage = 'Restaurant not found';
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
  protected addRestaurant(): void {
    this.clearMessages();
    const {success, data, error} = this.validateForm();
    if (success) {
      if (this.isEditMode && this.restaurantId) {
        console.log('Updating restaurant with ID:', this.restaurantId, 'Data:', data);
        this.successMessage = "Restaurant updated successfully!";
      } else {
        console.log('Adding new restaurant:', data);
        this.successMessage = "Restaurant added successfully!";
      }
      this.clearForm();
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
