# BookingRes Migration Guide

## Overview
This document outlines the migration process from React Navigation (JavaScript) to Expo Router (TypeScript) for the BookingRes app.

## Project Structure
The new project structure uses the file-based routing system of Expo Router:

```
client-ts/
├── app/                   # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout for the app
│   ├── index.tsx          # Home screen
│   └── ...                # Other routes
├── components/            # Reusable components
├── context/               # Context providers like UserContext
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
├── constants/             # App constants
├── theme/                 # Styling and theme configuration
└── assets/                # Images, fonts, etc.
```

## TypeScript Migration Patterns

### 1. Component Conversion
When migrating components from JS to TS:
- Add proper type definitions for props
- Use interfaces for complex objects
- Add return types for functions

Example:
```tsx
// JavaScript (old)
const MyComponent = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} />;
};

// TypeScript (new)
interface MyComponentProps {
  title: string;
  onPress: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} />;
};
```

### 2. Navigation Conversion
When migrating from React Navigation to Expo Router:

- Replace stack navigation with file-based routing
- Use nested folders for nested routes
- Use `_layout.tsx` files for layouts
- Use `[param].tsx` for dynamic routes

Example:
```tsx
// Before (React Navigation)
<Stack.Screen name="Details" component={DetailsScreen} />

// After (Expo Router)
// File: app/details.tsx
export default function DetailsScreen() {
  // Component code
}
```

## Common Patterns

### Context Usage
```tsx
// Using UserContext
import { useContext } from 'react';
import { UserType } from '@/context/UserContext';

function MyComponent() {
  const { user } = useContext(UserType);
  // Use user data
}
```

## Testing
After migrating each component or screen:
1. Check for TypeScript errors
2. Verify the component renders correctly
3. Test all interactions
4. Ensure navigation works as expected 
