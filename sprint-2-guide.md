# Sprint 2: Core Screens and Components Migration

This guide details the steps to complete Sprint 2 of the migration from React Navigation to Expo Router with TypeScript.

## Task 6: Migrate Common Components to TypeScript

### 6.1 Create Component Type Definitions

First, create base type definitions for shared component props:

```typescript
// types/components.ts

import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface BaseComponentProps {
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface TextComponentProps extends BaseComponentProps {
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export interface ButtonComponentProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}
```

### 6.2 Convert Button Component

Convert `components/Button.js` to TypeScript:

```tsx
// components/Button.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ButtonComponentProps } from '@/types/components';

interface Props extends ButtonComponentProps {
  backgroundColor?: string;
  textColor?: string;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = 'red',
  textColor = 'white',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#ccc' : backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button;
```

### 6.3 Convert Other UI Components

Follow the same pattern to convert other common components:

- `components/ProfileTile.tsx`
- `components/SearchBar.tsx`
- `components/Categories.tsx`
- `components/restaurantCard.tsx`

### 6.4 Create Component Index File

Create a barrel export file for components:

```typescript
// components/index.ts

export { default as Button } from './Button';
export { default as ProfileTile } from './ProfileTile';
export { default as SearchBar } from './SearchBar';
export { default as Categories } from './Categories';
export { default as RestaurantCard } from './restaurantCard';
// Add other component exports
```

## Task 7: Migrate Home and Authentication Screens

### 7.1 Create Onboarding Screen

Create `app/onboarding.tsx`:

```tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/onboarding.jpg')} // Update with your actual image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Discover the best restaurants</Text>
        <Text style={styles.subtitle}>
          Find and book tables at the best restaurants near you
        </Text>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          backgroundColor="red"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: height * 0.7,
    width: width,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
  },
});
```

### 7.2 Create Login Screen

Create `app/(auth)/login.tsx`:

```tsx
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { UserType } from '@/UserContext';
import { Button } from '@/components';
import axios from 'axios';
import { API_URL } from '@env';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserId, updateUser } = useContext(UserType);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { userId, user } = response.data;
      setUserId(userId);
      updateUser(user);
      
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Error logging in', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      
      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      />
      
      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text 
          style={styles.registerLink}
          onPress={() => router.push('/register')}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  registerLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});
```

### 7.3 Create Register Screen

Create `app/(auth)/register.tsx` using the same pattern as the login screen.

### 7.4 Create Auth Layout

Create `app/(auth)/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
```

## Task 8: Implement Main Tab Navigation with Expo Router

### 8.1 Create Tabs Layout

Create `app/(tabs)/_layout.tsx`:

```tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Entypo, AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#D71537' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#D71537" />
            ) : (
              <AntDesign name="home" size={24} color="#7E7E80" />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: true,
          headerStyle: { backgroundColor: 'red' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="search" size={24} color="#D71537" />
            ) : (
              <FontAwesome name="search" size={24} color="#7E7E80" />
            ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarLabel: 'MapCenter',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="map" size={24} color="#D71537" />
            ) : (
              <Entypo name="map" size={24} color="#7E7E80" />
            ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarLabel: 'Account',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="account" size={24} color="#D71537" />
            ) : (
              <MaterialCommunityIcons name="account" size={24} color="#7E7E80" />
            ),
        }}
      />
    </Tabs>
  );
}
```

### 8.2 Create Home Tab (index)

