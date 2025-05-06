# @asgardeo/mcp-node

Node.js core library for enforcing Model Context Protocol (MCP) authorization using Asgardeo.

## Overview

This package provides the core functionality for implementing Model Context Protocol (MCP) based authorization in Node.js applications. It serves as the foundation for higher-level implementations like the Express middleware.

## Installation

```bash
npm install @asgardeo/mcp-node
# or
yarn add @asgardeo/mcp-node
# or 
pnpm add @asgardeo/mcp-node
```

## Features

- Authorization server metadata generation
- Protected resource metadata generation
- Token verification utilities
- Built-in Asgardeo provider
- Extensible authentication provider system

## Usage

```typescript
import { 
  generateAuthorizationServerMetadata,
  generateProtectedResourceMetadata,
  Asgardeo
} from '@asgardeo/mcp-node';

// Initialize the Asgardeo provider
const provider = Asgardeo();

// Generate authorization server metadata
const serverMetadata = generateAuthorizationServerMetadata({
  baseUrl: provider.baseUrl
});

// Generate protected resource metadata
const resourceMetadata = generateProtectedResourceMetadata({
  authorizationServers: [provider.baseUrl],
  resource: 'https://api.example.com'
});
```

## API Reference

### Providers

#### Asgardeo()
Creates an Asgardeo provider instance with pre-configured settings.

```typescript
const provider = Asgardeo();
```

### Metadata Generation

#### generateAuthorizationServerMetadata(options)
Generates metadata for the authorization server.

```typescript
const metadata = generateAuthorizationServerMetadata({
  baseUrl: 'https://api.asgardeo.io'
});
```

#### generateProtectedResourceMetadata(options)
Generates metadata for protected resources.

```typescript
const metadata = generateProtectedResourceMetadata({
  authorizationServers: ['https://api.asgardeo.io'],
  resource: 'https://api.example.com'
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