# Migration Execution Prompt Template

This document provides prompts you can use with an AI assistant to execute the migration plan step-by-step.

## Base Context Prompt

Use this base prompt at the beginning of each sprint to establish context:

```
I'm migrating my React Native app from React Navigation (JavaScript) to Expo Router with TypeScript. 

CURRENT PROJECT STATE:
- React Native app built with Expo SDK 49
- Using React Navigation with Stack and Tab navigators  
- JavaScript codebase with some components
- Restaurant booking platform with user and admin features
- Current file structure: /screens, /navigation, /components, etc.

TARGET STATE:
- Expo Router with file-based routing
- Full TypeScript conversion
- Modern Expo SDK (latest version)
- Maintain all existing functionality during migration

MIGRATION APPROACH:
- 4 sprints with incremental migration
- App remains functional throughout migration
- Parallel implementation where needed
- Thorough testing at each step

I have the following migration guide documents:
- migration-plan.md (overall plan)
- sprint-1-guide.md (environment setup)
- sprint-2-guide.md (core components and screens)
- sprint-3-guide.md (feature screens and advanced routing)
- sprint-4-guide.md (finalization and optimization)
- migration-summary.md (high-level overview)

Current project location: /Users/nguyen_khoa/Documents/GitHub/BookingRes/client
```

## Sprint 1 Execution Prompt

```
I'm ready to start Sprint 1 of my React Navigation to Expo Router migration. 

SPRINT 1 GOALS:
- Setup TypeScript environment
- Create initial Expo Router structure
- Establish migration patterns
- Migrate UserContext to TypeScript
- Create documentation

CURRENT TASK: [Specify which task from sprint-1-guide.md]

Please help me:
1. Review the current state of my project for this specific task
2. Provide the exact commands and code changes needed
3. Explain any potential issues I might encounter
4. Give me verification steps to confirm the task is completed correctly
5. Suggest the next logical step

SPECIFIC REQUEST: [Be specific about what you need help with, e.g., "Help me install TypeScript dependencies and create tsconfig.json" or "Help me convert UserContext.js to TypeScript"]

Please provide step-by-step instructions with exact file paths and code examples. If you need to see my current files, let me know which ones to share.
```

## Sprint 2 Execution Prompt

```
I'm working on Sprint 2 of my migration (Core Screens and Components Migration).

SPRINT 1 STATUS: [Completed/Partial - specify what's done]

SPRINT 2 CURRENT TASK: [Specify which task from sprint-2-guide.md]

Please help me:
1. Analyze my current component/screen that needs migration
2. Provide the TypeScript conversion with proper types
3. Show how to implement it with Expo Router
4. Ensure compatibility with existing code during transition
5. Provide testing steps

SPECIFIC REQUEST: [e.g., "Convert my Button component to TypeScript" or "Create the login screen with Expo Router"]

What I need:
- Exact file locations and names
- Complete code with TypeScript types
- Import/export statements
- Any new dependencies needed
- How to test the migrated component

Please be specific about file paths relative to my client directory.
```

## Sprint 3 Execution Prompt

```
I'm working on Sprint 3 (Feature Screens and Advanced Routing).

PREVIOUS SPRINTS STATUS:
- Sprint 1: [Status and any issues]
- Sprint 2: [Status and any issues]

CURRENT TASK: [Specify task from sprint-3-guide.md]

Please help me:
1. Implement the dynamic routing patterns needed
2. Create the proper file structure for nested routes
3. Handle authentication and protected routes
4. Implement modal routing if applicable
5. Ensure proper TypeScript typing throughout

SPECIFIC REQUEST: [e.g., "Create dynamic restaurant detail route with [id]" or "Implement authentication context with protected routes"]

Focus on:
- Proper Expo Router file structure
- TypeScript interfaces for route parameters
- Navigation between screens
- State management integration
- Error handling

Please provide complete working examples with explanations.
```

## Sprint 4 Execution Prompt

