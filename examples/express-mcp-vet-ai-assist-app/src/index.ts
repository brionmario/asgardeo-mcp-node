import express from 'express';
import {randomUUID} from 'node:crypto';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StreamableHTTPServerTransport} from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {isInitializeRequest} from '@modelcontextprotocol/sdk/types.js';
import {z} from 'zod';
import {McpAuthServer, protectedRoute} from '@brionmario-experimental/mcp-express';
import {config} from 'dotenv';

config();

const app = express();
app.use(express.json());
app.use(
  McpAuthServer({
    providers: [
      {
        baseUrl: process.env.BASE_URL as string,
        issuer: process.env.ISSUER as string,
      },
    ],
  }),
);

// Explicitly define the transport type
interface TransportMap {
  [sessionId: string]: {
    transport: StreamableHTTPServerTransport;
    lastAccess: number;
  };
}

// Map to store transports by session ID
const transports: TransportMap = {};

// Session timeout (30 minutes)
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

// Function to check if a session has expired
const isSessionExpired = (lastAccessTime: number): boolean => {
  return Date.now() - lastAccessTime > SESSION_TIMEOUT_MS;
};

// Handle POST requests for client-to-server communication
app.post(
  '/mcp',
  protectedRoute({
    baseUrl: process.env.BASE_URL as string,
    issuer: process.env.ISSUER as string,
  }),
  async (req, res) => {
    try {
      // Check for existing session ID
      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      let transport: StreamableHTTPServerTransport;

      if (sessionId && transports[sessionId]) {
        // Check if session has expired
        if (isSessionExpired(transports[sessionId].lastAccess)) {
          console.log(`Session expired: ${sessionId}`);
          transports[sessionId].transport.close();
          delete transports[sessionId];

          // Return error for expired session
          res.status(401).json({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message: 'Session expired',
            },
            id: null,
          });
          return;
        }

        // Reuse existing transport
        transport = transports[sessionId].transport;
        // Update session last access time
        transports[sessionId].lastAccess = Date.now();
      } else if (!sessionId && isInitializeRequest(req.body)) {
        
        let bearerToken: string | undefined;
        const authHeader = req.headers.authorization as string | undefined;
        if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
          bearerToken = authHeader.substring(7);
          console.log(`Bearer token captured for new session.`);
        } else {
          console.warn('MCP session initialized: No Bearer token found in Authorization header.');
        }
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: newSessionId => {
            // Store the transport by session ID
            transports[newSessionId] = {
              transport: transport,
              lastAccess: Date.now(),
            };
            console.log(`Session initialized: ${newSessionId}`);
          },
        });

        // Clean up transport when closed
        transport.onclose = () => {
          if (transport.sessionId) {
            console.log(`Session closed: ${transport.sessionId}`);
            delete transports[transport.sessionId];
          }
        };

        const server = new McpServer({
          name: 'example-server',
          version: '1.0.0',
        });

        server.tool(
          'get_pet_vaccination_info',
          'Retrieves the vaccination history and upcoming vaccination dates for a specific pet. Requires user authentication and explicit consent via an authorization token.',
          {
            petId: z.string().describe('The unique identifier for the pet.'),
          },
          async ({petId}) => {
            try {
              if (bearerToken) {
                console.log(`Tool 'get_pet_vaccination_info' called for pet ${petId} with token: ${bearerToken.substring(0, 10)}...`);
              } else {
                console.warn(`Tool 'get_pet_vaccination_info' called for pet ${petId} without a bearer token.`);
              }
              return {
                content: [
                  {
                    type: 'text',
                    text: `Retrieved vaccination info for pet ID: ${petId}. Token was ${bearerToken ? 'present' : 'absent'}.`,
                  },
                ],
              };
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              console.error(`Error retrieving vaccination info: ${errorMessage}`);
              throw new Error(`Failed to retrieve vaccination information: ${errorMessage}`);
            }
          },
        );

        server.tool(
          'book_vet_appointment',
          'Books a new veterinary appointment for a specific pet. Requires user authentication and explicit consent via an authorization token.',
          {
            petId: z.string().describe('The unique identifier for the pet.'),
            date: z.string().describe('Desired date for the appointment (e.g., YYYY-MM-DD).'),
            time: z.string().describe('Desired time for the appointment (e.g., HH:MM AM/PM).'),
            reason: z.string().describe('The reason for the vet visit.'),
          },
          async ({petId, date, time, reason}) => { // bearerToken is accessible here
            try {
              // --- MODIFICATION: Use Bearer Token ---
              if (bearerToken) {
                console.log(`Tool 'book_vet_appointment' called for pet ${petId} with token: ${bearerToken.substring(0, 10)}...`);
                // Use the token as needed
              } else {
                console.warn(`Tool 'book_vet_appointment' called for pet ${petId} without a bearer token.`);
                // Handle missing token
              }
              // --- MODIFICATION END ---
              return {
                content: [
                  {
                    type: 'text',
                    text: `Booked vet appointment for pet ID: ${petId} on ${date} at ${time} for: ${reason}. Token was ${bearerToken ? 'present' : 'absent'}.`,
                  },
                ],
              };
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              console.error(`Error booking appointment: ${errorMessage}`);
              throw new Error(`Failed to book appointment: ${errorMessage}`);
            }
          },
        );

        try {
          // Connect to the MCP server
          await server.connect(transport);
          console.log('Server connected to transport');
        } catch (error) {
          console.error(`Error connecting server to transport: ${error}`);
          res.status(500).json({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message: 'Internal server error: Failed to connect to MCP server',
            },
            id: null,
          });
          return;
        }
      } else {
        // Invalid request
        let message = 'Bad Request: No valid session ID provided for existing session.';
        if (!isInitializeRequest(req.body)) {
            message = 'Bad Request: Not an initialization request and no session ID found.'
        }
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32000, // Or -32600 for Invalid Request as per JSON-RPC 2.0
            message: message,
          },
          id: req.body?.id || null, // Try to include request ID if available
        });
        return;
      }

      // Handle the request
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error(`Error handling MCP request: ${error}`);
      // Ensure req.body is checked for 'id' property
      const requestId = (typeof req.body === 'object' && req.body !== null && 'id' in req.body) ? req.body.id : null;
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Internal server error',
        },
        id: requestId,
      });
    }
  },
);

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (expressReq: express.Request, expressRes: express.Response) => {
  try {
    const sessionId = expressReq.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
      expressRes.status(400).send('Invalid or missing session ID');
      return;
    }

    // Check if session has expired
    if (isSessionExpired(transports[sessionId].lastAccess)) {
      console.log(`Session expired: ${sessionId}`);
      transports[sessionId].transport.close();
      delete transports[sessionId];
      expressRes.status(401).send('Session expired');
      return;
    }

    // Update session last access time
    transports[sessionId].lastAccess = Date.now();

    const transport = transports[sessionId].transport;
    await transport.handleRequest(expressReq, expressRes);
  } catch (error) {
    console.error(`Error handling session request: ${error}`);
    expressRes.status(500).send('Internal server error');
  }
};

// Handle GET requests for server-to-client notifications
app.get('/mcp', handleSessionRequest);

// Handle DELETE requests for session termination
app.delete('/mcp', handleSessionRequest);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
