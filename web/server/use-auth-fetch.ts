import { UserSessionPayload } from "#auth-utils";
import type { H3Event } from "h3";
import type { FetchOptions, FetchResponse } from "./types/use-fetch";

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
  options?: FetchOptions
): Promise<FetchResponse<T>> => {
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

    if (_options.method === "GET") {
      return $fetch<FetchResponse<T>>(endpointUrl, {
        method: "get",
        headers
      });
    } else if (_options.method === "POST") {
      return $fetch<FetchResponse<T>>(endpointUrl, {
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
