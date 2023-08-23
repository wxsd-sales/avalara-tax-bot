import { API_BASE_URL } from '$lib/constants/webex';
import { FetchWrapper } from '$lib/shared/request/fetch-wrapper';
import type { JsonValue } from '$lib/types/json';

export class WebexHttp extends FetchWrapper<JsonValue | FormData> {
  /**
   * Creates a Webex HTTP API request wrapper instance.
   *
   * @param baseUrl
   * @param resource
   * @param accessToken
   */
  constructor(baseUrl: `${string}/`, resource: string, accessToken: string) {
    super({
      baseUrl,
      resource,
      headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json' }
    });
  }

  protected transformBody(value: JsonValue | FormData): BodyInit {
    return value instanceof FormData ? value : JSON.stringify(value);
  }

  /**
   * Paginates the response.
   *
   * @throws {Error}
   */
  paginate() {
    throw Error('Not implemented.');
  }
}

/**
 * Instantiates the Webex HTTP API request wrapper.
 *
 * @param apiBaseUrl
 * @param accessToken
 * @param resource
 *
 * @returns {WebexHttp}
 */
export const webexHttp = (accessToken: string, resource = '', apiBaseUrl: `${string}/` = API_BASE_URL) =>
  new WebexHttp(apiBaseUrl, resource, accessToken);
