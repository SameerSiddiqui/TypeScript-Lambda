# **TypeScript Lambda (REST API Service)**

## **Overview**
The **TypeScript Lambda** is an AWS Lambda function built using **Node.js and TypeScript**, designed to consume external APIs and expose itself via **AWS API Gateway** through Lambda Invocation. It follows **AWS SAM (Serverless Application Model)** for deployment.

## **Features**
- **REST API Integration**: Handles API calls and responses efficiently.
- **AWS API Gateway**: Exposed via API Gateway with secure endpoints.
- **TypeScript Support**: Ensures type safety and better code maintainability.
- **Unit Testing**: Integrated with Jest for comprehensive testing.

## **Project Structure**

```typescript-lambda/
│── npmModulesLayer/lib/nodejs/  # Layer for dependencies
│── src/
│   ├── adapters/in/             # API interaction layer
│   │   ├── rest-api.ts          # API request handlers
│   ├── config/                  # Configuration files
│   │   ├── app-config.ts
│   ├── domain/                  # Business logic layer
│   │   ├── diContainers.ts
│   │   ├── rest-api-model.ts
│   │   ├── rest-api-service.ts
│   ├── util/                     # Utility functions
│   │   ├── common.ts
│   │   ├── constants.ts
│   ├── index.ts                   # Lambda entry point
│── jest.config.ts                  # Jest config for unit tests
│── package.json                     # Dependencies and scripts
│── README.md                         # Project documentation
│── template.yaml                     # AWS SAM template
│── tsconfig.base.json                 # TypeScript base configuration
│── tsconfig.json                      # TypeScript config
```
