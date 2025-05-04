import express, {RequestHandler} from 'express';
import {authorizationHandler} from './handlers/autherize.js';
import {metadataHandler} from './handlers/metadata.js';

export function asgardeoMCPAuthRouter(): RequestHandler {
  const router = express.Router();
  router.use('/authorize', authorizationHandler());

  router.use('/.well-known/oauth-authorization-server', metadataHandler());

  return router;
}
