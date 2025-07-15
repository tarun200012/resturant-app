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
const BASE_URL = "http://localhost:5112/api/RestaurantWithLocation"
/**
 * Get all restaurants from localStorage
 * @returns Promise<Restaurant[]> - Array of all restaurants
 */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  const rawData = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await rawData.json();
  return data;
}

/**
 * Insert a new restaurant into localStorage
 * @param restaurantData - Restaurant data without ID and timestamps
 * @returns Promise<Restaurant> - The created restaurant with generated fields
 */
export async function insertRestaurant(restaurantData: CreateRestaurantData) {
  // try {
  //   // Get existing restaurants
  //   const existingRestaurants = await getAllRestaurants();
    
  //   // Generate new ID (max ID + 1)
  //   const maxId = Math.max(...existingRestaurants.map(r => r.id), 0);
  //   const newId = maxId + 1;
    
  //   // Create new restaurant with generated fields
  //   const newRestaurant: Restaurant = {
  //     id: newId,
  //     ...restaurantData,
  //     description: restaurantData.description || "",
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString()
  //   };
    
  //   // Add to existing restaurants
  //   const updatedRestaurants = [...existingRestaurants, newRestaurant];
    
  //   // Save back to localStorage
  //   localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(updatedRestaurants));
    
  //   console.log('Restaurant inserted successfully:', newRestaurant);
  //   return newRestaurant;
  // } catch (error) {
  //   console.error('Error inserting restaurant:', error);
  //   throw new Error('Failed to insert restaurant into database');
  // }
}

/**
 * Get a single restaurant by ID
 * @param id - Restaurant ID
 * @returns Promise<Restaurant | null> - Restaurant data or null if not found
 */
export async function getRestaurantById(id: number) {
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
export async function updateRestaurant(id: number, restaurantData: CreateRestaurantData) {
  // try {
  //   const restaurants = await getAllRestaurants();
  //   const restaurantIndex = restaurants.findIndex(r => r.id === id);
    
  //   if (restaurantIndex === -1) {
  //     throw new Error(`Restaurant with ID ${id} not found`);
  //   }
    
  //   // Update restaurant data
  //   const updatedRestaurant: Restaurant = {
  //     ...restaurants[restaurantIndex],
  //     ...restaurantData,
  //     description: restaurantData.description || "",
  //     updatedAt: new Date().toISOString()
  //   };
    
  //   // Update in array
  //   restaurants[restaurantIndex] = updatedRestaurant;
    
  //   // Save back to localStorage
  //   localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(restaurants));
    
  //   console.log('Restaurant updated successfully:', updatedRestaurant);
  //   return updatedRestaurant;
  // } catch (error) {
  //   console.error('Error updating restaurant:', error);
  //   throw new Error('Failed to update restaurant in database');
  // }
}

/**
 * Delete a restaurant by ID
 * @param id - Restaurant ID
 * @returns Promise<boolean> - True if deleted successfully
 */
export async function deleteRestaurant(id: number) {
  // try {
  //   const restaurants = await getAllRestaurants();
  //   const filteredRestaurants = restaurants.filter(r => r.id !== id);
    
  //   if (filteredRestaurants.length === restaurants.length) {
  //     throw new Error(`Restaurant with ID ${id} not found`);
  //   }
    
  //   // Save back to localStorage
  //   localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(filteredRestaurants));
    
  //   console.log('Restaurant deleted successfully:', id);
  //   return true;
  // } catch (error) {
  //   console.error('Error deleting restaurant:', error);
  //   throw new Error('Failed to delete restaurant from database');
  // }
}

/**
 * Clear all restaurants from localStorage
 * @returns Promise<void>
 */
export async function clearAllRestaurants() {
  // try {
  //   localStorage.removeItem(RESTAURANTS_STORAGE_KEY);
  //   console.log('All restaurants cleared from localStorage');
  // } catch (error) {
  //   console.error('Error clearing restaurants:', error);
  //   throw new Error('Failed to clear restaurants from database');
  // }
}
