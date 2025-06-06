# BookingRes TypeScript Migration

This repository contains the TypeScript migration of the BookingRes React Native application, transitioning from React Navigation to Expo Router.

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start
```

## Migration Progress

### Sprint 1: Environment Setup ✅
- TypeScript environment setup
- Initial Expo Router structure
- UserContext migration to TypeScript
- Project structure and documentation

### Sprint 2: Core Components and Screens 🔄
- Migrating base components
- Setting up screen layouts
- Implementing authentication flow
- Creating tab navigation structure

### Sprint 3: Feature Screens and Advanced Routing 📅
- Implement nested routing
- Migrate remaining screens
- Add dynamic routes
- Implement complex navigation patterns

### Sprint 4: Finalization and Optimization 📅
- Performance optimization
- Testing and bug fixes
- Documentation completion
- Final review and deployment

## Project Structure
```
client-ts/
├── app/                   # Expo Router file-based routing
├── components/            # Reusable components
├── context/               # Context providers like UserContext
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
├── constants/             # App constants
├── theme/                 # Styling and theme configuration
└── assets/                # Images, fonts, etc.
```

## Documentation
For more detailed information about the migration process, check the `/docs` folder.

## Development Guidelines
- Use TypeScript for all new files
- Follow the established folder structure
- Add proper type definitions for all components
- Test thoroughly after each migration step 
