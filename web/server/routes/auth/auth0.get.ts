import type { H3Event } from "h3";
import use$Fetch from "~/server/use-fetch";

export default defineOAuthAuth0EventHandler({
  config: {
    scope: ["openid", "email"],
    audience: "adonis:dev:api"
  },
  async onSuccess(event: H3Event, { user, tokens }: { user: any; tokens: any }) {
    const response = await use$Fetch("/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    });

    console.log(response);

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

    return sendRedirect(event, "/inviters");
  },

  onError(event: H3Event, error: any) {
    console.error("Auth0 error:", error);
    return sendRedirect(event, "/");
  }
});
