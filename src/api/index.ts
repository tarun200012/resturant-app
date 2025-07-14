// Restaurant data interface
export interface Restaurant {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Restaurant data without auto-generated fields (for input)
export interface CreateRestaurantData {
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  address: string;
  description?: string;
}

// LocalStorage key for restaurants
const RESTAURANTS_STORAGE_KEY = 'restaurants';

/**
 * Get all restaurants from localStorage
 * @returns Promise<Restaurant[]> - Array of all restaurants
 */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  try {
    const restaurantsJson = localStorage.getItem(RESTAURANTS_STORAGE_KEY);
    
    if (!restaurantsJson) {
      // Initialize with sample data if no data exists
      const sampleRestaurants: Restaurant[] = [
        {
          id: 1,
          name: "Pizza Palace",
          description: "Authentic Italian pizza with fresh ingredients",
          mobile: "+1-555-0123",
          email: "info@pizzapalace.com",
          city: "New York",
          state: "NY",
          country: "USA",
          address: "123 Broadway St, Manhattan",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
          address: "456 Sunset Blvd, Hollywood",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
          address: "789 Michigan Ave, Downtown",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
          address: "321 Ocean Dr, South Beach",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
          address: "654 Beacon St, Back Bay",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(sampleRestaurants));
      return sampleRestaurants;
    }
    
    const restaurants: Restaurant[] = JSON.parse(restaurantsJson);
    return restaurants;
  } catch (error) {
    console.error('Error getting restaurants from localStorage:', error);
    throw new Error('Failed to retrieve restaurants from database');
  }
}

/**
 * Insert a new restaurant into localStorage
 * @param restaurantData - Restaurant data without ID and timestamps
 * @returns Promise<Restaurant> - The created restaurant with generated fields
 */
export async function insertRestaurant(restaurantData: CreateRestaurantData): Promise<Restaurant> {
  try {
    // Get existing restaurants
    const existingRestaurants = await getAllRestaurants();
    
    // Generate new ID (max ID + 1)
    const maxId = Math.max(...existingRestaurants.map(r => r.id), 0);
    const newId = maxId + 1;
    
    // Create new restaurant with generated fields
    const newRestaurant: Restaurant = {
      id: newId,
      ...restaurantData,
      description: restaurantData.description || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to existing restaurants
    const updatedRestaurants = [...existingRestaurants, newRestaurant];
    
    // Save back to localStorage
    localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(updatedRestaurants));
    
    console.log('Restaurant inserted successfully:', newRestaurant);
    return newRestaurant;
  } catch (error) {
    console.error('Error inserting restaurant:', error);
    throw new Error('Failed to insert restaurant into database');
  }
}

/**
 * Get a single restaurant by ID
 * @param id - Restaurant ID
 * @returns Promise<Restaurant | null> - Restaurant data or null if not found
 */
export async function getRestaurantById(id: number): Promise<Restaurant | null> {
  try {
    const restaurants = await getAllRestaurants();
    const restaurant = restaurants.find(r => r.id === id);
    return restaurant || null;
  } catch (error) {
    console.error('Error getting restaurant by ID:', error);
    throw new Error('Failed to retrieve restaurant from database');
  }
}

/**
 * Update an existing restaurant
 * @param id - Restaurant ID
 * @param restaurantData - Updated restaurant data
 * @returns Promise<Restaurant> - The updated restaurant
 */
export async function updateRestaurant(id: number, restaurantData: CreateRestaurantData): Promise<Restaurant> {
  try {
    const restaurants = await getAllRestaurants();
    const restaurantIndex = restaurants.findIndex(r => r.id === id);
    
    if (restaurantIndex === -1) {
      throw new Error(`Restaurant with ID ${id} not found`);
    }
    
    // Update restaurant data
    const updatedRestaurant: Restaurant = {
      ...restaurants[restaurantIndex],
      ...restaurantData,
      description: restaurantData.description || "",
      updatedAt: new Date().toISOString()
    };
    
    // Update in array
    restaurants[restaurantIndex] = updatedRestaurant;
    
    // Save back to localStorage
    localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(restaurants));
    
    console.log('Restaurant updated successfully:', updatedRestaurant);
    return updatedRestaurant;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw new Error('Failed to update restaurant in database');
  }
}

/**
 * Delete a restaurant by ID
 * @param id - Restaurant ID
 * @returns Promise<boolean> - True if deleted successfully
 */
export async function deleteRestaurant(id: number): Promise<boolean> {
  try {
    const restaurants = await getAllRestaurants();
    const filteredRestaurants = restaurants.filter(r => r.id !== id);
    
    if (filteredRestaurants.length === restaurants.length) {
      throw new Error(`Restaurant with ID ${id} not found`);
    }
    
    // Save back to localStorage
    localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(filteredRestaurants));
    
    console.log('Restaurant deleted successfully:', id);
    return true;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw new Error('Failed to delete restaurant from database');
  }
}

/**
 * Clear all restaurants from localStorage
 * @returns Promise<void>
 */
export async function clearAllRestaurants(): Promise<void> {
  try {
    localStorage.removeItem(RESTAURANTS_STORAGE_KEY);
    console.log('All restaurants cleared from localStorage');
  } catch (error) {
    console.error('Error clearing restaurants:', error);
    throw new Error('Failed to clear restaurants from database');
  }
}
