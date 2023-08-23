import { API_BASE_URL } from '$lib/constants/webex';
import { WebexHttp } from './webex-http';

export class WebexHttpPeopleResource extends WebexHttp {
  /**
   * Creates a Webex Request wrapper instance for the `people` HTTP API resource.
   *
   * @param apiBaseUrl
   * @param accessToken
   */
  constructor(apiBaseUrl: `${string}/`, accessToken: string) {
    super(apiBaseUrl, 'people', accessToken);
  }

  /**
   * Get details for a person, by their Webex HTTP API identifier.
   *
   * @param personId
   * @param query
   *
   * @returns {Promise<Response>}
   */
  getPersonDetails(personId: string, query?: { callingData: boolean }) {
    const callingData = query?.callingData?.toString();
    const params = Object.entries({ ...query, callingData }).filter((x): x is [string, string] => x[1] !== undefined);

    return this.get({ endpoint: personId, params });
  }

  /**
   * Get the profile for the person associated with the access token.
   *
   * @param query
   *
   * @returns {Promise<Response>}
   */
  getMyOwnDetails(query?: { callingData: boolean }) {
    const callingData = query?.callingData?.toString();
    const params = Object.entries({ ...query, callingData }).filter((x): x is [string, string] => x[1] !== undefined);

    return this.get({ endpoint: 'me', params });
  }

  /**
   * List people in the organization associated with the access token.
   *
   * @param query
   *
   * @returns {Promise<Response>}
   */
  listPeople(query?: {
    email?: string;
    displayName?: string;
    id?: string;
    orgId?: string;
    callingData?: boolean;
    locationId?: string;
    max?: number;
  }) {
    const callingData = query?.callingData?.toString();
    const max = query?.max?.toString();
    const params = Object.entries({ ...query, callingData, max }).filter(
      (x): x is [string, string] => x[1] !== undefined
    );

    return this.get({ params });
  }
}

/**
 * Instantiates the Webex request wrapper for the `people` HTTP API resource.
 *
 * @param accessToken
 * @param apiBaseUrl
 *
 * @returns {WebexHttpPeopleResource}
 */
export const webexHttpPeopleResource = (accessToken: string, apiBaseUrl: `${string}/` = API_BASE_URL) =>
  new WebexHttpPeopleResource(apiBaseUrl, accessToken);
