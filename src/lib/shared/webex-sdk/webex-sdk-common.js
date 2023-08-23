import * as webexCommonImports from '@webex/common';

/**
 * Constructs a Hydra ID for a given UUID and type.
 *
 * @param {string} type One of PEOPLE, TEAM, ROOM
 * @param {any} id Identifying the "TYPE" object
 * @param {string} cluster Containing the "TYPE" object
 *
 * @returns {string}
 * @export
 */
export function constructHydraId(type, id, cluster = 'us') {
  return webexCommonImports.constructHydraId(type, id, cluster);
}

/**
 * Deconstructs a Hydra ID.
 *
 * @param {string} id Hydra style id
 *
 * @returns {{id:string, type:string, cluster:string}} deconstructed id
 * @export
 */
export function deconstructHydraId(id) {
  return webexCommonImports.deconstructHydraId(id);
}

/**
 * Constructs a Hydra ID for a message based on internal UUID
 *
 * @param {any} uuid
 * @param {string} cluster Containing the message
 *
 * @returns {string}
 * @export
 */
export function buildHydraMessageId(uuid, cluster) {
  return webexCommonImports.buildHydraMessageId(uuid, cluster);
}

/**
 * Constructs a Hydra ID for a person based on internal UUID
 *
 * @param {any} uuid
 * @param {string} cluster Containing the person
 *
 * @returns {string}
 * @export
 */
export function buildHydraPersonId(uuid, cluster) {
  return webexCommonImports.buildHydraPersonId(uuid, cluster);
}

/**
 * Constructs a Hydra ID for a room based on internal UUID
 *
 * @param {any} uuid
 * @param {string} cluster Containing the room
 *
 * @returns {string}
 * @export
 */
export function buildHydraRoomId(uuid, cluster) {
  return webexCommonImports.buildHydraRoomId(uuid, cluster);
}

/**
 * Constructs a Hydra ID for an organization based on internal UUID
 *
 * @param {any} uuid
 * @param {string} cluster Containing the organization
 *
 * @returns {string}
 * @export
 */
export function buildHydraOrgId(uuid, cluster) {
  return webexCommonImports.buildHydraOrgId(uuid, cluster);
}

/**
 * Constructs a Hydra ID for a membership based on an internal UUID for the person, and the space
 *
 * @param {any} personUUID
 * @param {any} spaceUUID
 * @param {string} cluster Containing the membership
 *
 * @returns {string}
 * @export
 */
export function buildHydraMembershipId(personUUID, spaceUUID, cluster) {
  return webexCommonImports.buildHydraMembershipId(`${personUUID}:${spaceUUID}`, cluster);
}

/**
 * Returns a hydra cluster string based on a conversation url
 *
 * @private
 * @memberof Messages
 * @param {import('./webex-sdk').Webex} webex Sdk instance
 * @param {String} conversationUrl Url of space where activity took place
 *
 * @returns {String} String suitable for UUID -> public ID encoding
 */
export function getHydraClusterString(webex, conversationUrl) {
  return webexCommonImports.getHydraClusterString(webex, conversationUrl);
}

/**
 * Returns a Hydra roomType based on conversation tags
 *
 * @param {string[]} tags
 *
 * @returns {string}
 */
export function getHydraRoomType(tags) {
  return webexCommonImports.getHydraRoomType(tags);
}

/**
 * Returns file URLs for the activity, adhering to Hydra details, e.g., https://api.ciscospark.com/v1/contents/Y2lzY29zcGF...
 *
 * @param {any} activity From mercury
 * @param {string} cluster Containing the files
 *
 * @returns {string[]} File URLs
 * @see https://developer.webex.com/docs/api/v1/messages/get-message-details
 */
export function getHydraFiles(activity, cluster) {
  return webexCommonImports.getHydraFiles(activity, cluster);
}
