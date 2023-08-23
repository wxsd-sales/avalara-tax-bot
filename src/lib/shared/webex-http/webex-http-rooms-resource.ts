import { API_BASE_URL } from '$lib/constants/webex';
import { WebexHttp } from './webex-http';

export class WebexHttpRoomsResource extends WebexHttp {
  /**
   * Creates a Webex Request wrapper instance for the `rooms` HTTP API resource.
   *
   * @param apiBaseUrl
   * @param accessToken
   */
  constructor(apiBaseUrl: `${string}/`, accessToken: string) {
    super(apiBaseUrl, 'rooms', accessToken);
  }

  /**
   * Get details for a room, by their Webex HTTP API identifier.
   *
   * @param roomId
   *
   * @returns {Promise<Response>}
   */
  getRoomDetails(roomId: string) {
    return this.get({ endpoint: roomId });
  }

  /**
   * Get meeting details for a room, by their Webex HTTP API identifier.
   *
   * @param roomId
   *
   * @returns {Promise<Response>}
   */
  getRoomMeetingDetails(roomId: string) {
    return this.get({ endpoint: `${roomId}/meetingInfo` });
  }
}

/**
 * Instantiates the Webex request wrapper for the `rooms` HTTP API resource.
 *
 * @param accessToken
 * @param apiBaseUrl
 *
 * @returns {webexHttpRoomsResource}
 */
export const webexHttpRoomsResource = (accessToken: string, apiBaseUrl: `${string}/` = API_BASE_URL) =>
  new WebexHttpRoomsResource(apiBaseUrl, accessToken);
