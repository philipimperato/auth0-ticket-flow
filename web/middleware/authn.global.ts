export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (to.path === "/") {
    return;
  }

  if (!loggedIn.value) {
    return navigateTo("/");
  }
});
