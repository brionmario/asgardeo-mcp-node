import express from 'express';
import {config} from 'dotenv';
import {McpAuthServer, protectedRoute} from '@asgardeo/mcp-express';
import {protectedRoutes} from './routes/protected';
import {publicRoutes} from './routes/public';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  McpAuthServer({
    providers: [
      {
        baseUrl: process.env.BASE_URL ?? "",
        issuer: process.env.ISSUER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
    ],
  }),
);

// Public routes
app.use('/api', publicRoutes);

// Protected routes with MCP authentication
app.use(
  '/api/protected',
  protectedRoute({
    baseUrl: process.env.BASE_URL ?? " ",
    issuer: process.env.ISSUER,
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET,
  }),
  protectedRoutes,
);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({error: 'Something broke!'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
