/**
 * @typedef {any} Message
 */

/**
 * Webex SDK Messages Plugin wrapper.
 *
 */
export class WebexSdkPluginMessages {
  /**
   * @callback OnEventAction
   * @param {Message} event
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns any
   */

  /**
   * Starts listening for message events by establishing a websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {OnEventAction} [onCreate]
   * @param {OnEventAction} [onDelete]
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static startListening(webex, onCreate, onDelete) {
    return webex.messages.listen().then(() => {
      webex.messages.on('created', (/** @type {Message} */ event) => onCreate?.(event, webex));
      webex.messages.on('deleted', (/** @type {Message} */ event) => onDelete?.(event, webex));

      return webex;
    });
  }

  /**
   * Stops listening for message events on an established websocket connection.
   *
   * @param {import("./webex-sdk").Webex} webex
   *
   * @returns {Promise<import("./webex-sdk").Webex>}
   */
  static stopListening(webex) {
    return new Promise((resolve) => {
      webex.messages.stopListening();
      webex.messages.off('created');
      webex.messages.off('deleted');

      return resolve(webex);
    });
  }

  /**
   * Lists all messages in a room.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {any} query
   *
   * @returns {Promise<Message[]>}
   */
  static list(webex, query) {
    return webex.messages.list(query);
  }

  /**
   * Creates a message.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Message} body
   *
   * @returns {Promise<Message>}
   */
  static create(webex, body) {
    return webex.messages.create(body);
  }

  /**
   * Updates a message.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Message} originalBody
   * @param {Message} newBody
   *
   * @returns {Promise<Message>}
   */
  static update(webex, originalBody, newBody) {
    return webex.messages.update(originalBody, newBody);
  }

  /**
   * Gets a message.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Message} body
   *
   * @returns {Promise<Message>}
   */
  static get(webex, body) {
    return webex.messages.get(body);
  }

  /**
   * Deletes a message.
   *
   * @param {import("./webex-sdk").Webex} webex
   * @param {Message} body
   *
   * @returns {Promise<Message>}
   */
  static delete(webex, body) {
    return webex.messages.remove(body);
  }
}

export const webexSdkMessagesPlugin = WebexSdkPluginMessages;
