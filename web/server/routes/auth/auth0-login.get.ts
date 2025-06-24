export default defineOAuthAuth0EventHandler({
  config: {
    authorizationParams: {
      screen_hint: "login"
    }
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        sub: user.sub
      },
      secure: {
        idToken: tokens.id_token
      }
    });

    return sendRedirect(event, "/inviters");
  },
  onError(event, error) {
    console.error("Auth0 error:", error);
    return sendRedirect(event, "/");
  }
});
