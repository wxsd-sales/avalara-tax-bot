/**
 * @typedef {any} TeamMembership
 */

/**
 * Webex SDK Team Memberships Plugin wrapper.
 *
 */
export class WebexSdkPluginTeamMemberships {
  /**
   * Lists all memberships in a team.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<TeamMembership[]>}
   */
  static list(webex, query) {
    return webex.messages.list(query);
  }

  /**
   * Creates a team membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {TeamMembership} body
   *
   * @returns {Promise<TeamMembership>}
   */
  static create(webex, body) {
    return webex.teamMemberships.create(body);
  }

  /**
   * Updates a team membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {TeamMembership} body
   *
   * @returns {Promise<TeamMembership>}
   */
  static update(webex, body) {
    return webex.teamMemberships.update(body);
  }

  /**
   * Gets a team membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {TeamMembership} body
   *
   * @returns {Promise<TeamMembership>}
   */
  static get(webex, body) {
    return webex.teamMemberships.get(body);
  }

  /**
   * Deletes a team membership.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {TeamMembership} body
   *
   * @returns {Promise<TeamMembership>}
   */
  static delete(webex, body) {
    return webex.teamMemberships.remove(body);
  }
}

export const webexSdkTeamMembershipsPlugin = WebexSdkPluginTeamMemberships;
