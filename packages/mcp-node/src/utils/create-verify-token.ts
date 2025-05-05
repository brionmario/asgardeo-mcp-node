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

import {jwtVerify, JWTVerifyResult, JWTVerifyOptions, CryptoKey, KeyObject, JWK} from 'jose';

/**
 * Options for configuring the JWT verification process.
 */
export interface VerifyOptions {
  /** The expected audience claim in the JWT */
  audience: string;
  /** The expected issuer claim in the JWT */
  issuer: string;
}

/**
 * Creates a token verification function with preconfigured options
 *
 * @param keyStore - JWKS key store for verifying token signatures
 * @param options - Configuration options for token verification
 * @returns A function that verifies JWT tokens
 *
 * @example
 * ```typescript
 * import createVerifyToken from './create-verify-token';
 * import jwksKeyStore from './jwksKeyStore';
 *
 * const keyStore = jwksKeyStore(new URL('https://your-auth-server/.well-known/jwks.json'));
 * const verifyToken = createVerifyToken(keyStore, {
 *   audience: 'your-api',
 *   issuer: 'https://your-auth-server'
 * });
 *
 * try {
 *   const result = await verifyToken('your.jwt.token');
 *   console.log('Token verified:', result.payload);
 * } catch (error) {
 *   console.error('Token verification failed:', error);
 * }
 * ```
 */
export default function createVerifyToken(
  keyStore: CryptoKey | KeyObject | JWK | Uint8Array<ArrayBufferLike>,
  options: VerifyOptions,
) {
  /**
   * Verifies a JWT token using the configured key store and options
   *
   * @param token - The JWT token to verify
   * @returns The verification result containing the decoded payload
   * @throws {JWTInvalid} If the token is invalid
   * @throws {JWSSignatureVerificationFailed} If the token signature is invalid
   */
  return async function verifyToken(token: string): Promise<JWTVerifyResult> {
    return jwtVerify(token, keyStore, {
      audience: options.audience,
      issuer: options.issuer,
    } as JWTVerifyOptions);
  };
}
