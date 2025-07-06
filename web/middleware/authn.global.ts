export default defineNuxtRouteMiddleware((to) => {
  const { user, loggedIn } = useUserSession();

  if (user.value?.status === "new" && to.path !== "/signup") {
    return navigateTo("/signup");
  }

  if (to.path === "/") {
    return;
  }

  if (!loggedIn.value) {
    return navigateTo("/");
  }
});
