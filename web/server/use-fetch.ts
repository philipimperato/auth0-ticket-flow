import type { FetchOptions, FetchResponse } from "./types/use-fetch";

const use$Fetch = async <T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<FetchResponse<T>> => {
  const apiUrl = import.meta.env.API_URL;
  const endpointUrl = `${apiUrl}${endpoint}`;
  const _options = options || { method: "GET" };

  try {
    const headers = {
      ..._options.headers,
      "Content-Type": "application/json"
    };

    return $fetch<FetchResponse<T>>(endpointUrl, {
      method: "get",
      headers
    });
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

export default use$Fetch;
