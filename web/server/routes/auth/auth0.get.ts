import type { H3Event } from "h3";

export default defineOAuthAuth0EventHandler({
  config: {
    scope: ["openid", "email"]
  },
  async onSuccess(event: H3Event, { user, tokens }: { user: any; tokens: any }) {
    await setUserSession(event, {
      user: {
        authId: user.sub,
        email: user.email
      },
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        idToken: tokens.id_token
      }
    });

    return sendRedirect(event, "/inviters");
  },

  onError(event: H3Event, error: any) {
    return sendRedirect(event, "/");
  }
});
