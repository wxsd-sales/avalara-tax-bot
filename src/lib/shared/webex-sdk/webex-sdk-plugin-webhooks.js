/**
 * @typedef {any} Webhook
 */

/**
 * Webex SDK Webhooks Plugin wrapper.
 *
 */
export class WebexSdkPluginWebhooks {
  /**
   * Lists all webhooks.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<Webhook[]>}
   */
  static list(webex, query) {
    return webex.webhooks.list(query);
  }

  /**
   * Creates a webhook.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Webhook} body
   *
   * @returns {Promise<Webhook>}
   */
  static create(webex, body) {
    return webex.webhooks.create(body);
  }

  /**
   * Updates a webhook.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Webhook} body
   *
   * @returns {Promise<Webhook>}
   */
  static update(webex, body) {
    return webex.webhooks.update(body);
  }

  /**
   * Gets a webhook.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Webhook} body
   *
   * @returns {Promise<Webhook>}
   */
  static get(webex, body) {
    return webex.webhooks.get(body);
  }

  /**
   * Deletes a webhook.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Webhook} body
   *
   * @returns {Promise<Webhook>}
   */
  static delete(webex, body) {
    return webex.webhooks.remove(body);
  }
}

export const webexSdkMessagesPlugin = WebexSdkPluginWebhooks;
