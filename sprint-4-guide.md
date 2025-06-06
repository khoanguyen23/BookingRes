# Sprint 4: Finalization and Optimization

This guide covers the final steps to complete the migration to Expo Router with TypeScript and optimize the application.

## Task 16: Complete Remaining Screen Migrations

### 16.1 Migrate Any Remaining Screens

Complete the migration of any remaining screens to TypeScript and Expo Router. Ensure all screens are properly converted and integrated into the file-based routing system.

### 16.2 Review Navigation Patterns

Ensure all navigation paths are consistent and follow the established patterns. Check for any screens that may have been missed or navigation flows that need adjustment.

### 16.3 Create a Screen Migration Checklist

Create a checklist to verify all screens have been migrated:

```markdown
# Screen Migration Checklist

## Core Screens
- [ ] Onboarding
- [ ] Login
- [ ] Register
- [ ] Home
- [ ] Search
- [ ] Map
- [ ] Account

## Feature Screens
- [ ] Restaurant Detail
- [ ] Food Detail
- [ ] Booking
- [ ] Order
- [ ] Order Success
- [ ] Order History
- [ ] Favorites

## Admin Screens
- [ ] Admin Dashboard
- [ ] Restaurant Management
- [ ] Order Management
- [ ] User Management

## Modal Screens
- [ ] Filter
- [ ] City Selection
- [ ] Notifications
```

## Task 17: Deep Linking and URL Configuration

### 17.1 Configure Deep Linking Scheme

Update `app.json` to configure the deep linking scheme:

```json
{
  "expo": {
    "scheme": "bookingres",
    "web": {
      "bundler": "metro"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

### 17.2 Create Universal Links Configuration

For iOS, create an `apple-app-site-association` file in the `assets` directory:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOUR_TEAM_ID.com.yourcompany.bookingres",
        "paths": ["*"]
      }
    ]
  }
}
```

### 17.3 Test Deep Linking

Create a test script to verify deep linking works as expected:

```typescript
// utils/testDeepLinks.ts

import * as Linking from 'expo-linking';

export const testDeepLinks = async () => {
  try {
    // Test deep links to different parts of the app
    console.log('Testing deep links...');
    
    // Test deep link to restaurant detail
    await Linking.openURL('bookingres://restaurant/123');
    
    // Test deep link to booking
    await Linking.openURL('bookingres://booking/123');
    
    // Test deep link to order history
    await Linking.openURL('bookingres://order/history');
    
    console.log('Deep linking tests completed successfully');
  } catch (error) {
    console.error('Deep linking test failed', error);
  }
};
```

## Task 18: Error Handling and Fallbacks

### 18.1 Create Error Boundary Component

Create a reusable error boundary component:

```tsx
// components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // Log error to monitoring service
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.resetError}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ErrorBoundary;
```

### 18.2 Create Not Found Route

Create a 404 route in `app/[...unmatched].tsx`:

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Page Not Found</Text>
      <Text style={styles.message}>
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
```

### 18.3 Implement Global Error Handling

Add global error handling in the root layout:

```tsx
// In app/_layout.tsx

import { useEffect } from 'react';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ErrorBoundary } from '@/components';

// Handle global errors
const handleError = (error: Error, isFatal: boolean) => {
  console.error('Global error:', error);
  // Log to monitoring service
};

export default function RootLayout() {
  useEffect(() => {
    // Set up global error handler
    ErrorUtils.setGlobalHandler(handleError);
    
    // Ignore specific warnings
    LogBox.ignoreLogs([
      'Reanimated 2',
      'Non-serializable values',
    ]);
    
    return () => {
      // Restore default handler
      ErrorUtils.setGlobalHandler((error: Error, isFatal: boolean) => {
        console.error(error);
      });
    };
  }, []);

  // Rest of root layout code...
  
  return (
    <ErrorBoundary>
      {/* Existing content */}
    </ErrorBoundary>
  );
}
```

## Task 19: Performance Optimization

### 19.1 Add React.memo for Complex Components

Optimize rendering performance with React.memo:

```tsx
// Example for a complex component
import React, { memo } from 'react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
  // Component implementation
};

