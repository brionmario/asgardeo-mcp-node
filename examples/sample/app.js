import express from 'express';
import {asgardeoMCPAuthRouter} from '@asgardeo/mcp-express';

const app = express();

app.use(asgardeoMCPAuthRouter());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
