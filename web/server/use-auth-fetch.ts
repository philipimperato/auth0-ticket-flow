import { UserSessionPayload } from "#auth-utils";
import type { H3Event } from "h3";

interface AuthFetchResponse<T = any> {
  success: boolean;
  data: T;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface AuthFetchOptions<T = any> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  query?: Record<string, string>;
}

/**
 * Authenticated fetch utility for server API requests
 * @param event - H3 event object
 * @param endpoint - API endpoint path
 * @param options - Request options
 * @returns Promise with the fetch response
 */
const useAuthFetch = async <T = any>(
  event: H3Event,
  endpoint: string,
  options?: AuthFetchOptions
): Promise<AuthFetchResponse<T>> => {
  const apiUrl = import.meta.env.API_URL;
  const endpointUrl = `${apiUrl}${endpoint}`;
  const _options = options || { method: "GET" };

  try {
    const { tokens } = (await getUserSession(event)) as unknown as UserSessionPayload;

    const headers = {
      ..._options.headers,
      ...{
        Authorization: `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json"
      }
    };

    let $query = null;

    if (_options.method === "GET") {
      $query = $fetch<AuthFetchResponse>(endpointUrl, {
        method: "get",
        headers
      });
    } else if (_options.method === "POST") {
      $query = $fetch<AuthFetchResponse>(endpointUrl, {
        method: "post",
        body: _options.body,
        headers
      });
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: "Method not allowed"
      });
    }

    return $query;
  } catch (error: any) {
    console.log(error);

    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message,
      data: {
        error: `Problem with ${endpoint}: ${error.message}`,
        details: error.data
      }
    });
  }
};

export default useAuthFetch;
