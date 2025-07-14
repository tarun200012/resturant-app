import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeParseReturnType, z } from 'zod';
 
@Component({
  selector: 'app-resturant-form',
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './resturant-form.html',
  styleUrl: './resturant-form.css'
})
export class ResturantForm {
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
  protected validationErrors: string[] = [];
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

    const result =this.restaurantSchema.safeParse(formData);
    return result;
  }

  // Add restaurant method
  protected addRestaurant(): void {
    this.clearMessages();
    const {success, data, error} = this.validateForm();
    if (success) {
      console.log(data)
      this.successMessage = "Restaurant added successfully.";
    } else {
      this.validationErrors = error.errors.map(err => err.message);
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
    this.validationErrors = [];
  }
}
