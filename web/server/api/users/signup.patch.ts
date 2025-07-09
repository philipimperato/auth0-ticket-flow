import useAuthFetch from "~/server/use-auth-fetch";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await useAuthFetch(event, "/signup", {
    method: "PATCH",
    body
  });

  return response;
});
