/**
 * @typedef {any} RoomMembership
 */

/**
 * Webex SDK Room Memberships Plugin wrapper.
 *
 */
export class WebexSdkPluginRoomMemberships {
  /**
   * @callback OnEventAction
   * @param {RoomMembership} event
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns any
   */

  /**
   * Starts listening for room membership events by establishing a websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {OnEventAction} [onCreate]
   * @param {OnEventAction} [onUpdate]
   * @param {OnEventAction} [onDelete]
   * @param {OnEventAction} [onSeen]
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static startListening(webex, onCreate, onUpdate, onDelete, onSeen) {
    return webex.memberships.listen().then(() => {
      webex.memberships.on('created', (/** @type {RoomMembership} */ event) => onCreate?.(event, webex));
      webex.memberships.on('updated', (/** @type {RoomMembership} */ event) => onUpdate?.(event, webex));
      webex.memberships.on('deleted', (/** @type {RoomMembership} */ event) => onDelete?.(event, webex));
      webex.memberships.on('seen', (/** @type {RoomMembership} */ event) => onSeen?.(event, webex));

      return webex;
    });
  }

  /**
   * Stops listening for room membership events on an established websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static stopListening(webex) {
    return new Promise((resolve) => {
      webex.memberships.stopListening();
      webex.memberships.off('created');
      webex.memberships.off('updated');
      webex.memberships.off('deleted');
      webex.memberships.off('seen');

      return resolve(webex);
    });
  }

  /**
   * Lists all memberships in a room.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<RoomMembership[]>}
   */
  static list(webex, query) {
    return webex.memberships.list(query);
  }

  /**
   * Creates a room membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {RoomMembership} body
   *
   * @returns {Promise<RoomMembership>}
   */
  static create(webex, body) {
    return webex.memberships.create(body);
  }

  /**
   * Updates a membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {RoomMembership} body
   *
   * @returns {Promise<RoomMembership>}
   */
  static update(webex, body) {
    return webex.memberships.update(body);
  }

  /**
   * Gets a room membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {RoomMembership} body
   *
   * @returns {Promise<RoomMembership>}
   */
  static get(webex, body) {
    return webex.memberships.get(body);
  }

  /**
   * Deletes a room membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {RoomMembership} body
   *
   * @returns {Promise<RoomMembership>}
   */
  static delete(webex, body) {
    return webex.memberships.remove(body);
  }

  /**
   * Lists all memberships in a room along with their read receipt.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<RoomMembership[]>}
   */
  static listWithReadStatus(webex, query) {
    return webex.memberships.listWithReadStatus(query);
  }

  /**
   * Sends read receipt in a room for a message.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {import("./webex-sdk-plugin-messages").Message} message
   *
   * @returns {Promise<RoomMembership[]>}
   */
  static updateLastSeen(webex, message) {
    return webex.memberships.updateLastSeen(message);
  }
}

export const webexSdkRoomMembershipsPlugin = WebexSdkPluginRoomMemberships;