```
I'm working on Sprint 4 (Finalization and Optimization).

MIGRATION PROGRESS:
- Sprint 1: [Status]
- Sprint 2: [Status] 
- Sprint 3: [Status]

CURRENT TASK: [Specify task from sprint-4-guide.md]

Please help me:
1. Complete any remaining migrations
2. Optimize performance and bundle size
3. Set up proper error handling
4. Configure deep linking
5. Prepare for production deployment

SPECIFIC REQUEST: [e.g., "Set up deep linking configuration" or "Implement error boundaries and 404 handling"]

Priorities:
- Production readiness
- Performance optimization
- Comprehensive error handling
- Documentation completion
- Deployment preparation

Please provide production-ready code with best practices.
```

## Troubleshooting Prompt

Use this when you encounter issues:

```
I'm having an issue during my React Navigation to Expo Router migration.

CURRENT SPRINT: [1/2/3/4]
CURRENT TASK: [Specific task from guide]

ISSUE DESCRIPTION:
[Describe the problem in detail]

ERROR MESSAGES:
[Include any error messages or logs]

WHAT I'VE TRIED:
[List what you've already attempted]

CURRENT CODE:
[Share the relevant code that's causing issues]

Please help me:
1. Diagnose the root cause of the issue
2. Provide a step-by-step solution
3. Explain why the issue occurred
4. Suggest how to prevent similar issues
5. Verify the solution works

I need the solution to be compatible with my ongoing migration and not break existing functionality.
```

## Code Review Prompt

Use this to review completed tasks:

```
I've completed [specific task] from [Sprint X] of my migration. Please review my implementation.

TASK COMPLETED: [Describe what you implemented]

CHANGES MADE:
- [List files created/modified]
- [Describe key changes]

CODE TO REVIEW:
[Share the relevant code]

Please review for:
1. TypeScript best practices and proper typing
2. Expo Router implementation correctness
3. Code quality and maintainability
4. Performance considerations
5. Potential issues or improvements

QUESTIONS:
- Is this implementation following the migration plan correctly?
- Are there any TypeScript improvements I should make?
- Does this integrate properly with Expo Router?
- What should I test to ensure it works correctly?
- What's the next logical step in my migration?

Please provide specific feedback and suggestions for improvement.
```

## Progress Check Prompt

Use this to assess overall progress:

```
I want to check my overall progress on the React Navigation to Expo Router migration.

COMPLETED TASKS:
Sprint 1:
- [ ] Task 1: [Status]
- [ ] Task 2: [Status]
- etc.

Sprint 2:
- [ ] Task 6: [Status]
- [ ] Task 7: [Status]
- etc.

CURRENT ISSUES:
[List any blockers or challenges]

QUESTIONS:
1. Am I on track with the migration plan?
2. Are there any critical issues I should address?
3. What should I prioritize next?
4. Do I need to adjust the migration approach?
5. How can I verify my current implementation is solid?

Please provide:
- Assessment of current progress
- Recommendations for next steps
- Any adjustments to the plan if needed
- Testing strategies to validate current work
```

## Usage Instructions

1. **Start each sprint** with the Base Context + Sprint-specific prompt
2. **For each task** within a sprint, use the sprint-specific prompt with the exact task details
3. **When stuck**, use the Troubleshooting prompt with specific error details
4. **After completing tasks**, use the Code Review prompt to validate your work
5. **Regularly check progress** with the Progress Check prompt

## Tips for Effective Prompting

1. **Be specific** about which task you're working on
2. **Include relevant code** when asking for help
3. **Mention your current file structure** when needed
4. **Ask for verification steps** to confirm success
5. **Request next steps** to maintain momentum
6. **Share error messages** completely when troubleshooting

## Example Usage

```
[Base Context Prompt]

I'm ready to start Sprint 1 of my React Navigation to Expo Router migration.

CURRENT TASK: Task 1.1 - Install TypeScript and Dependencies

Please help me:
1. Review my current package.json to understand existing dependencies
2. Provide the exact npm install commands for TypeScript setup
3. Show me what my updated package.json should look like
4. Give me verification steps to confirm TypeScript is working
5. Tell me what to do next

SPECIFIC REQUEST: I need to install TypeScript, @types/react, @types/react-native, and expo-router. I want to make sure I don't break my existing setup.

Please provide step-by-step instructions with exact commands.
```

This approach will help you maintain steady progress while getting detailed, actionable guidance for each step of your migration. 
