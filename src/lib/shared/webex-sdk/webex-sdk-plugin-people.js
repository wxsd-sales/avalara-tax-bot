/**
 * @typedef {any} Person
 */

/**
 * Webex SDK internal People Plugin wrapper.
 *
 * @returns {WebexSdkPluginPeople}
 */
export class WebexSdkPluginPeople {
  /**
   * Get a Webex user's details.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Person} person
   *
   * @returns {Promise<Person>}
   */
  static get(webex, person) {
    return webex.people.get(person);
  }

  /**
   * List people in your organization.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<Person[]>}
   */
  static list(webex, query) {
    return webex.people.list(query);
  }
}

export const webexSdkPeoplePlugin = WebexSdkPluginPeople;
