import type { H3Event } from "h3";
import use$Fetch from "~/server/use-fetch";
import type { User } from "#auth-utils";

export default defineOAuthAuth0EventHandler({
  config: {
    scope: ["openid", "email"],
    audience: "adonis:dev:api"
  },
  async onSuccess(event: H3Event, { user, tokens }: { user: any; tokens: any }) {
    const response = await use$Fetch<User>("/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    });
    const authUser = response[0];
    const isNewUser = authUser.status === "new";

    let _user;

    if (isNewUser) {
      _user = {
        authId: user.sub,
        email: user.email,
        status: authUser.status
      };
    } else {
      _user = authUser;
    }

    await setUserSession(event, {
      user: _user,
      secure: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      }
    });

    return sendRedirect(event, isNewUser ? "/signup" : "/inviters");
  },

  onError(event: H3Event, error: any) {
    console.error("Auth0 error:", error);
    return sendRedirect(event, "/");
  }
});
