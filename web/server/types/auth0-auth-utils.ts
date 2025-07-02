declare module "#auth-utils" {
  interface UserSessionPayload {
    user: {
      sub: string;
      email: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

export {};
