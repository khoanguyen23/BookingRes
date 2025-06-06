/**
 * This script is used to verify the TypeScript and Expo Router setup.
 */

import validateSetup from '../utils/validateSetup';

// Run the validation
const status = validateSetup();

// Log the results
console.log('\n=== Setup Validation Results ===');
console.log(`TypeScript: ${status.typescript ? '✅' : '❌'}`);
console.log(`Expo Router: ${status.expoRouter ? '✅' : '❌'}`);
console.log(`UserContext Migration: ${status.userContextMigrated ? '✅' : '❌'}`);

if (status.issues.length > 0) {
  console.log('\n=== Issues ===');
  status.issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
} else {
  console.log('\n✅ All systems operational. Setup is valid!');
} 
