// Common types for the application

// Navigation types
export type RootStackParamList = {
  index: undefined;
  login: undefined;
  register: undefined;
  onboarding: undefined;
  // Add other screen names here
};

// User related types
export interface UserData {
  id: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

// Restaurant related types (example, to be expanded)
export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address?: string;
  rating?: number;
  // Add other restaurant properties as needed
}

// Booking related types (example, to be expanded)
export interface Booking {
  id: string;
  userId: string;
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  // Add other booking properties as needed
} 
