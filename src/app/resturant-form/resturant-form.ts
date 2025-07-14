import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-resturant-form',
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './resturant-form.html',
  styleUrl: './resturant-form.css'
})
export class ResturantForm {
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

  // Form validation method
  protected validateForm(): boolean {
    this.validationErrors = [];
    
    // Required field validations
    if (!this.nameInput.trim()) {
      this.validationErrors.push("Restaurant name is required");
    }
    
    if (!this.emailInput.trim()) {
      this.validationErrors.push("Email is required");
    } else if (!this.isValidEmail(this.emailInput)) {
      this.validationErrors.push("Please enter a valid email address");
    }
    
    if (!this.mobileInput.trim()) {
      this.validationErrors.push("Mobile number is required");
    } else if (!this.isValidMobile(this.mobileInput)) {
      this.validationErrors.push("Please enter a valid mobile number");
    }
    
    if (!this.cityInput.trim()) {
      this.validationErrors.push("City is required");
    }
    
    if (!this.stateInput.trim()) {
      this.validationErrors.push("State is required");
    }
    
    if (!this.countryInput.trim()) {
      this.validationErrors.push("Country is required");
    }
    
    if (!this.addressInput.trim()) {
      this.validationErrors.push("Address is required");
    }
    
    return this.validationErrors.length === 0;
  }

  // Email validation helper
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Mobile validation helper
  private isValidMobile(mobile: string): boolean {
    const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return mobileRegex.test(mobile.replace(/\s/g, ''));
  }

  // Add restaurant method
  protected addRestaurant(): void {
    this.clearMessages();
    
    if (this.validateForm()) {
      // Create restaurant object
      const restaurant = {
        name: this.nameInput.trim(),
        email: this.emailInput.trim(),
        mobile: this.mobileInput.trim(),
        city: this.cityInput.trim(),
        state: this.stateInput.trim(),
        country: this.countryInput.trim(),
        address: this.addressInput.trim(),
        description: this.descriptionInput.trim()
      };
      
      // Here you would typically send the data to a service
      console.log('Restaurant data:', restaurant);
      
      // Show success message
      this.successMessage = "Restaurant added successfully!";
      
      // Clear form after successful submission
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
    this.validationErrors = [];
  }
}
