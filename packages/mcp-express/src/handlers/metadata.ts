import express, { RequestHandler } from "express";
import cors from "cors";

export function metadataHandler(): RequestHandler {
  const router = express.Router();

  router.use(cors());
  router.get("/", (req, res) => {
    const metadata = {
      issuer: "https://api.asgardeo.io/t/thineth6424/oauth2/token",
      authorization_endpoint: "https://api.asgardeo.io/t/thineth6424/oauth2/authorize",
      token_endpoint: "https://api.asgardeo.io/t/thineth6424/oauth2/token",
      jwks_uri: "https://api.asgardeo.io/t/thineth6424/oauth2/jwks",
      scopes_supported: ["address", "phone", "openid", "profile", "roles", "groups", "email"],
      response_types_supported: [
        "id_token token", "code", "code id_token token", "code id_token", "id_token",
        "code token", "none"
      ],
      response_modes_supported: [
        "fragment", "jwt", "fragment.jwt", "query", "form_post", "query.jwt", "form_post.jwt"
      ],
      grant_types_supported: [
        "refresh_token", "urn:ietf:params:oauth:grant-type:saml2-bearer", "password",
        "client_credentials", "authorization_code",
        "urn:ietf:params:oauth:grant-type:token-exchange",
        "urn:ietf:params:oauth:grant-type:jwt-bearer"
      ],
      token_endpoint_auth_methods_supported: [
        "client_secret_post", "private_key_jwt", "tls_client_auth", "client_secret_basic"
      ],
      token_endpoint_auth_signing_alg_values_supported: [
         "PS256", "ES256", "ES384", "RS384", "RS256"
      ],
      revocation_endpoint: "https://api.asgardeo.io/t/thineth6424/oauth2/revoke",
      revocation_endpoint_auth_methods_supported: [
        "client_secret_basic", "client_secret_post"
      ],
      introspection_endpoint: "https://api.asgardeo.io/t/thineth6424/oauth2/introspect",
      introspection_endpoint_auth_methods_supported: [
        "client_secret_basic", "client_secret_post"
      ],
      code_challenge_methods_supported: ["S256", "plain"],
      userinfo_endpoint: "https://api.asgardeo.io/t/thineth6424/oauth2/userinfo",
      end_session_endpoint: "https://api.asgardeo.io/t/thineth6424/oidc/logout",
      subject_types_supported: ["public", "pairwise"],
      id_token_signing_alg_values_supported: ["RS256"],
      claims_supported: [
         "sub", "iss", "aud", "exp", "iat",
         "auth_time", "nonce", "acr", "amr", "azp",
         "gender", "email_verified", "zoneinfo", "picture", "preferred_username",
         "middle_name", "nickname", "profile", "phone_number_verified", "roles",
         "postal_code", "groups", "country", "email",
         "application_roles", "given_name", "locality", "region", "family_name",
         "name", "locale", "street_address", "website", "phone_number", "username",
         "birthdate", "updated_at"
      ],
      claims_parameter_supported: true,
      request_parameter_supported: true,
      request_object_signing_alg_values_supported: [
        "RS256", "RS384", "RS512", "PS256", "none"
      ],
      tls_client_certificate_bound_access_tokens: true,
      mtls_endpoint_aliases: {
         pushed_authorization_request_endpoint: "https://mtls.asgardeo.io/t/thineth6424/oauth2/par",
         token_endpoint: "https://mtls.asgardeo.io/t/thineth6424/oauth2/token"
      },
      pushed_authorization_request_endpoint: "https://api.asgardeo.io/t/thineth6424/oauth2/par"
    };

    res.status(200).json(metadata);
  });

  return router;
}