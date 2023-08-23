/**
 * @typedef {any} Team
 */

/**
 * Webex SDK Teams Plugin wrapper.
 *
 */
export class WebexSdkPluginTeams {
  /**
   * Lists all teams.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<Team[]>}
   */
  static list(webex, query) {
    return webex.messages.list(query);
  }

  /**
   * Creates a team.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Team} body
   *
   * @returns {Promise<Team>}
   */
  static create(webex, body) {
    return webex.teams.create(body);
  }

  /**
   * Updates a team.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Team} body
   *
   * @returns {Promise<Team>}
   */
  static update(webex, body) {
    return webex.teams.update(body);
  }

  /**
   * Gets a message.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Team} body
   *
   * @returns {Promise<Team>}
   */
  static get(webex, body) {
    return webex.teams.get(body);
  }

  /**
   * Deletes a team.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Team} body
   *
   * @returns {Promise<Team>}
   */
  static delete(webex, body) {
    return webex.teams.remove(body);
  }
}

export const webexSdkTeamsPlugin = WebexSdkPluginTeams;
