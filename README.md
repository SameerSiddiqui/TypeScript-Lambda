TypeScript Lambda (REST API Service)

Overview

The TypeScript Lambda is an AWS Lambda function built using Node.js and TypeScript, designed to consume external APIs and expose itself via AWS API Gateway through Lambda Invocation. It follows AWS SAM (Serverless Application Model) for deployment.

Features

REST API Integration: Handles API calls and responses efficiently.

AWS API Gateway: Exposed via API Gateway with secure endpoints.

TypeScript Support: Ensures type safety and better code maintainability.

Unit Testing: Integrated with Jest for comprehensive testing.

Project Structure

typescript-lambda/
│── npmModulesLayer/lib/nodejs/ # Layer for dependencies
│── src/
│ ├── adapters/in/ # API interaction layer
│ │ ├── rest-api.ts # API request handlers
│ ├── config/ # Configuration files
│ │ ├── app-config.ts
│ ├── domain/ # Business logic layer
│ │ ├── diContainers.ts
│ │ ├── rest-api-model.ts
│ │ ├── rest-api-service.ts
│ ├── util/ # Utility functions
│ │ ├── common.ts
│ │ ├── constants.ts
│ ├── index.ts # Lambda entry point
│── jest.config.ts # Jest config for unit tests
│── package.json # Dependencies and scripts
│── README.md # Project documentation
│── template.yaml # AWS SAM template
│── tsconfig.base.json # TypeScript base configuration
│── tsconfig.json # TypeScript config

Prerequisites

Ensure you have the following installed and configured:

AWS CLI configured with appropriate permissions.

AWS SAM CLI for local development and deployment.

Node.js (v18 or later) and npm.

Docker (optional, for local testing of API Gateway integrations).

Installation

Clone the repository

git clone [GIT_REPO_URL]
cd typescript-lambda

Install dependencies

npm install

Set up local environment

npm run set-up-local

Testing

Run the test cases

npm run test

Lint and format the code

npm run lint
npm run format

Development

Local invocation

To test the function locally using AWS SAM, run:

sam local invoke RestApiLambdaFunction

Start local development mode

For Mac/Linux:

npm run start:dev

For Windows:

npm run start:dev:win

This will start the application locally. You can use Postman or cURL to test your API.

Deployment

Deploy using AWS SAM

Step 1: Build the application

sam build

Step 2: Deploy to AWS

sam deploy --guided

This will prompt for parameters such as stack name, AWS region, and environment variables.

Best Practices

Before committing changes, always run the following commands:

npm run build # Compile TypeScript to JavaScript
npm run lint # Lint the code for errors
npm run format # Format the code
npm run test # Run unit tests

Additional Information

Excluding Unnecessary Files: Ensure that node_modules, tsconfig.json, and other development files are excluded from deployment.

Monitoring & Logging: AWS CloudWatch is used for logging Lambda executions.

Error Handling: Make sure to implement try-catch blocks and proper HTTP response handling.

Contributors

Sameer Siddiqui
Sid7201@gmail.com
