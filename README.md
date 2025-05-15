<p align="center" style="color: #343a40">
  <img
    src="https://github.com/asgardeo/web-ui-sdks/assets/25959096/ae77b70c-6570-40b1-a723-719abd0f7d02" alt="Asgardeo Logo" height="40" width="auto"
  >
  <h1 align="center">
    Asgardeo MCP Node.js SDKs
  </h1>
</p>
<p align="center" style="font-size: 1.2rem;">
  Node.js SDKs for implementing Model Context Protocol (MCP) authorization with <a href="https://wso2.com/asgardeo">Asgardeo</a>. This repository is maintained by <a href="https://github.com/brionmario">Brion Mario</a>.
</p>

<div align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache--2.0-blue.svg" alt="License"></a>
  <a href="https://github.com/brionmario/asgardeo-mcp-node/actions/workflows/release.yml"><img src="https://github.com/brionmario/asgardeo-mcp-node/actions/workflows/release.yml/badge.svg" alt="🚀 Release"></a>
  <br>
  <br>
</div>

<br>

This repository contains the source code for Node.js SDKs that help you enforce Model Context Protocol (MCP) based authorization using Asgardeo. If you have any questions, please reach out to us through one of the following channels:

[![Stackoverflow](https://img.shields.io/badge/Ask%20for%20help%20on-Stackoverflow-orange)](https://stackoverflow.com/questions/tagged/wso2is+asgardeo+mcp)
[![Join the chat at https://discord.gg/wso2](https://img.shields.io/badge/Join%20us%20on-Discord-%23e01563.svg)](https://discord.gg/wso2)
[![Follow Asgardeo on Twitter](https://img.shields.io/twitter/follow/Asgardeo?style=social&label=Follow%20Asgardeo)](https://twitter.com/intent/follow?screen_name=Asgardeo)

## Packages

| Package                                                                                                   | Description                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [![@brionmario-experimental/mcp-express](https://img.shields.io/npm/v/@brionmario-experimental/mcp-express?color=%234A90E2&label=%40brionmario-experimental%2Fmcp-express&logo=express)](./packages/mcp-express/)                     | Express middleware for enforcing MCP authorization using Asgardeo.                            |
| [![@brionmario-experimental/mcp-node](https://img.shields.io/npm/v/@brionmario-experimental/mcp-node?color=%23339933&label=%40brionmario-experimental%2Fmcp-node&logo=nodedotjs)](./packages/mcp-node/) (Placeholder) | Core Node.js utilities for Model Context Protocol (MCP) integration with Asgardeo.        |



## Overview

The Model Context Protocol (MCP) is designed to provide a standardized way for applications to convey contextual information relevant to authorization decisions. These SDKs facilitate the integration of MCP with Asgardeo in Node.js applications.

-   **MCP Express (@brionmario-experimental/mcp-express)**: Middleware specifically tailored for Express.js applications to seamlessly integrate MCP-based authorization.
-   **MCP Node (@brionmario-experimental/mcp-node)**: Core functionalities and utilities for MCP, which can be used in various Node.js environments. The Express middleware may utilize or depend on this core package.

For detailed installation and usage instructions for each package, please refer to the README file within its respective directory (e.g., `packages/mcp-express/README.md`).

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:
- Node.js `16.x` or later
- pnpm `8.x` or later (or your preferred package manager like npm/yarn, though pnpm is often used in monorepos)

## Development

To get started with development:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/brionmario/asgardeo-mcp-node.git](https://github.com/brionmario/asgardeo-mcp-node.git)
    cd asgardeo-mcp-node
    ```

2.  **Install dependencies:**
    If you are using pnpm and have a workspace setup:
    ```bash
    pnpm install
    ```
    This will typically install dependencies for all packages in the monorepo.

3.  **Build packages:**
    You will likely have a root-level build command or individual build commands per package. Example using pnpm workspaces:
    ```bash
    pnpm run build
    # or to build a specific package
    # pnpm --filter @brionmario-experimental/mcp-express run build
    ```

Please refer to the `package.json` scripts and individual package READMEs for more detailed development commands.

## Contribute

Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us. We highly value your contributions and support!

### Reporting issues

We encourage you to report issues, improvements, and feature requests by creating [Github Issues](https://github.com/brionmario/asgardeo-mcp-node/issues).

**Important**: Please be advised that security issues **MUST** be reported to <a href="mailto:security@wso2.com">security@wso2.com</a>, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](./LICENSE) file for details.