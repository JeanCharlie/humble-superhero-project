# Humble Superhero API

## Setup and Running
1. Install dependencies: `npm install`
2. Run the application: `npm run start`
3. Run tests: `npm run test`

## Collaboration Approach
When working with a teammate on this project, I would:
- Schedule a kickoff meeting to discuss the API design and requirements
- Use pair programming for complex implementations
- Conduct regular code reviews to ensure code quality and share knowledge
- Use pull requests with detailed descriptions of changes
- Maintain clear, descriptive commit messages

## If I Had More Time, I Would Improve:
- Implement persistent storage (e.g., MongoDB)
- Add authentication and authorization
- Create more comprehensive test coverage
- Implement advanced filtering and search capabilities
- Add logging and error handling middleware
- Create a more robust validation system

## Design Decisions
- Used in-memory storage for simplicity
- Implemented validation using class-validator
- Sorted superheroes by humility score in descending order
- Enabled CORS for potential frontend integration

## Potential Expansions
- Add pagination for superhero list
- Implement update and delete endpoints
- Create more complex scoring or ranking systems