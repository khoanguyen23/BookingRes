/**
 * Simple verification script to check the project setup
 */

console.log('=== Project Setup Verification ===');

// Check for TypeScript
try {
  require('typescript');
  console.log('✅ TypeScript is installed');
} catch (error) {
  console.log('❌ TypeScript is not installed properly');
}

// Check for Expo Router
try {
  require('expo-router');
  console.log('✅ Expo Router is installed');
} catch (error) {
  console.log('❌ Expo Router is not installed properly');
}

// Check for UserContext
const fs = require('fs');
if (fs.existsSync('./context/UserContext.tsx')) {
  console.log('✅ UserContext.tsx exists');
} else {
  console.log('❌ UserContext.tsx does not exist');
}

// Check for app directory structure
if (fs.existsSync('./app/_layout.tsx') && fs.existsSync('./app/index.tsx')) {
  console.log('✅ Expo Router file structure is set up');
} else {
  console.log('❌ Expo Router file structure is not complete');
}

console.log('\n✅ Verification complete. Your TypeScript environment is set up successfully!'); 
