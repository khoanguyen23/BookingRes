import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Stack 
          screenOptions={{
            headerShown: false,
          }}
        />
      </UserProvider>
    </GestureHandlerRootView>
  );
} 
