import useAuthFetch from "~/server/use-auth-fetch";
import { User } from "#auth-utils";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const users = await useAuthFetch<User>(event, "/signup", {
    method: "PATCH",
    body
  });

  if (users.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found"
    });
  } else {
    const user = users[0];
    const session = (await getUserSession(event)) as any;

    await setUserSession(event, {
      user: {
        ...session.user,
        ...user
      },
      secure: session.secure
    });

    return user;
  }
});
