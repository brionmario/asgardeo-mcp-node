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

import {AUTHORIZATION_SERVER_METADATA_URL} from '@asgardeo/mcp-node';
import {NextFunction, Request, Response} from 'express';

export default function protectedRoute(req: Request, res: Response, next: NextFunction): Response | undefined {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader) {
    // RFC9728 compliant WWW-Authenticate header with resource server metadata URL
    res.setHeader(
      'WWW-Authenticate',
      `Bearer resource_metadata="${req.protocol}://${req.get('host')}${AUTHORIZATION_SERVER_METADATA_URL}"`,
    );
    return res.status(401).json({
      error: 'unauthorized',
      error_description: 'Missing authorization token',
    });
  }

  // Continue processing if authorization header is present
  next();

  return undefined;
}
