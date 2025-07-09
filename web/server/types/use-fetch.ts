export interface FetchOptions<T = any> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: T;
  query?: Record<string, string>;
}