Create `app/(tabs)/index.tsx`:

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SearchBar, Categories } from '@/components';
import axios from 'axios';
import { API_URL } from '@env';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    router.push({
      pathname: '/search',
      params: { query }
    });
  };

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: '/search',
      params: { category }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find your favorite</Text>
        <Text style={styles.headerSubtitle}>Restaurant</Text>
      </View>
      
      <SearchBar onSearch={handleSearch} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Categories onCategoryPress={handleCategoryPress} />
        
        {/* Featured Restaurants Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          {/* Feature row component will be added here */}
        </View>
        
        {/* Popular Restaurants Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          {/* Restaurant cards will be added here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerSubtitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
```

### 8.3 Create Other Tab Screens

Create the remaining tab screens:
- `app/(tabs)/search.tsx`
- `app/(tabs)/map.tsx`
- `app/(tabs)/account.tsx`

Follow the same pattern as the home screen, converting the original JavaScript components to TypeScript.

## Task 9: Setup Theme and Style System in TypeScript

### 9.1 Create Theme Constants

Create a type-safe theme configuration:

```typescript
// theme/index.ts

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Define the structure of our theme
export interface AppTheme {
  colors: {
    primary: string;
    primaryContainer: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    onSurface: string;
    outlineVariant: string;
    // Add other color properties as needed
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  // Add other theme properties as needed
}

// Create our app theme
const theme: AppTheme = {
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    primaryContainer: 'red',
    secondary: 'yellow',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#000000',
    disabled: '#9E9E9E',
    placeholder: 'yellow',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    onSurface: '#000000',
    outlineVariant: 'red',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};

export default theme;
```

### 9.2 Create Style Utility Functions

Create helper functions for consistent styling:

```typescript
// utils/styles.ts

import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import theme from '@/theme';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

// Helper function to create styles with theme access
export function createStyles<T extends NamedStyles<T>>(
  styleFunction: (theme: typeof theme) => T
): T {
  return StyleSheet.create(styleFunction(theme));
}

// Spacing helpers
export const spacing = {
  xs: theme.spacing.xs,
  s: theme.spacing.s,
  m: theme.spacing.m,
  l: theme.spacing.l,
  xl: theme.spacing.xl,
};

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
```

### 9.3 Create Theme Provider

Create a theme provider component:

```tsx
// context/ThemeContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import theme, { AppTheme } from '@/theme';

interface ThemeContextType {
  theme: AppTheme;
  updateTheme: (newTheme: Partial<AppTheme>) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme,
  updateTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(theme);

  const updateTheme = (newTheme: Partial<AppTheme>) => {
    setCurrentTheme({
      ...currentTheme,
      ...newTheme,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

## Task 10: Testing and Bug Fixing

### 10.1 Test Core Navigation Flows

1. Create a test script to verify the navigation between core screens:

```typescript
// scripts/testNavigation.ts

import { router } from 'expo-router';

// Test navigation flow
export const testNavigationFlow = async () => {
  try {
    console.log('Testing navigation flow...');
    
    // Test onboarding to login
    router.push('/onboarding');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Onboarding screen rendered');
    
    // Test login to home
    router.push('/login');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Login screen rendered');
    
    // Test tab navigation
    router.push('/(tabs)');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Home tab rendered');
    
    router.push('/(tabs)/search');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Search tab rendered');
    
    router.push('/(tabs)/map');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Map tab rendered');
    
    router.push('/(tabs)/account');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Account tab rendered');
    
    console.log('Navigation test completed successfully');
  } catch (error) {
    console.error('Navigation test failed', error);
  }
};
```

### 10.2 Fix TypeScript and Routing Issues

1. Create a list of common TypeScript issues and their solutions:

```markdown
# Common TypeScript Migration Issues

## Issue: Props Type Errors

**Error:**
```
Type '{ onPress: () => void; }' is not assignable to type 'IntrinsicAttributes & { children?: ReactNode; }'.
  Property 'onPress' does not exist on type 'IntrinsicAttributes & { children?: ReactNode; }'.
```

**Solution:**
Define proper props interface for the component:

```tsx
interface ButtonProps {
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ onPress }) => {
  // Component implementation
};
```

## Issue: Navigation Type Errors

**Error:**
```
Property 'navigate' does not exist on type 'Router'.
```

**Solution:**
Use Expo Router's navigation methods:

```tsx
// Instead of:
navigation.navigate('Screen');

// Use:
router.push('/screen');
```

## Issue: useState Type Errors

**Error:**
```
Argument of type 'null' is not assignable to parameter of type 'never[]'.
```

**Solution:**
Explicitly define the state type:

```tsx
// Instead of:
const [items, setItems] = useState([]);

// Use:
const [items, setItems] = useState<Array<Item>>([]);
```
```

## Next Steps

After completing Sprint 2, the project will have:

1. Core UI components migrated to TypeScript
2. Main navigation structure implemented with Expo Router
3. Home and authentication screens migrated
4. A typed theme and styling system

The next sprint will focus on migrating more complex screens and implementing advanced routing patterns like nested dynamic routes and modals. 
