/**
 * @typedef {any} Conversation
 */

/**
 * Webex SDK internal Conversation Plugin wrapper.
 *
 */
export class WebexSdkInternalPluginConversation {
  /**
   * Lists a set of conversations.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {JsonObject} options
   *
   * @returns {Promise<Conversation[]>}
   */
  static list(webex, options) {
    return webex.internal.conversation.list(options);
  }

  /**
   * Downloads the file specified in `item.scr` or `item.url`.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} item
   * @param {JsonObject} [options]
   *
   * @returns {Promise<File>}
   */
  static download(webex, item, options) {
    return webex.internal.conversation.download(item, options);
  }
}

export const webexSdkInternalConversationPlugin = WebexSdkInternalPluginConversation;
