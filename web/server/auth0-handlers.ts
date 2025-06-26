import type { H3Event } from "h3";

export function auth0Handlers(redirectPath = "/inviters") {
  return {
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

      return sendRedirect(event, redirectPath);
    },

    onError(event: H3Event, error: any) {
      console.error("Auth0 error:", error);
      return sendRedirect(event, "/");
    }
  };
}
