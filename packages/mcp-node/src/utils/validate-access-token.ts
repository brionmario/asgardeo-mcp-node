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

import {URL} from 'url';
import {createRemoteJWKSet, jwtVerify, JWTVerifyResult, JWTPayload, JWTVerifyOptions} from 'jose';

export default async function validateAccessToken(
  accessToken: string,
  jwksUri: string,
  options: JWTVerifyOptions,
): Promise<JWTVerifyResult<JWTPayload>> {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new Error('Access Token must be a non-empty string.');
  }

  let jwksUrl: URL;
  try {
    jwksUrl = new URL(jwksUri);
  } catch {
    throw new Error('Invalid JWKS URI.');
  }

  if (!options || typeof options !== 'object') {
    throw new Error('Validation options must be provided.');
  }

  const {issuer, audience, clockTolerance} = options;
  if (!issuer || typeof issuer !== 'string') {
    throw new Error('Issuer must be a non-empty string in options.');
  }
  if (!audience || (typeof audience !== 'string' && !Array.isArray(audience))) {
    throw new Error('Audience must be a non-empty string or array of strings in options.');
  }

  const JWKS = createRemoteJWKSet(jwksUrl);

  try {
    const result = await jwtVerify(accessToken, JWKS, {
      issuer,
      audience,
      clockTolerance,
    });

    const SUPPORTED_SIGNATURE_ALGORITHMS: string[] = ['RS256', 'RS512', 'RS384', 'PS256'];

    if (!SUPPORTED_SIGNATURE_ALGORITHMS.includes(result.protectedHeader.alg)) {
      throw new Error(
        `Unsupported token algorithm: ${
          result.protectedHeader.alg
        }. Supported algorithms: ${SUPPORTED_SIGNATURE_ALGORITHMS.join(', ')}`,
      );
    }

    return result;
  } catch (error: any) {
    if (error.code) {
      switch (error.code) {
        case 'ERR_JOSE_GENERIC':
          if (error.message.includes('request failed')) {
            throw new Error(`Failed to fetch JWKS from ${jwksUri}: ${error.message}`);
          }
          break;
        case 'ERR_JOSE_NO_KEY_MATCHED':
          throw new Error(`No matching key found in JWKS for the token's 'kid' header: ${error.message}`);
        case 'ERR_JOSE_JWK_SET_MALFORMED':
          throw new Error(`Malformed JWKS found at ${jwksUri}: ${error.message}`);
        default:
          if (error.code.startsWith('ERR_JWT_')) {
            throw new Error(`JWT validation error: ${error.message} (Code: ${error.code})`);
          }
      }
    }

    throw new Error(`An unexpected error occurred during token validation: ${error.message}`);
  }
}
