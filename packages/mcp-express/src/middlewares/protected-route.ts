/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {AUTHORIZATION_SERVER_METADATA_URL, validateAccessToken, McpAuthProvider} from '@asgardeo/mcp-node';
import {NextFunction, Request, Response} from 'express';

export default function protectedRoute(provider?: McpAuthProvider) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader) {
      res.setHeader(
        'WWW-Authenticate',
        `Bearer resource_metadata="${req.protocol}://${req.get('host')}${AUTHORIZATION_SERVER_METADATA_URL}"`,
      );
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Missing authorization token',
      });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Authorization header must be in format: Bearer [token]',
      });
    }

    const token = parts[1];

    const issuerBase = provider?.baseUrl;

    const TOKEN_VALIDATION_CONFIG = {
      jwksUri: `${issuerBase}/oauth2/jwks`,
      options: {
        issuer: `${issuerBase}/oauth2/token`,
        audience: provider?.clientId,
        clockTolerance: 60,
      },
    };

    try {
      await validateAccessToken(token, TOKEN_VALIDATION_CONFIG.jwksUri, TOKEN_VALIDATION_CONFIG.options);
      next();
      return undefined;
    } catch (error: any) {
      console.error('Token validation failed:', error.message);
      return res.status(401).json({
        error: 'invalid_token',
        error_description: error.message || 'Invalid or expired token',
      });
    }
  };
}
