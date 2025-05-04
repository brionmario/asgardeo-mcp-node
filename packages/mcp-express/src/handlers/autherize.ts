import express, { RequestHandler } from "express";

export function authorizationHandler(): RequestHandler {
  const router = express.Router();

  router.use(express.urlencoded({ extended: false }));

  router.all("/", (req, res) => {
    const params = req.method === "POST" ? req.body : req.query;

    // If no scope is provided, default to "openid"
    if (!params.scope) {
      params.scope = "openid";
    }

    const baseAuthorizationUrl = "https://api.asgardeo.io/t/thineth6424/oauth2/authorize";
    const redirectUrl = new URL(baseAuthorizationUrl);
    redirectUrl.search = new URLSearchParams(params as Record<string, string>).toString();

    res.redirect(redirectUrl.toString());
  });

  return router;
}
