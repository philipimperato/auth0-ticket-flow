export interface FetchResponse<T = any> {
  success: boolean;
  data: T;
}

export interface FetchOptions<T = any> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: T;
  query?: Record<string, string>;
}