// Use memo to prevent unnecessary re-renders
export default memo(RestaurantCard, (prevProps, nextProps) => {
  return prevProps.restaurant._id === nextProps.restaurant._id;
});
```

### 19.2 Implement List Virtualization

Optimize list rendering with FlatList or SectionList:

```tsx
// Example: Replace ScrollView with FlatList
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RestaurantCard } from '@/components';
import { Restaurant } from '@/types';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onPress: (id: string) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onPress }) => {
  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <RestaurantCard restaurant={item} onPress={onPress} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RestaurantList;
```

### 19.3 Implement Code Splitting

Improve initial load time with dynamic imports:

```tsx
// Example: Lazy load admin components
import React, { lazy, Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';

// Lazy load component
const AdminDashboard = lazy(() => import('./AdminDashboard'));

const AdminScreen: React.FC = () => {
  return (
    <Suspense fallback={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="red" /></View>}>
      <AdminDashboard />
    </Suspense>
  );
};

export default AdminScreen;
```

## Task 20: Documentation and Deployment

### 20.1 Create Final Project Documentation

Create comprehensive documentation for the project:

```markdown
# BookingRes App Documentation

## Architecture Overview

BookingRes is a React Native application built with Expo SDK and TypeScript. It uses Expo Router for file-based navigation and follows a modular component architecture.

## Project Structure

- `/app` - All screens and routes using Expo Router's file-based structure
- `/components` - Reusable UI components
- `/context` - React Context providers for global state
- `/hooks` - Custom React hooks
- `/utils` - Utility functions
- `/types` - TypeScript type definitions
- `/theme` - Theme configuration
- `/constants` - Application constants
- `/assets` - Static assets like images and fonts

## Key Features

- User authentication with JWT
- Restaurant browsing and search
- Booking management
- Order processing
- Admin dashboard
- Offline support
- Deep linking

## Navigation Structure

- `/` - Entry point, redirects to onboarding
- `/onboarding` - Onboarding screen
- `/(auth)/*` - Authentication routes
- `/(tabs)/*` - Main app tabs
- `/restaurant/[id]` - Restaurant detail
- `/food/[id]` - Food detail
- `/booking/[restaurantId]` - Booking screen
- `/order/*` - Order routes
- `/(admin)/*` - Admin routes
- `/(modals)/*` - Modal screens

## State Management

The app uses React Context for global state management:

- `AuthContext` - User authentication state
- `ThemeContext` - Theme configuration
- `UserContext` - User profile data

## API Integration

The app connects to a RESTful API using axios. API endpoints are defined in environment variables.

## Development

### Environment Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

### Building for Production

1. Build for iOS:
   ```
   eas build --platform ios
   ```

2. Build for Android:
   ```
   eas build --platform android
   ```

## Deployment

The app is deployed using EAS (Expo Application Services):

1. Configure `eas.json`
2. Set up environment variables in EAS
3. Run build commands
4. Submit to app stores
```

### 20.2 Update Build Scripts

Update `package.json` with optimized build scripts:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "build:preview": "eas build --profile preview",
    "build:production": "eas build --profile production",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios",
    "update": "eas update",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

### 20.3 Configure EAS for Deployment

Create `eas.json` for EAS configuration:

```json
{
  "cli": {
    "version": ">= 3.7.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-id",
        "appleTeamId": "your-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "./path-to-your-service-account-key.json"
      }
    }
  }
}
```

## Next Steps

After completing Sprint 4, the project will have:

1. All screens migrated to TypeScript and Expo Router
2. Deep linking configured for web and native platforms
3. Robust error handling and fallback mechanisms
4. Performance optimizations
5. Comprehensive documentation
6. Production-ready build and deployment configuration

The application is now ready for production deployment, with a modern, maintainable architecture using TypeScript and Expo Router. 
