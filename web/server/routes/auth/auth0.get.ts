export default defineOAuthAuth0EventHandler({
  config: {},
  async onSuccess(event, { user, tokens }) {
    console.log(event);
    console.log(user);
    console.log(tokens);
  },
  onError(event, error) {
    console.error("Auth0 error:", error);
    return sendRedirect(event, "/");
  }
});
