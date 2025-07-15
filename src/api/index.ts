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
  const rawData = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: restaurantData.name,
      email: restaurantData.email,
      mobile: restaurantData.mobile,
      location: {
        city: restaurantData.city,
        state: restaurantData.state,
        country: restaurantData.country,
        address: restaurantData.address,
      },
      description: restaurantData.description
    })
  })
  const data = await rawData.json();
  return data;
}

/**
 * Get a single restaurant by ID
 * @param id - Restaurant ID
 * @returns Promise<Restaurant | null> - Restaurant data or null if not found
 */
export async function getRestaurantById(id: number) {
  const rawData = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { location, ...rest } = await rawData.json();

  return { ...location, ...rest };

}

/**
 * Update an existing restaurant
 * @param id - Restaurant ID
 * @param restaurantData - Updated restaurant data
 * @returns Promise<Restaurant> - The updated restaurant
 */
export async function updateRestaurant(id: number, restaurantData: CreateRestaurantData) {

   const rawData = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: restaurantData.name,
      email: restaurantData.email,
      mobile: restaurantData.mobile,
      location: {
        city: restaurantData.city,
        state: restaurantData.state,
        country: restaurantData.country,
        address: restaurantData.address,
      },
      description: restaurantData.description
    })
  })
  const data = await rawData.json();
  return data;
}

/**
 * Delete a restaurant by ID
 * @param id - Restaurant ID
 * @returns Promise<boolean> - True if deleted successfully
 */
export async function deleteRestaurant(id: number) {
  const rawData = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

}

