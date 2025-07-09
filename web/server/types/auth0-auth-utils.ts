declare module "#auth-utils" {
  interface UserSessionPayload {
    user: {
      sub: string;
      email: string;
      status: string;
    };
    secure: {
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    sub: string;
    email: string;
    status: string;
  }
}

export {};
