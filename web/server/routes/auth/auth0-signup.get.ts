export default defineOAuthAuth0EventHandler({
  /* default them to sign-up, and redirect them auth0.get.ts */
  config: {
    authorizationParams: {
      screen_hint: "signup"
    }
  },
  onSuccess: () => {}
});
