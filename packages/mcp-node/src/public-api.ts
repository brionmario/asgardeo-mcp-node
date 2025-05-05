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

export {AUTHORIZATION_SERVER_METADATA_URL, PROTECTED_RESOURCE_URL} from './constants/authorization-server';
export {NotImplementedError} from './errors/not-implemented';
export {
  AuthorizationServerMetadata,
  AuthorizationServerMetadataOptions,
  ProtectedResourceMetadata,
  ProtectedResourceMetadataOptions,
} from './models/authorization-server';
export {McpAuthOptions, McpAuthProvider} from './models/mcp-auth';
export {default as validateAccessToken} from './utils/validate-access-token';
export {default as generateAuthorizationServerMetadata} from './utils/generate-authorization-server-metadata';
export {default as generateProtectedResourceMetadata} from './utils/generate-protected-resource-metadata';

export {default as Asgardeo} from './providers/Asgardeo';
