export default defineOAuthAuth0EventHandler({
  config: {
    authorizationParams: {
      screen_hint: "signup"
    }
  },
  onSuccess: () => {}
});
