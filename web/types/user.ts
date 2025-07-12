declare module "#auth-utils" {
  interface User {
    email: string;
    authId?: string;
    status?: string;
    firstName?: string;
    lastName?: string;
    timezone?: string;
  }
}
