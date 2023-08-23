/**
 * @typedef {any} Room
 */

/**
 * Webex SDK Rooms Plugin wrapper.
 *
 */
export class WebexSdkPluginRooms {
  /**
   * Starts listening for room events by establishing a websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {function(event): any} onCreate
   * @param {function(event): any} onDelete
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static startListening(webex, onCreate, onDelete) {
    return webex.rooms.listen().then(() => {
      webex.rooms.on('created', (/** @type {Room} */ event) => onCreate(event));
      webex.rooms.on('deleted', (/** @type {Room} */ event) => onDelete(event));

      return webex;
    });
  }

  /**
   * Stops listening for room events on an established websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static stopListening(webex) {
    return new Promise((resolve) => {
      webex.rooms.stopListening();
      webex.rooms.off('created');
      webex.rooms.off('deleted');

      return resolve(webex);
    });
  }

  /**
   * Lists all rooms.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<Room[]>}
   */
  static list(webex, query) {
    return webex.rooms.list(query);
  }

  /**
   * Creates a room.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Room} body
   *
   * @returns {Promise<Room>}
   */
  static create(webex, body) {
    return webex.rooms.create(body);
  }

  /**
   * Updates a room.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Room} body
   * @param {Room} bodyNew
   *
   * @returns {Promise<Room>}
   */
  static update(webex, body, bodyNew) {
    return webex.rooms.update(body, bodyNew);
  }

  /**
   * Gets a room.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Room} body
   *
   * @returns {Promise<Room>}
   */
  static get(webex, body) {
    return webex.rooms.get(body);
  }

  /**
   * Deletes a room.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Room} body
   *
   * @returns {Promise<Room>}
   */
  static delete(webex, body) {
    return webex.rooms.remove(body);
  }

  /**
   * Lists all rooms with read status.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {number} count
   *
   * @returns {Promise<Room[]>}
   */
  static listWithReadStatus(webex, count) {
    return webex.rooms.listWithReadStatus(count);
  }

  /**
   * Gets a room with read status.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Room} body
   *
   * @returns {Promise<Room>}
   */
  static getWithReadStatus(webex, body) {
    return webex.rooms.listWithReadStatus(body?.id ?? body);
  }
}

import { getHydraRoomType, getHydraClusterString, buildHydraRoomId, buildHydraPersonId } from './webex-sdk-common.js';

/**
 * Helper method to build a roomInfo object from a conversation object
 * @param {import('./webex-sdk.js').Webex} webex sdk object
 * @param {import('./webex-sdk-internal-plugin-conversation.js').Conversation} conversation
 *
 * @returns {Promise<Room>}
 */
export function buildRoomInfo(webex, conversation) {
  try {
    const type = getHydraRoomType(conversation.tags);
    const cluster = getHydraClusterString(webex, conversation.url);
    const title = conversation.displayName ? conversation.displayName : conversation.computedTitle;
    const lastActivityDate = conversation.lastReadableActivityDate
      ? conversation.lastReadableActivityDate
      : conversation.lastRelevantActivityDate;

    const roomInfo = {
      id: buildHydraRoomId(conversation.id, cluster),
      creatorUuid: conversation?.creatorUUID,
      creatorId: buildHydraPersonId(conversation.creatorUUID, 'us'),
      type,
      ...(title && { title: conversation.displayName }),
      ...(lastActivityDate && { lastActivityDate }),
      lastSeenActivityDate: conversation.lastSeenActivityDate
        ? conversation.lastSeenActivityDate
        : // If user has never been seen set the date to "a long time ago"
          new Date(0).toISOString()
    };

    return Promise.resolve(roomInfo);
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * Helper method to build a list of roomInfo object from conversation list
 * @param {import('./webex-sdk.js').Webex} webex sdk object
 * @param {import('./webex-sdk-internal-plugin-conversation.js').Conversation[]} conversations
 *
 * @returns {Promise<{items: Room[]}>}
 */
export function buildRoomInfoList(webex, conversations) {
  // Convert each Conversation into a roomInfo object
  const roomReadInfo = { items: [] };
  const roomInfoPromises = [];

  for (const conversation of conversations) {
    roomInfoPromises.push(buildRoomInfo(webex, conversation));
  }

  return Promise.all(roomInfoPromises).then(
    /** @param {any} roomInfoList */ (roomInfoList) => {
      roomReadInfo.items = roomInfoList;
      roomReadInfo.items.sort((a, b) => (a['lastActivityDate'] < b['lastActivityDate'] ? 1 : -1));

      return roomReadInfo;
    }
  );
}

export const webexSdkRoomsPlugin = WebexSdkPluginRooms;
