import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

interface Restaurant {
  id: number;
  name: string;
  description?: string; // optional
  mobile: string;
  email: string;
}

interface Location {
  id: number;
  city: string;
  state: string;
  country: string;
  address: string;
}


interface RowData extends Restaurant, Location {
  // TODO: add edit and delete handlers
}

@Component({
  selector: 'app-restaurant-table',
  imports: [TableModule, IconFieldModule],
  templateUrl: './restaurant-table.html',
  styleUrl: './restaurant-table.css'
})

export class RestaurantTable {
  protected rowData: RowData[] = [
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
}
