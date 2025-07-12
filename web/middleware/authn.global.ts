export default defineNuxtRouteMiddleware((to) => {
  const { user, loggedIn } = useUserSession();

  if (to.path === "/") {
    return;
  }

  if (!loggedIn.value) {
    return navigateTo("/");
  }

  if (user.value?.status === "new" && to.path !== "/signup") {
    return navigateTo("/signup");
  }
});
