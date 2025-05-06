# MCP Express

Express middleware for enforcing Model Context Protocol (MCP) authorization using Asgardeo.

## Overview

This repository contains the Model Context Protocol (MCP) Express middleware that helps enforce MCP-based authorization using Asgardeo. The middleware is designed to integrate seamlessly with Express applications and provide robust authorization controls.

## Installation

```bash
npm install @brionmario-experimental/mcp-express
# or
yarn add @brionmario-experimental/mcp-express
# or 
pnpm add @brionmario-experimental/mcp-express
```

## Project Structure

The main package contains:
- `src/` - Source code
  - `controllers/` - Request handlers
  - `middlewares/` - Express middleware implementations
  - `models/` - Data models
  - `routes/` - API route definitions

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

To build the library:

```bash
pnpm build
```

### Test

To run tests:

```bash
pnpm test
```

### Linting

To lint the code:

```bash
pnpm lint
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

Apache-2.0 - see the [LICENSE](LICENSE) file for details.
