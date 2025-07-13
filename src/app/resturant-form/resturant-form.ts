import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
 
@Component({
  selector: 'app-resturant-form',
  imports: [ButtonModule],
  templateUrl: './resturant-form.html',
  styleUrl: './resturant-form.css'
})
export class ResturantForm {
  protected nameInput = "";
  protected emailInput = "";
  protected mobileInput = "";
  protected cityInput = "";
  protected stateInput = "";
  protected countryInput = "";
  protected addressInput = "";
  protected descriptionInput = "";

  protected successMessage = "";
  protected errorMessage = "";
  

}
