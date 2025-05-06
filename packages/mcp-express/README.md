# @brionmario-experimental/mcp-express

Express middleware for enforcing Model Context Protocol (MCP) authorization using Asgardeo.

## Overview

This package provides Express middleware that implements Model Context Protocol (MCP) based authorization for Express.js applications. It integrates with Asgardeo for authentication and authorization services.

## Installation

```bash
npm install @brionmario-experimental/mcp-express
# or
yarn add @brionmario-experimental/mcp-express
# or 
pnpm add @brionmario-experimental/mcp-express
```

## Features

- Easy-to-use Express middleware
- Protected route handling
- Automatic metadata endpoint setup
- Built-in CORS support
- Seamless integration with Asgardeo

## Usage

```typescript
import express from 'express';
import { McpAuthServer, protectedRoute } from '@brionmario-experimental/mcp-express';

const app = express();

// Initialize MCP authentication server
app.use(McpAuthServer());

// Public routes
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected routes
app.use('/api/protected', protectedRoute, (req, res) => {
  res.json({ message: 'This is a protected endpoint' });
});
```

## API Reference

### Middleware

#### McpAuthServer(options?)
Initializes the MCP authentication server middleware. This sets up the necessary endpoints for MCP authentication.

```typescript
import { McpAuthServer } from '@brionmario-experimental/mcp-express';

app.use(McpAuthServer({
  providers: [Asgardeo()]
}));
```

#### protectedRoute
Middleware to protect routes that require authentication.

```typescript
import { protectedRoute } from '@brionmario-experimental/mcp-express';

app.use('/api/protected', protectedRoute, protectedRoutes);
```

### Configuration

The middleware can be configured with the following options:

```typescript
interface McpAuthOptions {
  providers: McpAuthProvider[];  // Array of authentication providers
}

interface McpAuthProvider {
  baseUrl: string;  // Base URL of the authentication provider
}
```

## Example

Here's a complete example of setting up an Express server with MCP authentication:

```typescript
import express from 'express';
import { McpAuthServer, protectedRoute } from '@brionmario-experimental/mcp-express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize MCP authentication
app.use(McpAuthServer());

// Public routes
app.use('/api', publicRoutes);

// Protected routes with MCP authentication
app.use('/api/protected', protectedRoute, protectedRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## Development

### Prerequisites

- Node.js 16.x or later
- pnpm 8.x or later

### Setup

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

### Build
```bash
pnpm build
```

### Lint
```bash
pnpm lint
```

## License

Apache-2.0 - see the [LICENSE](LICENSE) file for details.