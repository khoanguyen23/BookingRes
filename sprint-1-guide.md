# Sprint 1: Environment Setup and Initial TypeScript Migration

This guide details the steps to complete Sprint 1 of the migration from React Navigation to Expo Router with TypeScript.

## Task 1: Setup TypeScript Environment

### 1.1 Install TypeScript and Dependencies

```bash
# Install TypeScript and necessary type definitions
npm install --save-dev typescript @types/react @types/react-native

# Install Expo Router
npm install expo-router@latest

# Ensure latest Expo packages
npx expo install expo-linking expo-constants expo-status-bar expo-system-ui
```

### 1.2 Create TypeScript Configuration

Create a `tsconfig.json` file in the client directory:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/screens/*": ["./screens/*"],
      "@/constants/*": ["./constants/*"],
      "@/context/*": ["./context/*"],
      "@/utils/*": ["./utils/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/theme/*": ["./theme/*"],
      "@/assets/*": ["./assets/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 1.3 Update Babel Configuration

Update `babel.config.js` to support path aliases:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "nativewind/babel",
      'react-native-paper/babel',
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blockList": null,
        "allowlist": null
      }],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/components': './components',
            '@/screens': './screens',
            '@/constants': './constants',
            '@/context': './context',
            '@/utils': './utils',
            '@/hooks': './hooks',
            '@/theme': './theme',
            '@/assets': './assets'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      ]
    ],
  };
};
```

### 1.4 Install Required Package for Path Aliases

```bash
npm install --save-dev babel-plugin-module-resolver
```

### 1.5 Create Types Declaration File

Create an `expo-env.d.ts` file in the client directory:

```typescript
/// <reference types="expo/types" />
```

## Task 2: Create Initial Expo Router Structure

### 2.1 Create App Directory Structure

Create the following directory structure:

```
app/
  _layout.tsx
  index.tsx
  (auth)/
    _layout.tsx
    login.tsx
    register.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    search.tsx
    map.tsx
    account.tsx
```

### 2.2 Create Root Layout

Create `app/_layout.tsx`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { UserProvider } from '@/UserContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    primaryContainer: 'red',
    secondary: 'yellow',
    placeholder: 'yellow',
    outlineVariant: "red"
  },
};

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after the app is ready
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    
    hideSplash();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }} />
        </PaperProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
```

### 2.3 Create Initial Index Route

Create `app/index.tsx` (redirects to onboarding):

```tsx
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/onboarding" />;
}
```

## Task 3: Establish Migration Patterns

### 3.1 Create Type Definitions for Common Data Structures

Create a `types` directory with shared types:

```typescript
// types/index.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  // Add other user properties
}

export interface Restaurant {
  _id: string;
  name: string;
  // Add other restaurant properties
}

// Add other common interfaces
```

### 3.2 Create Navigation Utilities

Create a utility to bridge React Navigation and Expo Router:

```typescript
// utils/navigation.ts

import { useNavigation as useReactNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Helper to migrate between React Navigation and Expo Router
export function useNavigation() {
  // During migration, we can use this to conditionally use either router
  const reactNavigation = useReactNavigation();
  const expoRouter = useRouter();
  
  return {
    // Common navigation methods
    navigate: (name: string, params?: Record<string, any>) => {
      if (typeof name === 'string' && name.startsWith('/')) {
        // Expo Router path
        expoRouter.push({
          pathname: name,
          params
        });
      } else {
        // React Navigation screen name
        reactNavigation.navigate(name as never, params as never);
      }
    },
    goBack: () => {
      if (expoRouter.canGoBack()) {
        expoRouter.back();
      } else {
        reactNavigation.goBack();
      }
    },
    // Add other common methods
  };
}

// Route mapping between React Navigation and Expo Router
export const routeMapping = {
  'Onboarding': '/onboarding',
  'Login': '/login',
  'Register': '/register',
  'Main': '/(tabs)',
  // Add other route mappings
};
```

## Task 4: Migrate Context to TypeScript

### 4.1 Convert UserContext to TypeScript

Create `UserContext.tsx` (replacing the JS version):

```tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define the User type
export interface User {
  _id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

// Define the Context type
interface UserContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  updateUser: (userData: User) => void;
}

// Create context with default values
export const UserType = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  user: null,
  updateUser: () => {}
});

// Props for the provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserType.Provider value={{ userId, setUserId, user, updateUser }}>
      {children}
    </UserType.Provider>
  );
};
```

## Task 5: Documentation

### 5.1 Create TypeScript Conventions Document

Create a `docs/typescript-conventions.md` file:

```markdown
# TypeScript Conventions

## Naming Conventions

- **Interfaces**: PascalCase, prefixed with "I" (e.g., `IUser`)
- **Types**: PascalCase (e.g., `UserRole`)
- **Enums**: PascalCase (e.g., `OrderStatus`)
- **Functions**: camelCase (e.g., `fetchUser`)
- **Variables**: camelCase (e.g., `userProfile`)

## File Organization

- Group related types in dedicated files
- For component props, define them in the same file as the component
- Use barrel exports (index.ts files) to simplify imports

## Type Definitions

### Component Props

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}
```

### React Components

```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  // Props here
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, variant = 'primary' }) => {
  // Component implementation
};
```

### Hooks

```typescript
function useCustomHook<T>(initialValue: T): [T, (newValue: T) => void] {
  // Hook implementation
}
```
```

### 5.2 Create Migration Guide

Create a `docs/migration-guide.md` file:

```markdown
# Migration Guide: React Navigation to Expo Router

This guide outlines the process for migrating screens from React Navigation to Expo Router.

## Screen Migration Checklist

1. **Convert to TypeScript**
   - Rename file from `.js` to `.tsx`
   - Add type definitions for props and state
   - Fix any type errors

2. **Update Imports**
   - Replace React Navigation imports with Expo Router
   - Update path imports to use aliases

3. **Replace Navigation Hooks**
   - Replace `useNavigation()` with `useRouter()`
   - Replace `useRoute()` with `useLocalSearchParams()`

4. **Update Navigation Actions**
   - Replace `navigation.navigate('Screen')` with `router.push('/screen')`
   - Replace `navigation.goBack()` with `router.back()`

5. **Update Screen Parameters**
   - Replace `route.params` with `useLocalSearchParams()`

## File-Based Routing Conventions

- **Regular Routes**: `app/screen-name.tsx`
- **Nested Routes**: `app/parent/child.tsx`
- **Dynamic Routes**: `app/[param].tsx`
- **Tab Routes**: `app/(tabs)/tab-name.tsx`
- **Modal Routes**: `app/+modal.tsx`
- **Layouts**: `app/_layout.tsx`

## Example Migration

### Before (React Navigation):

```jsx
import { useNavigation, useRoute } from '@react-navigation/native';

function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;
  
  return (
    <View>
      <Button onPress={() => navigation.navigate('Settings')}>
        Go to Settings
      </Button>
    </View>
  );
}
```

### After (Expo Router):

```tsx
import { useRouter, useLocalSearchParams } from 'expo-router';

function ProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  
  return (
    <View>
      <Button onPress={() => router.push('/settings')}>
        Go to Settings
      </Button>
    </View>
  );
}
```
```

## Next Steps

After completing Sprint 1, the project will have:

1. A working TypeScript environment
2. The initial Expo Router structure
3. Type definitions for common data structures
4. A TypeScript version of the UserContext
5. Documentation for TypeScript conventions and migration process

The next sprint will focus on migrating core components and screens to TypeScript and implementing them as Expo Router routes. 
