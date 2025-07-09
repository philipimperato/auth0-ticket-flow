declare module "#auth-utils" {
  interface UserSessionPayload {
    user: User;
    secure: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

export {};
