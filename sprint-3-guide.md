# Sprint 3: Feature Screens and Advanced Routing

This guide covers the implementation of more complex screens and advanced routing patterns in Sprint 3.

## Task 11: Migrate Restaurant Detail Screens

### 11.1 Create Dynamic Restaurant Route

Create `app/restaurant/[id].tsx`:

```tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '@env';

// Import your components
import { RestaurantHeader, MenuList, ReviewSection } from '@/components';

interface Restaurant {
  _id: string;
  name: string;
  // Add other restaurant properties
}

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Restaurant details content */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

### 11.2 Create Food Detail Screen

Create `app/food/[id].tsx` for food details.

### 11.3 Create Menu Layout

Create `app/restaurant/[id]/_layout.tsx` for nested restaurant navigation.

## Task 12: Migrate Booking and Order Screens

### 12.1 Create Booking Route

Create `app/booking/[restaurantId].tsx` for the booking screen.

### 12.2 Create Order Confirmation Screen

Create `app/order/confirmation.tsx` for order confirmation.

### 12.3 Create Order History Screen

Create `app/order/history.tsx` for order history.

## Task 13: Implement Modal Routes

### 13.1 Create Filter Modal

Create `app/(modals)/filter.tsx`:

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components';

export default function FilterModal() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    // Filter state
  });

  const handleApplyFilters = () => {
    router.back();
    // Apply filters logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter</Text>
      
      {/* Filter options */}
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Apply" 
          onPress={handleApplyFilters} 
        />
        <Button 
          title="Cancel" 
          onPress={() => router.back()} 
          backgroundColor="#ccc"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
```

### 13.2 Create City Selection Modal

Create `app/(modals)/city-selection.tsx` for city selection.

### 13.3 Create Modal Layout

Create `app/(modals)/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTintColor: '#fff',
      }}
    />
  );
}
```

## Task 14: Setup Authentication Flow with Expo Router

### 14.1 Create Auth Context with TypeScript

Create `context/AuthContext.tsx`:

```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { API_URL } from '@env';

interface User {
  _id: string;
  name: string;
  email: string;
  // Add other user properties
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from storage
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      
      if (storedToken) {
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // Fetch user data
        const response = await axios.get(`${API_URL}/user/profile`);
        setUser(response.data);
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Failed to load user', error);
      await AsyncStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      return user;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setToken(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      return user;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### 14.2 Implement Protected Routes

Create a middleware file in `app/_layout.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Define which routes require authentication
const protectedRoutes = ['(tabs)', 'restaurant', 'booking', 'order'];

// Create a component to handle route protection
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!isLoading) {
      // Check if the route requires authentication
      const isProtected = protectedRoutes.some(route => 
        segments[0] === route
      );

      if (isProtected && !isAuthenticated) {
        // Redirect to login if trying to access protected route while not authenticated
        router.replace('/login');
      } else if (!isProtected && isAuthenticated && segments[0] === '(auth)') {
        // Redirect to home if already authenticated but trying to access auth routes
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isLoading, segments]);

  return <Slot />;
}

// Root layout with all providers
export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    
    hideSplash();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <PaperProvider>
            <ProtectedRoute />
          </PaperProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

## Task 15: Admin Routes and Features

### 15.1 Create Admin Route Group

Create `app/(admin)/_layout.tsx` for admin routes.

### 15.2 Create Admin Dashboard

Create `app/(admin)/index.tsx` for the admin dashboard.

### 15.3 Create Admin Restaurant Management

Create `app/(admin)/restaurants/index.tsx` for restaurant management.

### 15.4 Create Admin Order Management

Create `app/(admin)/orders/index.tsx` for order management.

## Next Steps

After completing Sprint 3, the project will have:
1. Feature-rich screens with dynamic routing
2. Modal screens for various interactions
3. A robust authentication system with protected routes
4. Admin routes and features

The next sprint will focus on finalizing the migration, implementing deep linking, error handling, and performance optimization. 
