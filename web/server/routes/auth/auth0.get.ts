import type { H3Event } from "h3";
import useAuthFetch from "~/server/use-auth-fetch";

export default defineOAuthAuth0EventHandler({
  config: {
    scope: ["openid", "email"],
    audience: "adonis:dev:api"
  },
  async onSuccess(event: H3Event, { user, tokens }: { user: any; tokens: any }) {
    await setUserSession(event, {
      user: {
        authId: user.sub,
        email: user.email
      },
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      }
    });

    await useAuthFetch(event, "/users", {
      method: "POST",
      body: {
        email: user.email
      }
    });

    return sendRedirect(event, "/inviters");
  },

  onError(event: H3Event, error: any) {
    console.error("Auth0 error:", error);
    return sendRedirect(event, "/");
  }
});
