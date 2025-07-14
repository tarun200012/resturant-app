import { Routes } from '@angular/router';
import { ResturantForm } from './resturant-form/resturant-form';
import { RestaurantTable } from './restaurant-table/restaurant-table';

export const routes: Routes = [
  { path: '', component: RestaurantTable },
  { path: 'add-restaurant', component: ResturantForm },
  { path: '**', redirectTo: '' }
];
